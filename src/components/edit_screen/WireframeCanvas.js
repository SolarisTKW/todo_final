import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Container } from 'shards-react';
import DraggableContainer from './DraggableContainer.js';
import DraggableButton from './DraggableButton.js';
import DraggableLabel from './DraggableLabel.js';
import DraggableTextfield from './DraggableTextfield.js';

class WireframeCanvas extends Component {

    state = {
        tempItem:{
            key: 0,
            type: "Button",
            text: "Submit",
            width: 75,
            height: 40,
            x: 0,
            y: 0,
            fontSize: 10,
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
            fontColor: "#000000",
            borderRadius: 5,
            borderThickness: 3
        }
    }

    handleClick = (e) => {
        if (this.state.selected === "") {
          // attach/remove event handler
          document.addEventListener('click', this.handleOutsideClick, false);
        } 
        else {
          document.removeEventListener('click', this.handleOutsideClick, false);
        }
        
        if(e.target === this.node){
            this.setState({
                selected: "", 
                type: "",
            });
        }
        else{
            this.setState({
                selected: e.target.getId(), 
                type: e.target.getType(),
            });
        }
      }
      
      handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
          return;
        }
        
        this.handleClick();
      }

    render() {
        return(
            <Container className="edit_panel"
            ref={node => {this.node = node;}}
                >
                2/3
                <DraggableContainer/>
                <DraggableButton item={this.state.tempItem} key={this.state.tempItem.key}/>
                <DraggableLabel/>
                <DraggableTextfield/>
                            
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframeItems' },
    ]),
)(WireframeCanvas);