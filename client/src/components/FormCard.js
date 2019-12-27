import React from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';

const FormCard = props => {
    return (
        <MDBContainer>
            <MDBRow>{props.children}</MDBRow>
        </MDBContainer>
    );
};

export default FormCard;
