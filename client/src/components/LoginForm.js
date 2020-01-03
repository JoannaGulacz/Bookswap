import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
// import { Link, Redirect } from 'react-router-dom';

//zmienić formularz używając formika
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleEmailChange = event => {
        const value = event.target.value;
        this.setState({
            email: value,
        });
    };
    handlePasswordChange = event => {
        const value = event.target.value;
        this.setState({
            password: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();
        //check if data is correct comparing to database data if not, display: "Incorrect email and/or password"
        /*
        fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.status === 200) {
                    console.log('Logged in successfully');
                    const token = res.token;
                    localStorage.setItem('token', token);
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    
    */
        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token;
                localStorage.setItem('token', token);
                console.log('Logged in successfully');
                this.props.history.push('/');
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    };
    componentDidMount() {
        if (localStorage.getItem('token')) {
            //zaloguj automatycznie
        }
    }
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
                                onChange={this.handleEmailChange}
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
                                onChange={this.handlePasswordChange}
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
