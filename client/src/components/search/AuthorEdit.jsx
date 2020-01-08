import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBCardText } from 'mdbreact';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export default class AuthorEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            born: '',
            died: '',
            rating: '',
            linkBack: '',
            yes: 'Save',
            no: 'Cancel',
            shouldPrevent: e => e.preventDefault()
        };

        if (this.props.text) {
            this.state.text = this.props.text
        }
        if (this.props.yes) {
            this.state.yes = this.props.yes
        }
        if (this.props.no) {
            this.state.no = this.props.no
        }
        if (this.props.onSubmit) {
            this.onSubmitParent = this.props.onSubmit
        }
        if (this.props.linkBack) {
            this.state.linkBack = this.props.linkBack
            this.state.shouldPrevent = () => { }
        }

        this.Schema = Yup.object().shape({
            name: Yup.string().required('This field is required').min(3, 'Too Short!').max(100, 'Too Big!'),
            born: Yup.string(),
            died: Yup.string(),
            rating: Yup.number().min(1, 'From 1 to 10!').max(10, 'From 1 to 10!'),
        });
    }

    componentDidMount = () => {
        this.propsUpdate()
    }

    propsUpdate = () => {
        if (this.props.name) {
            this.setState({
                name: this.props.name
            })
        }
        if (this.props.born) {
            this.setState({
                born: this.props.born
            })
        }
        if (this.props.died) {
            this.setState({
                died: this.props.died
            })
        }
        if (this.props.rating) {
            this.setState({
                rating: this.props.rating
            })
        }
    }

    toggle = () => {
        this.propsUpdate()
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onSubmit = (value) => {
        this.toggle();
        if (this.onSubmitParent) {
            this.onSubmitParent(value)
        }
    };

    render() {
        return (
            <Formik enableReinitialize={true}
                validationSchema={this.Schema}
                initialValues={{
                    name: this.state.name,
                    born: (this.state.born),
                    died: (this.state.died),
                    rating: this.state.rating
                }}
                onSubmit={values => {
                    this.setState({
                        name: (values.name),
                        born: (values.born),
                        died: (values.died),
                        rating: (values.rating),
                    })
                    this.onSubmit(values)
                }}
            >
                {({ errors, touched }) => (
                    <MDBModal isOpen={this.state.isOpen} toggle={this.toggle} centered>
                        <MDBModalBody>
                            <Form>
                                <p className="h4 text-center mb-4">Edit author</p>
                                <label className="grey-text">Name</label>
                                <Field name="name"
                                    type="text"
                                    className="form-control"
                                    required
                                />
                                {errors.name && touched.name ? (
                                    <MDBCardText>{errors.name}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Born</label>
                                <Field name="born"
                                    type="text"
                                    className="form-control"
                                />
                                {errors.born && touched.born ? (
                                    <MDBCardText>{errors.born}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Died</label>
                                <Field name="died"
                                    type="text"
                                    className="form-control"
                                />
                                {errors.died && touched.died ? (
                                    <MDBCardText>{errors.died}</MDBCardText>
                                ) : null}
                                <br />
                                <label className="grey-text">Rating</label>
                                <Field name="rating"
                                    type="text"
                                    className="form-control"
                                />
                                {errors.rating && touched.rating ? (
                                    <MDBCardText>{errors.rating}</MDBCardText>
                                ) : null}
                                <MDBModalFooter>
                                    <MDBBtn color="success" onClick={this.toggle}>
                                        {this.state.no}
                                    </MDBBtn>
                                    <MDBBtn type="submit" color="success">
                                        {this.state.yes}
                                    </MDBBtn>
                                </MDBModalFooter>
                            </Form>
                        </MDBModalBody>
                    </MDBModal>
                )}
            </Formik>
        )
    }
}