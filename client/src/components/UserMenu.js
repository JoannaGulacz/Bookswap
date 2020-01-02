import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

const DropdownPage = () => {
    return (
        <MDBDropdown>
            <MDBDropdownToggle caret color="primary">
                <i className="fas fa-user"></i>
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
                <MDBDropdownItem>Change your password</MDBDropdownItem>
                <MDBDropdownItem>
                    <Link to="/reviews">
                        <span className="nav-link">Your reviews</span>
                    </Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <Link to="/bookcases">
                        <span className="nav-link">Your bookcases</span>
                    </Link>
                </MDBDropdownItem>
                <MDBDropdownItem>Notifications</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Log out</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

export default DropdownPage;
