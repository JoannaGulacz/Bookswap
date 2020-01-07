import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = props => {
    return (
        <Link to={props.route}>
            <li className="nav-item">
                <span className="nav-link">{props.name}</span>
            </li>
        </Link>
    );
};

export default NavLink;
