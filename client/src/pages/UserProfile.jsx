import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from '../utils/axios';

import UserData from '../components/user_profile/UserData';
import UserAvatar from '../components/user_profile/UserAvatar';
import PasswordButton from '../components/user_profile/PasswordButton';
import PasswordForm from '../components/user_profile/PasswordForm';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            role: '',
            email: '',
            userId: '',
        };
    }

    getUserInfo = async () => {
        const user = await axios.get('/users/me');
        this.setState({
            userName: user.data.data.name,
            role: user.data.data.role,
            email: user.data.data.email,
            userId: user.data.data._id,
        });
    };

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <Router>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <UserData data="User Name" value={this.state.userName} />
                                    </li>
                                    <li className="list-group-item">
                                        <UserData data="Role" value={this.state.role} />
                                    </li>
                                    <li className="list-group-item">
                                        <UserData data="E-mail" value={this.state.email} />
                                    </li>
                                    <li className="list-group-item">
                                        <PasswordButton />
                                    </li>
                                </ul>
                            </div>
                            <p id="password-msg" className="text-center mt-2"></p>
                        </MDBCol>
                        <MDBCol md="6">
                            <Switch>
                                <Route path="/users/me" exact component={UserAvatar} />
                                <Route
                                    path="/users/me/password"
                                    render={props => <PasswordForm {...props} userId={this.state.userId} />}
                                />
                            </Switch>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Router>
        );
    }
}
