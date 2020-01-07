import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import { useFormik } from 'formik';

const AddBookcase = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            publisher: '',
            category: '',
            change: false,
        },
        onSubmit: values => {
            axios
                .post('bookcases', {
                    title: formik.values.title,
                    author: formik.values.author,
                    publisher: formik.values.publisher,
                    category: formik.values.category,
                    change: formik.values.change,
                })
                .then(function(response) {
                    alert('Bookcase added');
                })
                .catch(function(error) {
                    alert('Bookcase not added');
                });
        },
    });
    return (
        <MDBContainer className="d-flex justify-content-center">
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="h4 text-center mb-4">Add new bookcase</div>
                            <MDBInput
                                label="Title"
                                group
                                type="text"
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            <MDBInput
                                label="Author"
                                group
                                type="text"
                                name="author"
                                id="author"
                                onChange={formik.handleChange}
                                value={formik.values.author}
                            />
                            <MDBInput
                                label="Publisher"
                                group
                                type="text"
                                name="publisher"
                                id="publisher"
                                onChange={formik.handleChange}
                                value={formik.values.publisher}
                            />
                            <MDBInput
                                label="Category"
                                group
                                type="text"
                                name="category"
                                id="category"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                            />
                            <MDBRow className="d-flex align-items-center mb-4">
                                <MDBCol md="6" className="text-center">
                                    <label htmlFor="title" className="grey-text">
                                        Swap possible
                                    </label>
                                </MDBCol>
                                <MDBCol md="6" className="text-center">
                                    <div className="md-form pb-3">
                                        <div className="form-check my-4">
                                            <MDBInput
                                                group
                                                type="checkbox"
                                                name="change"
                                                id="change"
                                                onChange={formik.handleChange}
                                                checked={formik.values.change}
                                            />
                                        </div>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <div className="text-center mt-4">
                                <MDBBtn type="submit">Add</MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBContainer>
    );
};

export default AddBookcase;
