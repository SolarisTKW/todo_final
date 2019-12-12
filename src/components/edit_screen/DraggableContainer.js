import React from 'react';
import { Rnd } from 'react-rnd';

class DraggableContainer extends React.Component {
    state = {
        selected: false,
        data: this.props.item,
        
    }
    
    handleClick = () =>
    {

        this.props.handleChangeType(this.state.data);
        
        this.props.handleInsideClick();

        if(this.state.selected === false)
        {
            this.setState(
                {
                    selected: !this.state.selected
                }
            );
        }
    }

    handleDrag = (e,d) =>
    {
        this.props.handleReposition(e,d);
    }

    handleResize = (e, direction, ref, delta, position) =>
    {
        if(this.state.selected)
        {
            this.props.handleResize(e, direction, ref, delta, position);
        }
    }

    render() {
        return (
            <Rnd default={{
                x: this.props.item.x,
                y: this.props.item.y,
                width: this.props.item.width,
                height: this.props.item.height,
              }}

              style={{
                width: this.props.item.width,
                height: this.props.item.height,
                backgroundColor: this.props.item.backgroundColor,
                borderColor: this.props.item.borderColor,
                borderWidth: this.props.item.borderThickness+"px",
                borderRadius: this.props.item.borderRadius+"px",
                borderStyle: "solid",
              }}

              bounds="parent" 

              onResize={this.handleResize}
              onDrag={this.handleDrag}
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
export default DraggableContainer;