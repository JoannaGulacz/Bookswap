import React from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../utils/axios';
import { useFormik } from 'formik';

const RegisterForm = props => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: () => {
            //if (formik.values.password === formik.values.confirmPassword) {
            document.getElementById('validationIcon').innerHTML = '<i class="ml-1 far fa-check-circle text-success">';
            axios
                .post('users/register', {
                    name: formik.values.name,
                    email: formik.values.email,
                    password: formik.values.password,
                    role: 'user',
                })
                .then(function(response) {
                    const token = response.data.token;
                    props.loginHandler(token);
                    props.history.push('/users/me');
                })
                .catch(function(error) {
                    console.log(error.response.data);
                });

            //DODAĆ PRZEJŚCIE DO STRONY O MNIE
            // }
            // else {
            //     document.getElementById('validationIcon').innerHTML =
            //         '<i class="ml-1 far fa-times-circle text-danger"></i>';
            // }
        },
    });
    return (
        <MDBCol md="6">
            <MDBCard>
                <MDBCardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <p className="h4 text-center mb-4">Sign up</p>
                        <label htmlFor="name" className="grey-text">
                            Your name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required
                        />
                        <br />
                        <label htmlFor="email" className="grey-text">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="emailForReg"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required
                        />
                        <br />
                        <label htmlFor="password" className="grey-text">
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="passwordForReg"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                        />
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Confirm your password
                            <span id="validationIcon"></span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            required
                        />
                        <div className="text-center mt-4">
                            <MDBBtn color="indigo" type="submit">
                                Register
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};
export default RegisterForm;
