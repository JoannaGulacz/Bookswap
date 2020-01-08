import React from 'react';

const NavContainer = props => {
    return (
        <ul className="nav transparent lighten-4 py-2 h-100 d-flex justify-content-center align-items-center">
            {props.children}
        </ul>
    );
};

export default NavContainer;
