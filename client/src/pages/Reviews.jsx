import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../utils/axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';

class Reviews extends Component {
    state = {
        radio: 4,
    };

    onClick = nr => () => {
        this.setState({
            radio: nr,
        });
    };
    render() {
        return (
            <MDBContainer>
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <Formik
                                initialValues={{
                                    title: '',
                                    rating: '',
                                    content: '',
                                }}
                                onSubmit={fields => {
                                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
                                    axios
                                        .post('reviews', {
                                            title: fields.title,
                                            rating: fields.rating,
                                            content: fields.content,
                                        })
                                        .then(function(response) {
                                            console.log(response);
                                        })
                                        .catch(function(error) {
                                            console.log(error.response.data);
                                        });
                                }}
                                render={({ errors, status, touched }) => (
                                    <Form>
                                        <p className="h4 text-center mb-4">Add a new review</p>
                                        <div className="form-group">
                                            <label htmlFor="title" className="grey-text">
                                                Title
                                            </label>
                                            <Field
                                                name="title"
                                                type="text"
                                                className={
                                                    'form-control' +
                                                    (errors.firstName && touched.firstName ? ' is-invalid' : '')
                                                }
                                            />
                                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                            <br />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content" className="grey-text">
                                                Rating
                                            </label>
                                            <br />
                                            <Field as="select" name="rating">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content" className="grey-text">
                                                Content
                                            </label>
                                            <Field
                                                name="content"
                                                component="textarea"
                                                rows="5"
                                                className={
                                                    'form-control' +
                                                    (errors.firstName && touched.firstName ? ' is-invalid' : '')
                                                }
                                            />
                                            <ErrorMessage name="content" component="div" className="invalid-feedback" />
                                            <br />
                                        </div>
                                        <div className="text-center mt-4">
                                            <MDBBtn color="indigo" type="submit">
                                                Add
                                            </MDBBtn>
                                        </div>
                                    </Form>
                                )}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBContainer>
        );
    }
}
export default Reviews;
