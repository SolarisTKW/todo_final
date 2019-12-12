import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { FormInput, Button, Container, Col, Row , Card, Modal, ModalHeader, ModalBody} from "shards-react";
import { SketchPicker } from 'react-color';
import WireframeCanvas from './WireframeCanvas.js';

class EditScreen extends Component {
    state = {
        saved: false,
        showModal: false,
        type: "button",
        showColorPickerBackground: false,
        showColorPickerBorder: false,
        backgroundColor: "#000000",
        borderColor: "#f0f",
        fontColor: "#000000",
        criteria: "",
    }

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

        //Close code
        this.setState(
            {
                showModal: false
            }
        );
    }

    handleCancel = () =>
    {
        this.setState(
            {
                showModal: false
            }
        );
    }

    setShowBackground = () => {
        this.setState(
            {
                showColorPickerBackground: !this.state.showColorPickerBackground
            }
        )
    }

    setShowBorder = () => {
        this.setState(
            {
                showColorPickerBorder: !this.state.showColorPickerBorder
            }
        )
    }

    setShowFontColor = () => {
        this.setState(
            {
                showColorPickerFont: !this.state.showColorPickerFont
            }
        )
    }

    handleChangeCompleteBackground = (color) => {
        this.setState(
            {
                backgroundColor: color.hex
            }
        );
    }

    handleChangeCompleteBorder = (color) => {
        this.setState(
            {
                borderColor: color.hex
            }
        );
    }

    handleChangeCompleteFont = (color) => {
        this.setState(
            {
                fontColor: color.hex
            }
        );
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
                <Modal open={this.state.showModal}>
                    <ModalHeader>
                        Are you sure you want to quit without saving?
                    </ModalHeader>
                    <ModalBody>
                        <Button className="save_and_close" onClick={this.handleSaveAndClose}> 
                            <Link to="/">
                                Save and Close
                            </Link>
                        </Button>
                        <Button className="cancel" theme="danger" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </ModalBody>
                </Modal>

                <Row>
                    <Col center sm = "2" md="2" lg="2" className="edit_col">
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
                                        <div className="zoom_bar_text" onClick={this.handleSave}>
                                            Save
                                        </div>
                                    </Col>
                                    <Col center sm = "4" md="4" lg="4">
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
                                <Container className="sample_container"/>
                                <label htmlFor="sample_container container" className="label_for_sample">
                                    Container
                                </label>
                            </div>

                            <div className="sample_wrapper_label">
                                <label htmlFor="sample_label" className="black-text label_for_sample">
                                    Prompt for Input:
                                </label>
                                <div className="sample_label">
                                    Label
                                </div>
                            </div>

                            <div className="sample_wrapper_button">
                                <div>
                                    <Button className="sample_button">
                                        Submit
                                    </Button>
                                </div>
                                <label className="label_for_sample">
                                    Button
                                </label>
                            </div>

                            <div className="sample_wrapper_button">
                                <div>
                                    <input type="filler" className="sample_input" value="Input" readOnly></input>
                                </div>
                                <label className="label_for_sample">
                                    Textfield
                                </label>
                            </div>

                            1/3
                        </Card>
                    </Col>

                    <Col center sm = "8" md="8" lg="8" className="edit_col">
                        <WireframeCanvas/>
                    </Col>

                    <Col center sm = "2" md="2" lg="2" className="edit_col">
                        {(()=> {
                            switch(this.state.type){
                                case 'container':
                                    return(
                                        <Card className="edit_panel">

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Background: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.backgroundColor, color: "#FFFFFF"}} onClick={this.setShowBackground}>{this.state.backgroundColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBackground ?
                                                        <SketchPicker
                                                        color={this.state.backgroundColor}
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
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.borderColor, color: "#FFFFFF"}} onClick={this.setShowBorder}>{this.state.borderColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBorder ?
                                                        <SketchPicker
                                                        color={this.state.borderColor}
                                                        onChangeComplete={this.handleChangeCompleteBorder}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="border_thickness">Border Thickness:</label>
                                                <FormInput name="border_thickness" id="border_thickness" placeholder="10"></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="border_radius">Border Radius:</label>
                                                <FormInput name="border_radius" id="border_radius" placeholder="10"></FormInput>
                                            </div>
                                            
                                            Container
                                        </Card>
                                    );
                                case null:
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
                                                <FormInput name="name" id="id" placeholder="Name"></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="font_size">Font Size:</label>
                                                <FormInput name="font_size" id="font_size" placeholder="10"></FormInput>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <div className="color_picker_container">
                                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Font Color: </label>
                                                    <div className={"btn-floating color_picker_circle"} style={{color: this.state.fontColor, backgroundColor: "#FFFFFF"}} onClick={this.setShowFontColor}>{this.state.fontColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerFont ?
                                                        <SketchPicker
                                                        color={this.state.fontColor}
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
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.backgroundColor, color: "#FFFFFF"}} onClick={this.setShowBackground}>{this.state.backgroundColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBackground ?
                                                        <SketchPicker
                                                        color={this.state.backgroundColor}
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
                                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.borderColor, color: "#FFFFFF"}} onClick={this.setShowBorder}>{this.state.borderColor}</div>
                                                    <div>{
                                                        this.state.showColorPickerBorder ?
                                                        <SketchPicker
                                                        color={this.state.borderColor}
                                                        onChangeComplete={this.handleChangeCompleteBorder}
                                                        className="color_picker"/> : null
                                                    }
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="border_thickness">Border Thickness:</label>
                                                <FormInput name="border_thickness" id="border_thickness" placeholder="10"></FormInput>
                                            </div>

                                            <hr className="new2"/>

                                            <div className="input_container">
                                                <label htmlFor="border_radius">Border Radius:</label>
                                                <FormInput name="border_radius" id="border_radius" placeholder="10"></FormInput>
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
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
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