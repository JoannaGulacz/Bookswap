import React from 'react';

import FormCard from '../components/FormCard';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// Komponent na potrzeby testów routera - DO USUNIĘCIA
const Login = props => {
    console.log(props.history);
    return (
        <>
            <FormCard>
                <LoginForm {...props} />
                <RegisterForm />
            </FormCard>
        </>
    );
};

export default Login;
