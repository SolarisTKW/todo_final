import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { FormInput, Button, Container, Col, Row , Card} from "shards-react";
import { PhotoshopPicker } from 'react-color';

class EditScreen extends Component {
    state = {
        showColorPickerBackground: false,
        showColorPickerBorder: false,
        backgroundColor: "#000000",
        borderColor: "#f0f",
        criteria: "",
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

                            <hr className="new1"/>

                            <div className="sample_wrapper">
                                <Container className="sample_container"/>
                                <label htmlFor="sample_container container" className="label_for_sample">
                                    Container
                                </label>
                            </div>

                            <div className="sample_wrapper_label">
                                <label htmlFor="sample_label" className="black-text label">
                                    Prompt for Input:
                                </label>
                                <div className="sample_label" className="sample_label">
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
                    <Col center sm = "6" md="6" lg="6" >
                        <Container className="edit_panel">
                            2/3
                        </Container>
                    </Col>
                    <Col center sm = "3" md="3" lg="3" >
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
                                    <label htmlFor="color_picker_circle" className="grey-text color_picker_circle_label">Background: </label>
                                    <div className={"btn-floating color_picker_circle"} style={{backgroundColor: this.state.backgroundColor, color: "#FFFFFF"}} onClick={this.setShowBackground}>{this.state.backgroundColor}</div>
                                    <div>{
                                        this.state.showColorPickerBackground ?
                                        <PhotoshopPicker className="color_picker"/> : null
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
                                        <PhotoshopPicker className="color_picker"/> : null
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