import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

// Komponent na potrzeby testów routera - DO USUNIĘCIA
const RouterTestHome = () => {
    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>Testing rout - home</MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default RouterTestHome;
