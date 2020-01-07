import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../utils/axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio: 4,
            title: '',
        };
    }

    onClick = nr => () => {
        this.setState({
            radio: nr,
        });
    };

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/books/' + this.props._id)
            .then(response => {
                this.setState({ title: response.data.data.title });
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
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
                                    axios
                                        .post('reviews', {
                                            title: this.state.title,
                                            rating: fields.rating,
                                            content: fields.content,
                                        })
                                        .then(function(response) {
                                            alert('Review added');
                                        })
                                        .catch(function(error) {
                                            console.log(error.response);
                                            alert('Review not added');
                                        });
                                }}
                                render={({ errors, touched }) => (
                                    <Form>
                                        <p className="h4 text-center mb-4">Add new review</p>
                                        <div className="form-group">
                                            <label htmlFor="title" className="grey-text">
                                                Title
                                            </label>
                                            <Field
                                                name="title"
                                                type="text"
                                                value={this.state.title}
                                                disabled
                                                className="form-control"
                                            />
                                            <br />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="content" className="grey-text">
                                                Rating
                                            </label>
                                            <br />
                                            <Field as="select" name="rating">
                                                <option>Choose your grade</option>
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
                                                    (errors.content && touched.content ? ' is-invalid' : '')
                                                }
                                            />
                                            <ErrorMessage name="content" component="div" className="invalid-feedback" />
                                            <br />
                                        </div>
                                        <div className="text-center mt-4">
                                            <MDBBtn type="submit">Add</MDBBtn>
                                        </div>
                                    </Form>
                                )}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        );
    }
}
export default withRouter(Reviews);
