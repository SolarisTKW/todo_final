import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import DraggableContainer from './DraggableContainer.js';
import DraggableButton from './DraggableButton.js';
import DraggableLabel from './DraggableLabel.js';
import DraggableTextfield from './DraggableTextfield.js';

class WireframeCanvas extends Component {

    state = {
        selectionClick: false,
    }

        componentDidMount() {

            Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
            });
        
            Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
            });
        
        }

        scrollToTop = () => {
            scroll.scrollToTop();
        }
        
        scrollTo() {
            scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
            })
        }
        scrollToWithContainer() {
    
        let goToContainer = new Promise((resolve, reject) => {
    
          Events.scrollEvent.register('end', () => {
            resolve();
            Events.scrollEvent.remove('end');
          });
    
          scroller.scrollTo('scroll-container', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
          });
    
        });
    
        goToContainer.then(() =>
          scroller.scrollTo('scroll-container-second-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'scroll-container'
        }));
        }

        componentWillUnmount() {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
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
            <Element name="test" className="element" id="containerElement" style={{
                position: 'relative',
                width: '780px',
                height: '850px',
                overflow: 'scroll',
              }}>
                <div 
                    className="canvas_container"
                    ref={
                        node => { this.node = node; }
                    }
                    style = {{
                        width: this.props.wireframe.width,
                        height: this.props.wireframe.height,
                    }}
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
            </Element>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
};

export default WireframeCanvas;