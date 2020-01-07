import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Nav from './Nav';

import Logo from '../logo/Logo';

const Menu = props => {
    return (
        <div>
            <MDBContainer>
                <MDBRow className="align-items-center mt-2">
                    <MDBCol md="12">
                        <Logo title="BOOKSWAP" />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-1 mb-4">
                    <MDBCol md="10">
                        <Nav />
                    </MDBCol>
                    <MDBCol md="2">
                        <div className="text-center">{props.children}</div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Menu;

/*
<MDBRow className="align-items-center mt-2">
                    <MDBCol size="10">
                        <Logo title="BOOKSWAP" />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mt-1 mb-4">
                    <MDBCol size="10">
                        <Nav />
                    </MDBCol>
                    <MDBCol md="2">
                        <div className="text-center">{props.children}</div>
                    </MDBCol>
                </MDBRow>
                 */
