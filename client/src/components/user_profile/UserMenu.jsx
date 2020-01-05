import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import axios from '../../utils/axios';

class DropdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            userName: '',
        };
    }

    handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.pathname = '/';
    };

    getUserName = async () => {
        const user = await axios.get('/users/me');
        this.setState({ userName: user.data.data.name });
    };

    componentDidMount() {
        if (this.state.token) {
            this.getUserName();
        }
    }

    render() {
        if (this.state.token) {
            return (
                <>
                    <div className="text-center">{this.state.userName}</div>
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
                            <MDBDropdownItem onClick={this.handleLogOut}>Log out</MDBDropdownItem>
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
    }
}
export default DropdownPage;
