import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
//zmienić formularz używając formika
export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }
    handleNameChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    };
    handleEmailChange = event => {
        const value = event.target.value;
        this.setState({
            email: value,
        });
    };
    handlePasswordChange = event => {
        //TODO: Password validation
        const value = event.target.value;
        this.setState({
            password: value,
        });
    };
    handleConfirmPasswordChange = event => {
        const value = event.target.value;
        this.setState({
            confirmPassword: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();

        if (this.state.password === this.state.confirmPassword) {
            document.getElementById('validationIcon').innerHTML = '<i class="ml-1 far fa-check-circle text-success">';
            console.log(`Account for ${this.state.name} created`);
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                role: 'user',
            };
        }
        //post newUser at /register and redirect to account page
        else {
            document.getElementById('validationIcon').innerHTML =
                '<i class="ml-1 far fa-times-circle text-danger"></i>';
        }
    };
    render() {
        return (
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={this.onSubmit}>
                            <p className="h4 text-center mb-4">Sign up</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                Your name
                            </label>
                            <input
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                onChange={this.handleNameChange}
                                required
                            />
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="defaultFormRegisterEmailEx"
                                className="form-control"
                                onChange={this.handleEmailChange}
                                required
                            />
                            <br />
                            <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterPasswordEx"
                                className="form-control"
                                onChange={this.handlePasswordChange}
                                required
                            />
                            <br />
                            <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                Confirm your password
                                <span id="validationIcon"></span>
                            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterConfirmEx"
                                className="form-control"
                                onChange={this.handleConfirmPasswordChange}
                                required
                            />
                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">
                                    Register
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}
