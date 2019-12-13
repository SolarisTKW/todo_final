import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

import { FormInput, Button, Container, Col, Row , Card, Modal, ModalHeader, ModalBody} from "shards-react";
import { SketchPicker } from 'react-color';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import WireframeCanvas from './WireframeCanvas.js';


class EditScreen extends Component {
    state = {
        //General
        wireframe: this.props.wireframe, //initialize
        selected: -1,

        //Left
        saved: false,
        showModal: false,

        //Center
        selectionClick: false,

        //Right
        type: "",
        showColorPickerBackground: false,
        showColorPickerBorder: false,

        text: "",
        fontSize: 0,
        borderRadius: 0,
        borderThickness: 0,
        backgroundColor: "",
        borderColor: "",
        fontColor: "",
    }


    //LEFT SIDE
    handleZoomIn = () => {

    }

    handleZoomOut = () => {

    }

    handleClose = (e) => {
        if(!this.state.saved)
        {
            e.preventDefault();
            
            this.setState(
                {
                    showModal: true
                }
            )
        }
    }

    handleSave = () => {

    }

    handleSaveAndClose = () =>
    {
        //Saving code
        this.handleSave();
        //Close code
        this.handleCancel();
    }

    handleCancel = () =>
    {
        this.setState(
            {
                showModal: false
            }
        );
    }

    handleCreateSampleContainer = () => {
        const length = this.state.wireframe.elements.length;
        var newWireframe = this.state.wireframe;
        var newItem = {
            key: length,
            type: "Container",
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#f0f",
            borderRadius: 10,
            borderThickness: 3
        };

        newWireframe.elements.push(newItem); 
        
        this.setState(state=>(
            {
                ...state,
                wireframe: newWireframe
            })
        );
    }

    handleCreateSampleButton = () => {
        const length = this.state.wireframe.elements.length;
        var newWireframe = this.state.wireframe;
        var newItem = {
            key: length,
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
        };

        newWireframe.elements.push(newItem); 
        
        this.setState(state=>(
            {
                ...state,
                wireframe: newWireframe
            })
        );
    }

    handleCreateSampleLabel = () => {
        const length = this.state.wireframe.elements.length;
        var newWireframe = this.state.wireframe;
        var newItem = {
            key: length,
            type: "Label",
            text: "Label",
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
        };

        newWireframe.elements.push(newItem); 
        
        this.setState(state=>(
            {
                ...state,
                wireframe: newWireframe
            })
        );
    }

    handleCreateSampleTextfield = () => {
        const length = this.state.wireframe.elements.length;
        var newWireframe = this.state.wireframe;
        var newItem = {
            key: length,
            type: "Textfield",
            text: "Textfield",
            width: 75,
            height: 40,
            x: 0,
            y: 0,
            fontSize: 10,
            backgroundColor: "#888888",
            borderColor: "#000000",
            fontColor: "#000000",
            borderRadius: 5,
            borderThickness: 3
        };

        newWireframe.elements.push(newItem); 
        
        this.setState(state=>(
            {
                ...state,
                wireframe: newWireframe
            })
        );
    }

    handleDuplicateControl = (key, e) => {

    }

    handleDeleteControl = (key, e) => {
        
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Center



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Right Side

    setShowBackground = (e) => {
        e.stopPropagation();
        this.setState(
            {
                showColorPickerBackground: !this.state.showColorPickerBackground
            }
        )
    }

    setShowBorder = (e) => {
        e.stopPropagation();
        this.setState(
            {
                showColorPickerBorder: !this.state.showColorPickerBorder
            }
        )
    }

    setShowFontColor = (e) => {
        e.stopPropagation();
        this.setState(
            {
                showColorPickerFont: !this.state.showColorPickerFont
            }
        )
    }

    handleChangeType = (item) =>
    {
        this.setState(state=>(
            {
                ...state,
                type: item.type,
                selected: item.key,

                text: item.text,
                fontSize: item.fontSize,
                borderRadius: item.borderRadius,
                borderThickness: item.borderThickness,
                backgroundColor: item.backgroundColor,
                borderColor: item.borderColor,
                fontColor: item.fontColor,
            })
        );

        console.log(this.state.selected);
    }

    handleUnselect = (item) =>
    {
        this.setState(state=>(
            {
                ...state,
                selected: -1,
                type: "",
            }
        ))
    }

    handleResize = (e, direction, ref, delta, position) =>
    {
        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            "width": ref.style.width,
            "height": ref.style.height,
            ...position
        };

        this.setState(
            {
                ...this.state,
                wireframe: newWireframe,
            }
        );
    }

    handleReposition = (e, d) =>
    {
        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            "x": d.x,
            "y": d.y,
        };

        this.setState(
            {
                ...this.state,
                wireframe: newWireframe,
            }
        );
        console.log(this.state.wireframe.elements[this.state.selected]);
    }
    
    handleChange = (e) => {
        const {target} = e;
        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            [target.id]: target.value
        };

        this.setState(
            {
                ...this.state,
                [target.id]: target.value,

                wireframe: newWireframe
            }
        );
        
        console.log(this.state.wireframe.elements);
    }

    handleChangeCompleteBackground = (color) => {

        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            "backgroundColor": color.hex
        };

        this.setState(
            {
                ...this.state,
                backgroundColor: color.hex,

                wireframe: newWireframe
            }
        );
        
        console.log(this.state.wireframe.elements);
    }

    handleChangeCompleteBorder = (color) => {
        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            "borderColor": color.hex
        };

        this.setState(
            {
                ...this.state,
                borderColor: color.hex,

                wireframe: newWireframe
            }
        );
        
        console.log(this.state.wireframe.elements);
    }

    handleChangeCompleteFont = (color) => {
        var newWireframe = this.state.wireframe;
        newWireframe.elements[this.state.selected] = 
        {
            ...newWireframe.elements[this.state.selected],
            "fontColor": color.hex
        };

        this.setState(
            {
                ...this.state,
                fontColor: color.hex,

                wireframe: newWireframe
            }
        );
        
        console.log(this.state.wireframe.elements);
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!this.props.wireframe)
	        return <React.Fragment />;

        return (
            
            <Container className="edit_container">
                <KeyboardEventHandler
                handleKeys={['ctrl+d']}
                onKeyEvent={(key, e) => this.handleDuplicateControl(key,e)} 
                />

                <KeyboardEventHandler
                handleKeys={['del']}
                onKeyEvent={(key, e) => this.handleDeleteControl(key,e)} 
                />

                <Modal open={this.state.showModal}>
                    <ModalHeader>
                        Are you sure you want to quit without saving?
                    </ModalHeader>
                    <ModalBody>
                        <Link to="/">
                            <Button className="save_and_close" onClick={this.handleSaveAndClose}>
                                Save and Close
                            </Button>
                        </Link>
    
                        <Button className="cancel" theme="danger" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </ModalBody>
                </Modal>

                <Row>

                    <Col sm = "2" md="2" lg="2" className="edit_col">
                        <Card className="edit_panel">
                            <Container className="zoom_bar">
                                <Row>
                                    <Col sm = "2" md="2" lg="2">
                                        <div className="zoom_bar">
                                            <i className="material-icons">zoom_in</i>
                                        </div>
                                    </Col>
                                    <Col sm = "2" md="2" lg="2">
                                        <div className="zoom_bar">
                                            <i className="material-icons">zoom_out</i>
                                        </div>
                                    </Col>
                                    <Col sm = "4" md="4" lg="4">
                                        <div className="zoom_bar_text" onClick={this.handleSave}>
                                            Save
                                        </div>
                                    </Col>
                                    <Col sm = "4" md="4" lg="4">
                                        <div className="zoom_bar_text">
                                            <Link to="/" onClick={this.handleClose}>
                                                Close
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </Container>

                            <hr className="new1"/>

                            <div className="sample_wrapper">
                                <Container className="sample_container" onClick={this.handleCreateSampleContainer}/>
                                <label htmlFor="sample_container container" className="label_for_sample">
                                    Container
                                </label>
                            </div>

                            <div className="sample_wrapper_label">
                                <label htmlFor="sample_label" className="black-text label_for_sample">
                                    Prompt for Input:
                                </label>
                                <div className="sample_label" onClick={this.handleCreateSampleLabel}>
                                    Label
                                </div>
                            </div>

                            <div className="sample_wrapper_button">
                                <div>
                                    <Button className="sample_button" onClick={this.handleCreateSampleButton}>
                                        Submit
                                    </Button>
                                </div>
                                <label className="label_for_sample">
                                    Button
                                </label>
                            </div>

                            <div className="sample_wrapper_textfield">
                                <div>
                                    <input 
                                    type="filler" 
                                    className="sample_input" 
                                    value="Input" 
                                    readOnly
                                    onClick={this.handleCreateSampleTextfield}
                                    ></input>
                                </div>
                                <label className="label_for_sample">
                                    Textfield
                                </label>
                            </div>

                            1/3
                        </Card>
                    </Col>

                    {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                    <Col sm = "8" md="8" lg="8" className="edit_col">
                        <WireframeCanvas 
                        wireframe={this.state.wireframe} 
                        handleChangeType={this.handleChangeType}
                        handleResize={this.handleResize}
                        handleReposition={this.handleReposition}
                        handleUnselect={this.handleUnselect}
                        selected={this.state.selected}
                        />
                    </Col>

                    {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

                    <Col sm = "2" md="2" lg="2" className="edit_col">
                        {(()=> {
                            switch(this.state.type){
                                case 'Container':
                                    return(
                                        <Card className="edit_panel">

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Background: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.wireframe.elements[this.state.selected].backgroundColor, color: "#FFFFFF"}} onClick={this.setShowBackground}>{this.state.wireframe.elements[this.state.selected].backgroundColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBackground ?
                                                        <SketchPicker
                                                        color={this.state.wireframe.elements[this.state.selected].backgroundColor}
                                                        onChangeComplete={this.handleChangeCompleteBackground}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Border Color: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.wireframe.elements[this.state.selected].borderColor, color: "#FFFFFF"}} onClick={this.setShowBorder}>{this.state.wireframe.elements[this.state.selected].borderColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBorder ?
                                                        <SketchPicker
                                                        color={this.state.wireframe.elements[this.state.selected].borderColor}
                                                        onChangeComplete={this.handleChangeCompleteBorder}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="borderThickness">Border Thickness:</label>
                                                <FormInput name="borderThickness" id="borderThickness" value={this.state.wireframe.elements[this.state.selected].borderThickness} onChange={this.handleChange}></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <FormInput name="borderRadius" id="borderRadius" value={this.state.wireframe.elements[this.state.selected].borderRadius} onChange={this.handleChange}></FormInput>
                                            </div>
                                            
                                            Container
                                        </Card>
                                    );
                                case "":
                                    return(
                                        <Card className="edit_panel">
                                            <h5>Select an existing control!</h5>
                                        </Card>    
                                    );
                                default:
                                    return(
                                        <Card className="edit_panel">
                                            <div className="input_container">
                                                <label>Properties</label>
                                                <FormInput name="text" id="text" value={this.state.wireframe.elements[this.state.selected].text} onChange={this.handleChange}></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <FormInput name="fontSize" id="fontSize" value={this.state.wireframe.elements[this.state.selected].fontSize} onChange={this.handleChange}></FormInput>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Font Color: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{color: this.state.wireframe.elements[this.state.selected].fontColor, backgroundColor: "#FFFFFF"}} onClick={this.setShowFontColor}>{this.state.wireframe.elements[this.state.selected].fontColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerFont ?
                                                        <SketchPicker
                                                        color={this.state.wireframe.elements[this.state.selected].fontColor}
                                                        onChangeComplete={this.handleChangeCompleteFont}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Background: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.wireframe.elements[this.state.selected].backgroundColor, color: "#FFFFFF"}} onClick={this.setShowBackground}>{this.state.wireframe.elements[this.state.selected].backgroundColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBackground ?
                                                        <SketchPicker
                                                        color={this.state.wireframe.elements[this.state.selected].backgroundColor}
                                                        onChangeComplete={this.handleChangeCompleteBackground}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Border Color: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.wireframe.elements[this.state.selected].borderColor, color: "#FFFFFF"}} onClick={this.setShowBorder}>{this.state.wireframe.elements[this.state.selected].borderColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBorder ?
                                                        <SketchPicker
                                                        color={this.state.wireframe.elements[this.state.selected].borderColor}
                                                        onChangeComplete={this.handleChangeCompleteBorder}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="borderThickness">Border Thickness:</label>
                                                <FormInput name="borderThickness" id="borderThickness" value={this.state.wireframe.elements[this.state.selected].borderThickness} onChange={this.handleChange}></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <FormInput name="borderRadius" id="borderRadius" value={this.state.wireframe.elements[this.state.selected].borderRadius} onChange={this.handleChange}></FormInput>
                                            </div>
                                            
                                            Textual
                                        </Card>    
                                    );
                                }

                            }
                            )()}
                    </Col>

                </Row>

            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframeItems } = state.firestore.data;
  console.log(wireframeItems);
  const wireframe = wireframeItems ? wireframeItems[id] : null;
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