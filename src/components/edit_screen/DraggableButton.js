import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from 'react-rnd';

class DraggableButton extends React.Component {

    state={
        selected: false,
        width: 200,
        height: 100,
        x: 0,
        y: 0,
        name: "Submit",
        fontSize: 10,
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        fontColor: "#000000",
        borderRadius: 5,
        borderThickness: 0,
    }

    selectedSquares = () =>
    {   
        if(this.state.selected)
        {
            console.log("SELECTED");
            return(
                {
                    borderThickness: 10,
                }
            );
        }
        else
        {
            console.log("UNSELECTED");
            return(
                {
                    borderThickness: 0,
                }
            );
        }
    }
    
    handleClick = () =>
    {  
        if(this.state.selected === false)
        {
            this.setState(
                {
                    selected: !this.state.selected
                }
            );
        }
    }

    handleDragStart = () => 
    {

    }

    handleDragStop = (e,d) =>
    {
        this.setState({ x: d.x, y: d.y });
    }

    handleResize = (e, direction, ref, delta, position) =>
    {
        if(this.state.selected)
        {
            this.setState({
                width: ref.style.width,
                height: ref.style.height,
                ...position,
                });
        }
    }

    render() {
        return (
            <Rnd default={{
                x: 0,
                y: 0,
                width: 200,
                height: 100,
              }}
              
              style = {this.state.selected ? 
                    {
                        backgroundColor: "#f0f",
                    }:

                    {
                        backgroundColor: "#000000",
                    }
                }

              bounds="parent"
              onResize={this.handleResize}
              onClick={this.handleClick}
              disableDragging={!this.state.selected}

              enableResizing={this.state.selected ? 
                    {
                        bottom: true,
                        bottomLeft: true,
                        bottomRight: true,
                        left: true,
                        right: true,
                        top: true,
                        topLeft: true,
                        topRight: true,
                    }:

                    {
                        bottom: false,
                        bottomLeft: false,
                        bottomRight: false,
                        left: false,
                        right: false,
                        top: false,
                        topLeft: false,
                        topRight: false, 
                    }
                }
            >
                <button
                    style={{
                        width: this.state.width,
                        height: this.state.height,
                        fontSize: this.state.fontSize,
                        backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor,
                        color: this.state.fontColor,
                        borderThickness: this.state.borderThickness,
                        borderRadius: this.state.borderRadius,
                    }}
                    
                >
                    {this.state.name}
                </button>
            </Rnd>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframeItems,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(DraggableButton);

