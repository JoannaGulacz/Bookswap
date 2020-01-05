import React from 'react';
import { Link } from 'react-router-dom';

const PasswordButton = () => {
    return (
        <div className="text-center">
            <button type="button" className="btn btn-light btn-sm">
                <Link to="/users/me/password" style={{ color: 'black' }}>
                    Change your password
                </Link>
            </button>
        </div>
    );
};

export default PasswordButton;
