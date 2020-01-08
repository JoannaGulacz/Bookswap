import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import InfoPopup from '../components/search/InfoPopup';

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            publisher: '',
            category: '',
        };
        this.infoPopup = React.createRef();
        this.Schema = Yup.object().shape({
            title: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!'),
            author: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!'),
            publisher: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!'),
            category: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!'),
          });
    } 

    onSubmit = event => {
        // event.preventDefault();
        axios
            .post('http://localhost:5000/api/books/', {
                title: this.state.title,
                author: this.state.author,
                publisher: this.state.publisher,
                category: this.state.category,
            })
            .then(() => {
                this.infoPopup.current.setState({ 
                    text: 'A new book has been added successfully.'
                });
            })
            .catch(() => {
                this.infoPopup.current.setState({ 
                    text: 'A book with this title already exists'
                });
            });
            this.infoPopup.current.toggle();
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <Formik
                            validationSchema={this.Schema}
                            initialValues={{
                                title: '',
                                author: '',
                                publisher: '',
                                category: ''
                            }}
                            onSubmit={values => {
                                this.setState({
                                    title: values.title,
                                    author: values.author,
                                    publisher: values.publisher,
                                    category: values.category
                                })
                                this.onSubmit()
                            }}>
                            {({ errors, touched }) => (
                                <Form>
                                <p className="h4 text-center mb-4">Add new book</p>
                                <label className="grey-text">Title</label>
                                <Field name="title" type="text" className="form-control" required />
                                {errors.title && touched.title ? (
                                    <MDBCardText>{errors.title}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Author</label>
                                <Field name="author" type="text" className="form-control" required />
                                {errors.author && touched.author ? (
                                    <MDBCardText>{errors.author}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Publisher</label>
                                <Field name="publisher"
                                    type="text"
                                    className="form-control"
                                    required
                                />
                                {errors.publisher && touched.publisher ? (
                                    <MDBCardText>{errors.publisher}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Category</label>
                                <Field name="category" type="text" className="form-control" required />
                                {errors.category && touched.category ? (
                                    <MDBCardText>{errors.category}</MDBCardText>
                                ) : null}
                                <div className="text-center mt-4">
                                    <MDBBtn type="submit">Add</MDBBtn>
                                </div>
                                </Form>
                            )}
                        </Formik>
                    </MDBCardBody>
                </MDBCard>

                <InfoPopup ref={this.infoPopup} buttonText="Close"></InfoPopup>
            </MDBCol>
        </div>
        );
    }
}
