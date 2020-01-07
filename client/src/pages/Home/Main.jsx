import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

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
                            <Link to="/books">
                                <MDBBtn>Go to library</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <Link to="/swap">
                                <MDBBtn>Swap some books!</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Main;
