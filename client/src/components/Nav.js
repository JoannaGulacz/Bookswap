import React from 'react';
import { Link } from 'react-router-dom';
import { MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

// links types (classes): active, disabled, (none)          [span]

const Nav = () => {
    return (
        <ul className="nav justify-content-center grey lighten-4 py-2 mb-4">
            <Link to="/">
                <li className="nav-item">
                    <span className="nav-link">Home</span>
                </li>
            </Link>
            <Link to="/test">
                <li className="nav-item">
                    <span className="nav-link">Test</span>
                </li>
            </Link>

            <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                        <span className="mr-2">Search</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem href="/books">Books</MDBDropdownItem>
                        <MDBDropdownItem href="/#!">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="/#!">Something else here</MDBDropdownItem>
                        <MDBDropdownItem href="/#!">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>
        </ul>
    );
};

export default Nav;
