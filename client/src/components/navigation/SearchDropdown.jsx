import React from 'react';
import { MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu } from 'mdbreact';

const SearchDropdown = props => {
    return (
        <MDBNavItem>
            <MDBDropdown>
                <MDBDropdownToggle nav caret>
                    <span className="mr-2">Search</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>{props.children}</MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavItem>
    );
};

export default SearchDropdown;
