import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();
    };
    render() {
        return (
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={this.onSubmit}>
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="defaultFormLoginEmailEx"
                                className="form-control"
                                onChange={this.handleInputChange}
                                required
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input
                                type="password"
                                id="defaultFormLoginPasswordEx"
                                className="form-control"
                                onChange={this.handleInputChange}
                                required
                            />
                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">
                                    Login
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}
