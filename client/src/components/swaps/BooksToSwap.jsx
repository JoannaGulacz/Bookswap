import React from 'react';
import { MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { useFormik } from 'formik';

const BooksToSwap = props => {
    const formik = useFormik({
        initialValues: {
            title: '',
            filteredByTitle: '',
        },
        onSubmit: () => {
            props.updateBooks(formik.values.title);
        },
    });

    return (
        <MDBCol>
            <MDBCard className="mb-4">
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
    );
};

export default BooksToSwap;