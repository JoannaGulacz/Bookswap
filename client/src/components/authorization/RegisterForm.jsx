import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MDBCard } from 'mdbreact';
import axios from '../../utils/axios';

export default class RegisterForm extends Component {
    render() {
        return (
            <MDBCard>
                <Formik>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            props: this.props,
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup.string()
                                .min(5, 'Password must be at least 6 characters')
                                .required('Password is required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Confirm Password is required'),
                        })}
                        onSubmit={fields => {
                            axios
                                .post('users/register', {
                                    name: fields.name,
                                    email: fields.email,
                                    password: fields.password,
                                    role: 'user',
                                })
                                .then(function(response) {
                                    const token = response.data.token;
                                    fields.props.loginHandler(token);
                                    fields.props.history.push('/users/me');
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                        }}
                        render={({ errors, status, touched }) => (
                            <Form className="pl-4 pr-4 pt-4">
                                <h4 className="text-center">Sign up</h4>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                                    />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
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
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={
                                            'form-control' +
                                            (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        Register
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
