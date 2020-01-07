import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';
import FormToOfferSwap from './FormToOfferSwap';

const BookToSwap = props => {
    if (props.bookcases.length > 0 && props.book) {
        return (
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="6" className="mb-4">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>{props.book.title}</MDBCardTitle>
                                <hr />
                                <MDBCardText>
                                    author:{' '}
                                    <Link to={`../authors/${props.book.author._id}`}>{props.book.author.name} </Link>
                                    <br />
                                    publisher:{' '}
                                    <Link to={`../publishers/${props.book.publisher._id}`}>
                                        {props.book.publisher.name}
                                    </Link>{' '}
                                    <br />
                                    category:{' '}
                                    <Link to={`../categories/${props.book.category._id}`}>
                                        {props.book.category.name}
                                    </Link>{' '}
                                    <br />
                                    rating: {props.book._rating}/5 <br />
                                    number of copies available: {props.bookcases.length}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow center>
                    <FormToOfferSwap {...props} />
                </MDBRow>
            </MDBContainer>
        );
    }
    return (
        <MDBRow center>
            <MDBCol md="6" className="mt-2" style={{ textAlign: 'center' }}>
                Wait a sec for results to render.
            </MDBCol>
        </MDBRow>
    );
};
export default BookToSwap;
