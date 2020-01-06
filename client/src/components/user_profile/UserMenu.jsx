import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

const DropdownPage = props => {
    if (props.isLogged) {
        return (
            <>
                <div className="text-center">{props.userName}</div>
                <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                        <i className="fas fa-user"></i>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem>
                            <Link to="/users/me" style={{ color: 'black' }}>
                                Profile
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
                        <MDBDropdownItem onClick={props.logoutHandler}>Log out</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </>
        );
    }
    return (
        <Link to="/login" style={{ color: 'white' }}>
            <button type="button" className="btn btn-primary">
                Log in
            </button>
        </Link>
    );
};

export default DropdownPage;
