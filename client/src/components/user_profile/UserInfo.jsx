import React from 'react';

import UserData from './UserData';
import PasswordButton from './PasswordButton';

const UserInfo = props => {
    return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <UserData data="User Name" value={props.userName} />
                </li>
                <li className="list-group-item">
                    <UserData data="Role" value={props.role} />
                </li>
                <li className="list-group-item">
                    <UserData data="E-mail" value={props.email} />
                </li>
                <li className="list-group-item">
                    <PasswordButton />
                </li>
            </ul>
        </div>
    );
};

export default UserInfo;
