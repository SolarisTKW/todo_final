import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import DraggableContainer from './DraggableContainer.js';
import DraggableButton from './DraggableButton.js';
import DraggableLabel from './DraggableLabel.js';
import DraggableTextfield from './DraggableTextfield.js';

class WireframeCanvas extends Component {

    state = {
        selectionClick: false,
    }

    handleSelectionClick = () => {
        if (!this.state.selectionClick) {
          // attach/remove event handler
          document.addEventListener('click', this.handleOutsideClick, false);

            //test
            this.setState(prevState => ({
                ...prevState,
                selectionClick: true,
            }));
            
        } else {

        }

        console.log(this.state.selectionClick ? "outside" : "inside");
    }
      
    handleOutsideClick = (e) => {
    // ignore clicks on the OUTER component
        if (this.node.contains(e.target)) {
            console.log("UNSELECT");

            this.props.handleUnselect();
            //REMOVE EVENT HANDLER
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.setState(prevState => ({
                ...prevState,
                selectionClick: !prevState.selectionClick,
            }));
            
            return;
        }
    //ELSE IF IT IS NOT ON THE OUTER COMPONENT    
        this.handleSelectionClick();
    }

    checkSelected = (item) =>
    {
        if(this.props.selected === item.key)
            return true;
        else
            return false;
    }

    render() {
        var wireframe = this.props.wireframe;
        var items = wireframe.elements;
        return(
            <div className="edit_panel container"
            ref={node => { this.node = node; }}
            >
                2/3

                {items && items.map(item => {
                        item.id = item.key;
                        switch(item.type){
                        case "Container":
                            return(
                                <DraggableContainer
                                    item={item}
                                    handleChangeType={this.props.handleChangeType}
                                    handleInsideClick={this.handleSelectionClick}
                                    handleResize={this.props.handleResize}
                                    handleReposition={this.props.handleReposition}
                                    selected={this.checkSelected(item)}
                                />
                                );
                        case "Button":
                            return(
                                <DraggableButton 
                                    item={item}
                                    handleChangeType={this.props.handleChangeType}
                                    handleInsideClick={this.handleSelectionClick}
                                    handleResize={this.props.handleResize}
                                    handleReposition={this.props.handleReposition}
                                    selected={this.checkSelected(item)}
                                />
                                );
                        case "Label":
                            return(
                                <DraggableLabel 
                                    item={item}
                                    handleChangeType={this.props.handleChangeType}
                                    handleInsideClick={this.handleSelectionClick}
                                    handleResize={this.props.handleResize}
                                    handleReposition={this.props.handleReposition}
                                    selected={this.checkSelected(item)}
                                />
                                );
                        case "Textfield":
                            return(
                                <DraggableTextfield 
                                    item={item}
                                    handleChangeType={this.props.handleChangeType}
                                    handleInsideClick={this.handleSelectionClick}
                                    handleResize={this.props.handleResize}
                                    handleReposition={this.props.handleReposition}
                                    selected={this.checkSelected(item)}
                                />
                                );
                        }
                    })
                }
                            
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
};

export default WireframeCanvas;