import React from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';

const Main = () => {
    return (
        <MDBContainer>
            <MDBRow style={{ margin: '20px auto', textAlign: 'center' }}>
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
            <MDBRow style={{ margin: '20px auto', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Virtual library</MDBCardTitle>
                            <MDBCardText>Here you can browse through our ever growing database of books.</MDBCardText>
                            <MDBBtn href="#">Go to library</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow style={{ margin: '20px auto', textAlign: 'center' }}>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBBtn href="#">Swap some books!</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Main;
