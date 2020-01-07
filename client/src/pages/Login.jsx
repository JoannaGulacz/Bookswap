import React from 'react';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';

const Login = props => {
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <LoginForm {...props} />
                    </MDBCol>

                    <MDBCol md="6">
                        <RegisterForm {...props} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default Login;
