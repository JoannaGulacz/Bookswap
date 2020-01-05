import React from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import axios from '../utils/axios';
import List from './List';
import { useFormik } from 'formik';

const BooksToSwap = props => {
    const formik = useFormik({
        initialValues: {
            title: '',
            //category: '',
        },
        onSubmit: () => {
            axios
                .get('bookcases/swaps/' + formik.values.title, {
                    title: formik.values.title,
                    //category: formik.values.category,
                })
                .then(function(response) {
                    props.updateBooks(response.data.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    });

    return (
        <div className="mb-3 d-flex justify-content-center">
            <MDBCol sm="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onChange={formik.handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                id="swapBookTitle"
                                className="form-control"
                                placeholder="search for book title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </div>
    );
};

export default BooksToSwap;
