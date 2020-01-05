import React from 'react';
import FormCard from '../components/FormCard';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = props => {
    return (
        <>
            <FormCard>
                <LoginForm {...props} />
                <RegisterForm {...props} />
            </FormCard>
        </>
    );
};

export default Login;
