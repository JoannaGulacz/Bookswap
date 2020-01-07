import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../../utils/axios';
import { useFormik } from 'formik';

const PasswordForm = props => {
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: () => {
            if (formik.values.newPassword === formik.values.confirmPassword) {
                axios
                    .put(`users/me/updatepassword`, {
                        currentPassword: formik.values.currentPassword,
                        newPassword: formik.values.newPassword,
                    })
                    .then(() => {
                        console.log('Password changed successfully');
                        props.history.push('/users/me');
                        document.getElementById('password-msg').innerHTML =
                            "<span style='color: green'><b>Password changed successfully</b></span>";
                    })
                    .catch(error => {
                        console.log(error.response.data);
                        document.getElementById(
                            'password-msg'
                        ).innerHTML = `<span style='color: red'><b>${error.response.data}</b></span>`;
                    });
            } else {
                console.log("Passwords don't match");
                document.getElementById('password-msg').innerHTML =
                    "<span style='color: red'><b>Passwords don't match</b></span>";
            }
        },
    });

    return (
        <MDBCard>
            <MDBCardBody>
                <form onSubmit={formik.handleSubmit}>
                    <p className="h4 text-center mb-4">Change your password</p>
                    <label htmlFor="currentPassword" className="grey-text">
                        Old password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.currentPassword}
                        required
                    />
                    <br />
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
