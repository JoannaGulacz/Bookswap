import React from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import axios from '../utils/axios';
import { useFormik } from 'formik';

const BooksToSwap = () => {
    let books = axios
        .get('bookcases/swaps')
        .then(function(response) {
            books = response.data.data;
            console.log(books);
        })
        .catch(function(error) {
            console.log(error.response.data);
        });

    const formik = useFormik({
        initialValues: {
            title: '',
            books: [books],
            //category: '',
        },
        onSubmit: () => {
            axios
                .get('bookcases/swaps/' + formik.values.title, {
                    title: formik.values.title,
                    //category: formik.values.category,
                })
                .then(function(response) {
                    console.log(response.data.data);
                })
                .catch(function(error) {
                    console.log(error.response.data);
                });
        },
    });

    return (
        <MDBCol md="6">
            <MDBCard>
                <MDBCardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            id="swapBookTitle"
                            className="form-control"
                            placeholder="search for book title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        <div className="text-center mt-4">
                            <MDBBtn color="indigo" type="submit">
                                Search
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
            <MDBCard>
                <MDBCardBody>
                    
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};

export default BooksToSwap;
