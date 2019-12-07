import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { FormInput, Button } from "shards-react";
import { Link } from 'react-router-dom';

class EditScreen extends Component {
    state = {
        name: '',
        owner: '',
        criteria: "",
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList)
	        return <React.Fragment />;

        return (
            <div className="container">

                <div className="row white">
                    
                    <div className="card-panel">

                        <label htmlFor="name">Name</label>
                        <FormInput className="validate" type="text" name="name" id="name" onChange={this.handleChange} placeholder={todoList.name}/>

                    </div>
                    
                </div>
        
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframe[id] : null;
  if(wireframe)
	wireframe.id = id;

  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframeItems' },
    ]),
)(EditScreen);