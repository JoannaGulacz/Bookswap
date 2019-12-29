import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

// Komponent na potrzeby testów routera - DO USUNIĘCIA
const RouterTest = () => {
    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>Testing rout</MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default RouterTest;
