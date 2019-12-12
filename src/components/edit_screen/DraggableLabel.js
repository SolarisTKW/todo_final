import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from 'react-rnd';

class DraggableLabel extends React.Component {

    state={
        selected: false,
        width: 100,
        height: 50,
        x: 0,
        y: 0,
        name: "Label",
        fontSize: 10,
        backgroundColor: "#FFFFFF",
        borderColor: "#ab3214",
        fontColor: "#000000",
        borderRadius: 3,
        borderThickness: 5,
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

    handleClickOff = () =>
    {  
        if(this.state.selected === true)
        {
            this.setState(
                {
                    selected: false
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
                width: 100,
                height: 50,
              }}
              
              style = {this.state.selected ? 
                    {
                        // backgroundColor: "#f0f",
                    }:

                    {
                        // backgroundColor: "#000000",
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
                <label
                    style={{
                        width: this.state.width,
                        height: this.state.height,
                        fontSize: this.state.fontSize,
                        backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor,
                        color: this.state.fontColor,
                        borderWidth: this.state.borderThickness,
                        borderRadius: this.state.borderRadius,
                        borderStyle: "solid",
                        userSelect: "none",
                    }}
                >
                    {this.state.name}
                    
                    {/*Squares for resizing*/}
                    <span 
                    style={{visibility: this.state.selected ? "visible":"hidden"}}>
                        <div 
                            className="bottom_left_square" 
                            style={{
                                position: "absolute",
                                userSelect: "none",
                                width: 20, 
                                height: 20, 
                                left: -10, 
                                bottom: -10,
                                backgroundColor: "#f0f", 
                            }}
                        />
                        <div 
                            className="bottom_right_square" 
                            style={{
                                position: "absolute",
                                userSelect: "none",
                                width: 20, 
                                height: 20, 
                                right: -10, 
                                bottom: -10,
                                backgroundColor: "#f0f", 
                            }}
                        />
                        <div 
                            className="top_left_square" 
                            style={{
                                position: "absolute",
                                userSelect: "none",
                                width: 20, 
                                height: 20, 
                                left: -10, 
                                top: -10,
                                backgroundColor: "#f0f", 
                            }}
                        />
                        <div 
                            className="top_right_square" 
                            style={{
                                position: "absolute",
                                userSelect: "none",
                                width: 20, 
                                height: 20, 
                                right: -10, 
                                top: -10,
                                backgroundColor: "#f0f", 
                            }}
                        />
                    </span>
                </label>
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

export default compose(connect(mapStateToProps))(DraggableLabel);