import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

const DropdownPage = () => {
    return (
        <MDBDropdown>
            <MDBDropdownToggle caret color="primary">
                PROFILE
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
                <MDBDropdownItem>Change your password</MDBDropdownItem>
                <MDBDropdownItem>Your reviews</MDBDropdownItem>
                <MDBDropdownItem>Your bookcase</MDBDropdownItem>
                <MDBDropdownItem>Notifications</MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem>Log out</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};

export default DropdownPage;
