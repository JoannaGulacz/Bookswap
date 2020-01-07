import React from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';

const Main = () => {
    return (
        <div>
            <MDBRow style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>ABOUT</MDBCardTitle>
                            <MDBCardText>
                                Book Swap is unique web platform for books enthusiast. In here you can dive into role of
                                literary critic by leaving reviews on your favorite books, show off your own home
                                library or, most importantly, be involved in exchaning books with other users.
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Virtual library</MDBCardTitle>
                            <MDBCardText>Here you can browse through our ever growing database of books.</MDBCardText>
                            <MDBBtn href="/books">Go to library</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBBtn href="/swap">Swap some books!</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Main;
