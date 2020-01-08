import React from 'react';
import { MDBCard } from 'mdbreact';
import axios from '../../utils/axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default class PasswordForm extends React.Component {
    render() {
        return (
            <MDBCard>
                <Formik>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                            props: this.props,
                        }}
                        validationSchema={Yup.object().shape({
                            currentPassword: Yup.string()
                                .min(5, 'Password must be at least 6 characters')
                                .required('Password is required'),
                            newPassword: Yup.string()
                                .min(5, 'Password must be at least 6 characters')
                                .required('Password is required'),
                            confirmPassword: Yup.string()
                                .min(5, 'Password must be at least 6 characters')
                                .required('Password is required'),
                        })}
                        onSubmit={fields => {
                            if (fields.newPassword === fields.confirmPassword) {
                                axios
                                    .put(`users/me/updatepassword`, {
                                        currentPassword: fields.currentPassword,
                                        newPassword: fields.newPassword,
                                    })
                                    .then(() => {
                                        fields.props.history.push('/users/me');
                                        document.getElementById('password-msg').innerHTML =
                                            "<span style='color: green'><b>Password changed successfully</b></span>";
                                    })
                                    .catch(error => {
                                        document.getElementById(
                                            'password-msg'
                                        ).innerHTML = `<span style='color: red'><b>${error.response.data}</b></span>`;
                                    });
                            } else {
                                document.getElementById('password-msg').innerHTML =
                                    "<span style='color: red'><b>Passwords don't match</b></span>";
                            }
                        }}
                        render={({ errors, status, touched }) => (
                            <Form className="pl-4 pr-4 pt-4">
                                <h4 className="text-center">Change your password</h4>
                                <div className="form-group">
                                    <label htmlFor="currentPassword" className="grey-text">
                                        Old password
                                    </label>
                                    <Field
                                        name="currentPassword"
                                        type="password"
                                        className={
                                            'form-control' +
                                            (errors.currentPassword && touched.currentPassword ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currentPassword" className="grey-text">
                                        New password
                                    </label>
                                    <Field
                                        name="newPassword"
                                        type="text"
                                        className={
                                            'form-control' +
                                            (errors.newPassword && touched.newPassword ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currentPassword" className="grey-text">
                                        Confirm new password
                                    </label>
                                    <Field
                                        name="confirmPassword"
                                        type="text"
                                        className={
                                            'form-control' +
                                            (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                                        }
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        Confirm change
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
