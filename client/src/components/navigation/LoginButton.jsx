import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return (
        <Link to="/login" style={{ color: 'white' }}>
            <button type="button" className="btn btn-primary">
                Log in
            </button>
        </Link>
    );
};

export default LoginButton;
