import React, { Component } from 'react';
import { MDBCol, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

const AddBookcaseButton = () => {
    return (
        <div className="d-flex justify-content-center">
            <MDBCol md="6">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`../../addbookcase`}>
                        <MDBBtn rounded>Add new bookcase</MDBBtn>
                    </Link>
                </div>
            </MDBCol>
        </div>
    );
};

export default AddBookcaseButton;
