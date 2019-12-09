import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { FormInput, Button, Container, Col, Row , Card} from "shards-react";
import { Link } from 'react-router-dom';

class EditScreen extends Component {
    state = {
        criteria: "",
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        // if(!wireframe)
	    //     return <React.Fragment />;

        return (
            <Container className="edit_container">
                <Row>
                    <Col center sm = "3" md="3" lg="3" >
                        <Card className="edit_panel">
                            <Container className="zoom_bar">
                                <Row>
                                    <Col center sm = "2" md="2" lg="2">
                                        <div className="zoom_bar">
                                            <i className="material-icons">zoom_in</i>
                                        </div>
                                    </Col>
                                    <Col center sm = "2" md="2" lg="2">
                                        <div className="zoom_bar">
                                            <i className="material-icons">zoom_out</i>
                                        </div>
                                    </Col>
                                    <Col center sm = "4" md="4" lg="4">
                                        <div className="zoom_bar_text">
                                            Save
                                        </div>
                                    </Col>
                                    <Col center sm = "4" md="4" lg="4">
                                        <div className="zoom_bar_text">
                                            Close
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            1/3
                        </Card>
                    </Col>
                    <Col center sm = "6" md="6" lg="6" >
                        <Container className="edit_panel">
                            2/3
                        </Container>
                    </Col>
                    <Col center sm = "3" md="3" lg="3" >
                        <Card className="edit_panel">
                            <label>Properties</label>
                            <FormInput name="name" id="id" placeholder="Name"></FormInput>
                            <label htmlFor="font_size">Font Size:</label>
                            <FormInput name="font_size" id="font_size" placeholder="10px"></FormInput>
                            3/3
                        </Card>
                    </Col>
                </Row>
            </Container>
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