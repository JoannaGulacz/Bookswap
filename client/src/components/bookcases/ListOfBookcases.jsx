import React from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

const ListOfBookcases = (bookcases, deleteF, editF) => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCol md="6">
                {bookcases.map((e, i) => {
                    return (
                        <div key={i}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{e.title}</MDBCardTitle>
                                    <hr />
                                    <MDBCardText>
                                        <strong>author:</strong> {e.parentBook.author.name}
                                        <br />
                                        <strong>publisher:</strong> {e.parentBook.publisher.name}
                                        <br />
                                        <strong>category:</strong> {e.parentBook.category.name}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {e.change ? (
                                            <strong>SWAP IS POSSIBLE</strong>
                                        ) : (
                                            <strong>SWAP IS UNAVAILABLE</strong>
                                        )}
                                    </MDBCardText>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => editF(e._id)}
                                        className="black-text d-flex justify-content-end"
                                    >
                                        <h5>
                                            Edit bookcase
                                            <MDBIcon icon="edit" className="ml-2" />
                                        </h5>
                                    </div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => deleteF(e._id)}
                                        className="black-text d-flex justify-content-end"
                                    >
                                        <h5>
                                            Delete bookcase
                                            <MDBIcon icon="trash-alt" className="ml-2" />
                                        </h5>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    );
                })}
                ;
            </MDBCol>
        </div>
    );
};
export default ListOfBookcases;
