import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
    return (
        <div>
            <MDBRow>
                <MDBCol lg="8">
                    <MDBCard className="card">
                        <MDBCardBody>
                            <MDBCardTitle className="about-title">About</MDBCardTitle>
                            <MDBCardText className="about-text">
                                Book Swap is unique web platform for books enthusiast. In here you can dive into role of
                                literary critic by leaving reviews on your favorite books, show off your own home
                                library or, most importantly, be involved in exchaning books with other users.
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Virtual library</MDBCardTitle>
                            <MDBCardText>Here you can browse through our ever growing database of books.</MDBCardText>
                            <Link to="/books">
                                <MDBBtn className="btn-cta">Go to library</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol lg="8">
                    <MDBCard>
                        <MDBCardBody>
                            <Link to="/swap">
                                <MDBBtn className="btn-cta">Swap some books!</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Main;
