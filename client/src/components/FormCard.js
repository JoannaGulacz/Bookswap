import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const FormCard = props => {
    return (
        <MDBContainer>
            <MDBRow>{props.children}</MDBRow>
        </MDBContainer>
    );
};

export default FormCard;
