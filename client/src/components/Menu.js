import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import Nav from './Nav';

// TO DO: username zalogowanego użytkownika / inne UserMenu w przypadku niezalogowania
const Menu = props => {
    return (
        <div>
            <MDBContainer>
                <MDBRow className="align-items-center mt-2">
                    <MDBCol md="10">
                        <h1 className="text-center">BOOKSWAP</h1>
                    </MDBCol>
                    <MDBCol md="2">
                        <div className="text-center">{props.username}</div>
                        <div className="text-center">{props.children}</div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="my-1">
                    <MDBCol size="12">
                        <Nav />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Menu;
