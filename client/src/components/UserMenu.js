import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

const DropdownPage = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <>
                <div className="text-center">User_name</div>
                <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                        <i className="fas fa-user"></i>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem>
                            <Link to="/" style={{ color: 'black' }}>
                                Change your password
                            </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <Link to="/reviews" style={{ color: 'black' }}>
                                Your reviews
                            </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <Link to="/bookcases" style={{ color: 'black' }}>
                                Your bookcases
                            </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <Link to="/" style={{ color: 'black' }}>
                                Notifications
                            </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem>
                            <Link to="/" style={{ color: 'black' }}>
                                Log out
                            </Link>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </>
        );
    }
    return (
        <Link to="/login" style={{ color: 'white' }}>
            <button type="button" class="btn btn-primary">
                Log in
            </button>
        </Link>
    );
};

export default DropdownPage;
