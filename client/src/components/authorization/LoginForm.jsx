import React, { Component } from 'react';
import { MDBCard } from 'mdbreact';
import axios from '../../utils/axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default class LoginForm extends Component {
    render() {
        return (
            <MDBCard>
                <Formik>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            props: this.props,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup.string()
                                .min(5, 'Password must be at least 5 characters')
                                .required('Password is required'),
                        })}
                        onSubmit={fields => {
                            axios
                                .post('users/login', {
                                    email: fields.email,
                                    password: fields.password,
                                })
                                .then(response => {
                                    console.log(response.data.success);
                                    const token = response.data.token;
                                    fields.props.loginHandler(token);
                                    fields.props.history.push('/');
                                })
                                .catch(error => {
                                    document.getElementById('loginError').innerHTML = `${error.response.data}`;
                                });
                        }}
                        onReset={() => {
                            document.getElementById('loginError').innerHTML = ``;
                        }}
                        render={({ errors, status, touched }) => (
                            <Form className="pl-4 pr-4 pt-4">
                                <h4 className="text-center">Sign in</h4>
                                <p id="loginError" className="red-text" />
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={
                                            'form-control' + (errors.email && touched.email ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                            'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        Login
                                    </button>
                                    <button type="reset" className="btn btn-secondary">
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        )}
                    />
                </Formik>
            </MDBCard>
        );
    }
}
