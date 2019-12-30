import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';

const TextContent = props => {
    return (
        <MDBContainer>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{props.title}</MDBCardTitle>
                    <MDBCardText>{props.content}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default TextContent;
