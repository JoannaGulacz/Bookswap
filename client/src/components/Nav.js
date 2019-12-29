import React from 'react';
import { Link } from 'react-router-dom';

// links types (classes): active, disabled, (none)          [span]

const Nav = () => {
    return (
        <ul class="nav justify-content-center grey lighten-4 py-2 mb-4">
            <Link to="/">
                <li class="nav-item">
                    <span className="nav-link">Home</span>
                </li>
            </Link>
            <Link to="/test">
                <li class="nav-item">
                    <span className="nav-link">Test</span>
                </li>
            </Link>
            <Link to="/login">
                <li class="nav-item">
                    <span className="nav-link">Login</span>
                </li>
            </Link>
        </ul>
    );
};

export default Nav;
