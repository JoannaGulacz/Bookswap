import React from 'react';

import NavLink from './NavLink';
import SearchDropdown from './SearchDropdown';
import SearchLink from './SearchLink';
import NavContainer from './NavContainer';

const Nav = () => {
    return (
        <NavContainer>
            <NavLink route="/" name="Home" />
            <NavLink route="/swap" name="Books to swap" />

            <SearchDropdown>
                <SearchLink route="/books" name="Books" />
                <SearchLink route="/authors" name="Authors" />
                <SearchLink route="/publishers" name="Publishers" />
                <SearchLink route="/categories" name="Categories" />
            </SearchDropdown>
        </NavContainer>
    );
};

export default Nav;
