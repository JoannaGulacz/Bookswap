import React from 'react';
import { Link } from 'react-router-dom';

const PasswordButton = () => {
    return (
        <div className="text-center mt-2">
            <Link to="/users/me/password" style={{ color: 'black' }}>
                <button type="button" className="btn btn-light btn-sm">
                    Change your password
                </button>
            </Link>
        </div>
    );
};

export default PasswordButton;
