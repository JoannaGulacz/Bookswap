import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup } from 'mdbreact';
import { Link } from 'react-router-dom';

const NotificationSent = props => {
    if (props.sent.length > 0) {
        return (
            <MDBRow center className="mt-3">
                <h2>Swap offers sent:</h2>
                <MDBCol md="6">
                    {props.sent.map(el => {
                        return (
                            <MDBCard key={el._id} className="mt-3">
                                <MDBCardBody>
                                    <MDBCardText>
                                        Give away
                                        <Link to={`/books/${el.bookToOffer.parentBook}`}>
                                            {' '}
                                            '{el.bookToOffer.title}'{' '}
                                        </Link>
                                        <br /> and get
                                        <Link to={`/books/${el.bookToGet.parentBook}`}> '{el.bookToGet.title}' </Link>
                                    </MDBCardText>
                                    <MDBCardText>Offer to {el.userThatGetsOffer.name}</MDBCardText>
                                    <MDBBtnGroup className="d-block text-center">
                                        <MDBBtn
                                            className="ml-3"
                                            color="danger"
                                            onClick={() => props.handleCancel(`${el._id}`)}
                                        >
                                            Cancel
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
        <MDBRow center className="mt-3">
            <h2>No swaps offers sent.</h2>
        </MDBRow>
    );
};
export default NotificationSent;
