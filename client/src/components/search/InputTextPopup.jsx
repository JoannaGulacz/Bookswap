import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBCardText } from 'mdbreact';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export default class InputTextPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            text: '',
            buttonText: '',
            buttonDisplay: 'flex',
            value: ''
        };
        if (this.props.buttonText) {
            this.state.buttonText = this.props.buttonText
        }
        if (this.props.text) {
            this.state.text = this.props.text
        }
        if (this.props.buttonDisplay) {
            this.state.buttonDisplay = this.props.buttonDisplay
        }
        if (this.props.onSubmit) {
            this.onSubmitParent = this.props.onSubmit
        }
        
        this.Schema = Yup.object().shape({
            value: Yup.string().required('This field is required').min(5, 'Too Short!').max(20, 'Too Big!')
          });
    }

    propsUpdate = () => {
        if (this.props.value) {
            this.setState({
                value: this.props.value
            })
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleValueChange = (e) => {
        const v = e.target.value;
        this.setState({
            value: v
        });
    };

    onSubmit = (value) => {
        this.toggle();
        if (this.onSubmitParent) {
            this.onSubmitParent(this.state.value)
        }
    };

    render() {
        return (
            <div>
                <div style={{ display: this.state.buttonDisplay, justifyContent: 'center' }}>
                    <MDBBtn color="primary" rounded onClick={this.toggle}>
                        {this.state.buttonText}
                    </MDBBtn>
                </div>
                <Formik enableReinitialize={true}
                    validationSchema={this.Schema}
                    initialValues={{
                        value: this.state.value,
                    }}
                    onSubmit={values => {
                        this.setState({
                            value: values.value,
                        })
                        this.onSubmit(values.value)
                    }}>
                    {({ errors, touched }) => (
                        <MDBModal isOpen={this.state.isOpen}  toggle={this.toggle} centered>
                            <MDBModalBody>
                                <Form>
                                    <p className="h4 text-center mb-4">{this.state.text}</p>
                                    <label className="grey-text">Name</label>
                                    <Field name="value"
                                        type="text"
                                        className="form-control" 
                                        required
                                    />
                                    {errors.value && touched.value ? (
                                        <MDBCardText>{errors.value}</MDBCardText>
                                    ) : null}
                                    <MDBModalFooter>
                                        <MDBBtn onClick={this.toggle}>Cancel</MDBBtn>
                                        <MDBBtn type="submit">Save</MDBBtn>
                                    </MDBModalFooter>
                                </Form>
                            </MDBModalBody>
                        </MDBModal>
                    )}
                </Formik>
            </div>
        );
    }
}