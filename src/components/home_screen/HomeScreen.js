import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, Form, FormInput } from 'shards-react';

class HomeScreen extends Component {
state = {
    show: false,
    name: "",
}

    registerRecent = (id) =>
    {
        var x = new Date();
        var firestore = getFirestore();
        firestore.collection('wireframeItems').doc(id).update(
            {
                time: x.getTime()
            }
        );
    }

    toggleModal = () =>
    {
        this.setState({show: !this.state.show});
    }

    handleChange = (e) =>
    {
        const { target } = e;

        this.setState(state => ({
        ...state,
        [target.id]: target.value,
        }));

    }

    handleSubmit = () =>
    {
        var x = new Date();
        var firestore = getFirestore();
        const collection = firestore.collection('wireframeItems');
        collection.add(
            {
                key: this.props.wireframes.length,
                name: this.state.name,
                width: "780px",
                height: "850px",
                elements: [],
                time: x.getTime()
            }
        );
    }

    handleDeleteWireframe = (id) =>
    {
        var firestore = getFirestore();
        const collection = firestore.collection('wireframeItems');
        collection.doc(id).delete();
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks handleRegister={this.registerRecent} handleDeleteWireframe = {this.handleDeleteWireframe}/>
                    </div>

                    <Modal open={this.state.show} toggle={this.toggleModal}>
                        <ModalHeader>Create a new Wireframe</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <label htmlFor="name">Name</label>
                                <FormInput type="text" name="name" id="name" onChange={this.handleChange}/>
                                <Button type="submit" theme="primary">Submit</Button>
                            </Form>
                        </ModalBody>
                    </Modal>

                    <div className="col s8">
                        <div className="banner">
                            @Wireframe<br />
                            Maker
                        </div>
                        <Container>
                            <Row>
                                <Col>
                                    <div className="center-align home_new_wireframe_container">
                                        <Button outline theme="danger" className="home_new_wireframe_button" onClick={this.toggleModal}>
                                            Create a New Wireframe
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframeItems,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframeItems', orderBy: ['time', 'desc'] },
    ]),
)(HomeScreen);