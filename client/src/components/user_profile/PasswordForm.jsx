import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../../utils/axios';
import { useFormik } from 'formik';

// TO DO: hasło się nie haszuje po zmianie

const PasswordForm = props => {
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: () => {
            if (formik.values.newPassword === formik.values.confirmPassword) {
                axios
                    .put(`users/${props.userId}`, { password: formik.values.newPassword })
                    .then(res => {
                        console.log('Password changed successfully');
                        props.history.push('/users/me');
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    });
            } else {
                console.log("Passwords don't match");
            }
        },
    });

    return (
        <MDBCard>
            <MDBCardBody>
                <form onSubmit={formik.handleSubmit}>
                    <p className="h4 text-center mb-4">Change your password</p>
                    <label htmlFor="newPassword" className="grey-text">
                        New password
                    </label>
                    <input
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        required
                    />
                    <br />
                    <label htmlFor="confirmPassword" className="grey-text">
                        Confirm new password
                    </label>
                    <input
                        type="text"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        required
                    />
                    <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit">
                            Confirm change
                        </MDBBtn>
                    </div>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
};

export default PasswordForm;
