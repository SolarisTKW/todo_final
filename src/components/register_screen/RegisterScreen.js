import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler';
import { Form, FormInput, FormCheckbox , FormGroup} from 'shards-react';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    admin: false,
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleChecked = (e) => {
    const { target } = e;
    this.setState(state => ({
        ...state,
        [target.id]: target.checked,
    }));
}

  handleSubmit = (e) => {
    e.preventDefault();

    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    props.register(newUser, firebase);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Register</h5>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput type="email" name="email" id="email" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput type="password" name="password" id="password" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <FormInput type="text" name="firstName" id="firstName" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <FormInput type="text" name="lastName" id="lastName" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <FormCheckbox name="admin" id="admin" onClick={this.handleChecked}>Administrator?</FormCheckbox>
          </FormGroup>
          <FormGroup>
            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);