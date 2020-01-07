import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { MDBCol, MDBRow } from 'mdbreact';

const Login = props => {
    return (
        <>
            <MDBRow>
                <MDBCol md="6" className="mb-3">
                    <LoginForm {...props} />
                </MDBCol>

                <MDBCol md="6" className="mb-3">
                    <RegisterForm {...props} />
                </MDBCol>
            </MDBRow>
        </>
    );
};

export default Login;
