import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';

const Login = props => {
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="6">
                        <LoginForm {...props} />
                    </MDBCol>

                    <MDBCol size="6">
                        <RegisterForm {...props} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default Login;
