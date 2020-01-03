import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

class DropdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
        };
    }

    handleLogOut = () => {
        localStorage.removeItem('token');
        this.props.history.push('/');
        window.location.reload(true);
    };

    render() {
        if (this.state.token) {
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
                            <MDBDropdownItem onClick={this.handleLogOut}>Log out</MDBDropdownItem>
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
    }
}
export default DropdownPage;

/*
class DropdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token')
        };
    }

    render() {
        if (this.state.token) {
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
                            <MDBDropdownItem onClick>Log out</MDBDropdownItem>
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
    }
}

export default DropdownPage;

=====

import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

const handleLogOut = (e) => {
    localStorage.removeItem('token');
    //e.target.props.history.push('/'); TO DO !!!
    window.location.reload(true)
};

const getUserName = async () => {
    const userName
};

const DropdownPage = (props) => {
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
                        <MDBDropdownItem onClick={handleLogOut}>
                                Log out
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

*/
