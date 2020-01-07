import React from 'react';

import UserDropdown from '../navigation/UserDropdown';
import LoginButton from '../navigation/LoginButton';

const DropdownPage = props => {
    if (props.isLogged) {
        return <UserDropdown {...props} />;
    }
    return <LoginButton />;
};

export default DropdownPage;
