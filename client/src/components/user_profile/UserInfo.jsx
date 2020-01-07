import React from 'react';

import UserData from './UserData';

const UserInfo = props => {
    return (
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
        </ul>
    );
};

export default UserInfo;
