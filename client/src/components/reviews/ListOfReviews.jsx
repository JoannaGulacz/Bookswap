import React from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

const ListOfReviews = (reviews, deleteF, editF) => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCol md="6">
                {reviews.map((e, i) => {
                    return (
                        <div key={i}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{e.book.title}</MDBCardTitle>
                                    <hr />
                                    <MDBCardText>
                                        <strong>author:</strong> {e.book.author.name}
                                        <br />
                                        <strong>review:</strong> {e.content}
                                        <br />
                                        <strong>rating:</strong> {e.rating}
                                    </MDBCardText>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => editF(e._id)}
                                        className="black-text d-flex justify-content-end"
                                    >
                                        <h5>
                                            Edit review
                                            <MDBIcon icon="edit" className="ml-2" />
                                        </h5>
                                    </div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => deleteF(e._id)}
                                        className="black-text d-flex justify-content-end"
                                    >
                                        <h5>
                                            Delete review
                                            <MDBIcon icon="trash-alt" className="ml-2" />
                                        </h5>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    );
                })}
            </MDBCol>
        </div>
    );
};

export default ListOfReviews;
