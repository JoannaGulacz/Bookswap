import React from 'react';
import { MDBContainer, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../utils/axios';
import { useFormik } from 'formik';

const NewBook = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            publisher: '',
            category: '',
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            alert(formik.values.title);
            axios
                .post('bookcases', {
                    title: formik.values.title,
                    author: formik.values.author,
                    publisher: formik.values.publisher,
                    category: formik.values.category,
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error.response.data);
                });
        },
    });
    return (
        <MDBContainer>
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={formik.handleSubmit}>
                            <p className="h4 text-center mb-4">Add a new book</p>
                            <label htmlFor="title" className="grey-text">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            <br />
                            <label htmlFor="author" className="grey-text">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.author}
                            />
                            <br />
                            <label htmlFor="publisher" className="grey-text">
                                Publisher
                            </label>
                            <input
                                type="text"
                                name="publisher"
                                id="publisher"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.publisher}
                            />
                            <br />
                            <label htmlFor="category" className="grey-text">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                            />
                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">
                                    Add
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBContainer>
    );
};

export default NewBook;
