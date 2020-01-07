import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import Nav from './Nav';

import Logo from '../logo/Logo';

const Menu = props => {
    return (
        <div>
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
        </div>
    );
};

export default Menu;
