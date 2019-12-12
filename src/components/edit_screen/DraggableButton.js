import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Rnd } from 'react-rnd';

class DraggableButton extends React.Component {
    constructor()
    {
        super();
        
        this.state = {
            selected: false,
            data:
            {
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
        this.setState({ 
            data:{
                    type: this.state.data.type,
                    text: this.state.data.text,
                    width: this.state.data.width,
                    height: this.state.data.height,
                    x: d.x,
                    y: d.y,
                    fontSize: this.state.data.fontSize,
                    backgroundColor: this.state.data.backgroundColor,
                    borderColor: this.state.data.borderColor,
                    fontColor: this.state.data.fontColor,
                    borderRadius: this.state.data.borderRadius,
                    borderThickness: this.state.data.borderThickness
                }
        });
    }

    handleResize = (e, direction, ref, delta, position) =>
    {
        if(this.state.selected)
        {
            this.setState({
                data:{
                        type: this.state.data.type,
                        text: this.state.data.text,
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position,
                        fontSize: this.state.data.fontSize,
                        backgroundColor: this.state.data.backgroundColor,
                        borderColor: this.state.data.borderColor,
                        fontColor: this.state.data.fontColor,
                        borderRadius: this.state.data.borderRadius,
                        borderThickness: this.state.data.borderThickness
                    }
            });
        }
    }

    render() {
        return (
            <Rnd default={{
                x: 0,
                y: 0,
                width: 75,
                height: 40,
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
                        width: this.state.data.width,
                        height: this.state.data.height,
                        fontSize: this.state.data.fontSize,
                        backgroundColor: this.state.data.backgroundColor,
                        borderColor: this.state.data.borderColor,
                        color: this.state.data.fontColor,
                        borderWidth: this.state.data.borderThickness,
                        borderRadius: this.state.data.borderRadius,
                        border: "solid"
                    }}
                >
                    {this.state.data.text}
                </button>
                
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
            </Rnd>
        );
    }
}

export default DraggableButton;
