import React from 'react';

import FormCard from '../components/FormCard';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

// Komponent na potrzeby testów routera - DO USUNIĘCIA
const Login = () => {
    return (
        <>
            <FormCard>
                <LoginForm />
                <RegisterForm />
            </FormCard>
        </>
    );
};

export default Login;
