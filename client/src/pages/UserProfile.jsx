import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserInfo from '../components/user_profile/UserInfo';
import UserAvatar from '../components/user_profile/UserAvatar';
import PasswordForm from '../components/user_profile/PasswordForm';
import PasswordMsg from '../components/user_profile/PasswordMsg';

const UserProfile = props => {
    return (
        <MDBContainer>
            <Router>
                <MDBRow>
                    <MDBCol md="6">
                        <UserInfo userName={props.userName} role={props.role} email={props.email} />
                        <PasswordMsg />
                    </MDBCol>
                    <MDBCol md="6">
                        <Switch>
                            <Route path="/users/me" exact component={UserAvatar} />
                            <Route path="/users/me/password" render={props => <PasswordForm {...props} />} />
                        </Switch>
                    </MDBCol>
                </MDBRow>
            </Router>
        </MDBContainer>
    );
};

export default UserProfile;
