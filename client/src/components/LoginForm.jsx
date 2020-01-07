import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from '../utils/axios';
import { useFormik } from 'formik';

const LoginForm = props => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: () => {
            axios
                .post('users/login', {
                    email: formik.values.email,
                    password: formik.values.password,
                })
                .then(function(response) {
                    console.log('Logged in successfully');
                    const token = response.data.token;
                    props.loginHandler(token);
                    props.history.push('/');
                })
                .catch(function(error) {
                    console.log(error.response.data);
                });

            //DODAĆ PRZEJŚCIE NA STRONĘ Z KTÓREJ PRZEKIEROWAŁO NA LOGOWANIE
        },
    });
    return (
        <MDBCard>
            <MDBCardBody>
                <form onSubmit={formik.handleSubmit}>
                    <p className="h4 text-center mb-4">Sign in</p>
                    <label htmlFor="email" className="grey-text">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
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
                        id="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                    <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit">
                            Login
                        </MDBBtn>
                    </div>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
};

export default LoginForm;
