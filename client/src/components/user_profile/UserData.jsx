import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';

const UserData = props => {
    return (
        <MDBRow>
            <MDBCol size="4">
                <b>{props.data}:</b>
            </MDBCol>
            <MDBCol size="8">{props.value}</MDBCol>
        </MDBRow>
    );
};

export default UserData;
