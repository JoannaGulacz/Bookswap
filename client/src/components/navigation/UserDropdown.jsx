import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

const UserDropdown = props => {
    return (
        <div className="text-left">
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary" style={{ padding: '10px' }}>
                    <i className="fas fa-user"></i>
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    <MDBDropdownItem header>{props.userName}</MDBDropdownItem>
                    <Link to="/users/me" style={{ color: 'black' }}>
                        <MDBDropdownItem>Profile</MDBDropdownItem>
                    </Link>
                    <Link to="/reviews" style={{ color: 'black' }}>
                        <MDBDropdownItem>Your reviews</MDBDropdownItem>
                    </Link>
                    <Link to="/bookcases" style={{ color: 'black' }}>
                        <MDBDropdownItem>Your bookcases</MDBDropdownItem>
                    </Link>
                    <Link to="/notifications" style={{ color: 'black' }}>
                        <MDBDropdownItem>Notifications</MDBDropdownItem>
                    </Link>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem onClick={props.logoutHandler}>Log out</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
};

export default UserDropdown;
