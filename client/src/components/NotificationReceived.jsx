import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup } from 'mdbreact';
import { Link } from 'react-router-dom';

const NotificationReceived = props => {
    console.log(props);
    if (props.received.length > 0) {
        return (
            <MDBRow center>
                <h2>Swaps offers received:</h2>
                <MDBCol md="6">
                    {props.received.map(el => {
                        return (
                            <MDBCard key={el._id} className="mt-3">
                                <MDBCardBody>
                                    <MDBCardText>
                                        Give away
                                        <Link to={`/books/${el.bookToGet.parentBook}`}> '{el.bookToGet.title}' </Link>
                                        <br /> and get
                                        <Link to={`/books/${el.bookToOffer.parentBook}`}>
                                            {' '}
                                            '{el.bookToOffer.title}'{' '}
                                        </Link>
                                    </MDBCardText>
                                    <MDBCardText>Offer from {el.user.name}</MDBCardText>
                                    <MDBBtnGroup className="d-block text-center">
                                        <MDBBtn
                                            className="mr-3"
                                            color="success"
                                            onClick={() => console.log(`${el.title}`)}
                                        >
                                            Accept
                                        </MDBBtn>
                                        <MDBBtn className="ml-3" color="danger" onClick={() => console.log('no')}>
                                            Refuse
                                        </MDBBtn>
                                    </MDBBtnGroup>
                                </MDBCardBody>
                            </MDBCard>
                        );
                    })}
                </MDBCol>
            </MDBRow>
        );
    }
    return (
        <MDBRow center>
            <h2>No swaps offers received.</h2>
        </MDBRow>
    );
};

export default NotificationReceived;
