import React from 'react';
import './Logo.css';

import LogoContainer from './LogoContainer';
import LogoTitle from './LogoTittle';

const Logo = props => {
    return (
        <LogoContainer>
            <LogoTitle {...props} />
        </LogoContainer>
    );
};

export default Logo;
