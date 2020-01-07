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
                <MDBCol
                    className="position-absolute"
                    style={{ position: 'fixed', right: '0px', top: '15px', zIndex: '1000' }}
                >
                    {props.children}
                </MDBCol>
                <MDBCol md="12">
                    <Nav />
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Menu;
