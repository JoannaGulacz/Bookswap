import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import InfoPopup from '../components/search/InfoPopup';

export default class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            born: '',
            died: '',
            rating: '',
        };
        this.infoPopup = React.createRef();

        this.Schema = Yup.object().shape({
            name: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!'),
            born: Yup.string(),
            died: Yup.string(),
            rating: Yup.number().min(1, 'From 1 to 10!').max(10, 'From 1 to 10!'),
          });
    }


    onSubmit = event => {
        axios
            .post('http://localhost:5000/api/authors/', {
                name: this.state.name,
                born: this.state.born,
                died: this.state.died,
                rating: this.state.rating,
            })
            .then(() => {
                this.infoPopup.current.setState({ 
                    text: 'A new author has been added successfully.' 
                });
            })
            .catch(() => {
                this.infoPopup.current.setState({ 
                    text: 'Adding author failed.' 
                });
            });
        this.infoPopup.current.toggle();
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
                                name: '',
                                born: '',
                                died: '',
                                rating: ''
                            }}
                            onSubmit={values => {
                                this.setState({
                                    name: values.name,
                                    born: values.born,
                                    died: values.died,
                                    rating: values.rating
                                })
                                this.onSubmit()
                            }}>
                            {({ errors, touched }) => (
                                <Form>
                                <p className="h4 text-center mb-4">Add new author</p>
                                <label className="grey-text">Name</label>
                                <Field name="name" type="text" className="form-control" required />
                                {errors.name && touched.name ? (
                                    <MDBCardText>{errors.name}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Born</label>
                                <Field name="born" type="text" className="form-control" />
                                {errors.born && touched.born ? (
                                    <MDBCardText>{errors.born}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Died</label>
                                <Field name="died" type="text" className="form-control" />
                                {errors.died && touched.died ? (
                                    <MDBCardText>{errors.died}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Rating</label>
                                <Field name="rating" type="text" className="form-control" />
                                {errors.rating && touched.rating ? (
                                    <MDBCardText>{errors.rating}</MDBCardText>
                                ) : null}
                                <div className="text-center mt-4">
                                    <MDBBtn type="submit">Add</MDBBtn>
                                </div>
                                </Form>
                            )}
                        </Formik>
                    </MDBCardBody>
                </MDBCard>

                <InfoPopup ref={this.infoPopup} linkBack="/authors" buttonText="Close"></InfoPopup>
            </MDBCol>
        </div>
        );
    }
}
