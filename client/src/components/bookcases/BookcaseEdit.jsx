import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBRow, MDBCol, MDBInput } from 'mdbreact';

export default class AuthorEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: '',
            author: '',
            publisher: '',
            category: '',
            change: false,
            linkBack: '',
            yes: 'Save',
            no: 'Cancel',
            shouldPrevent: e => e.preventDefault(),
        };

        if (this.props.text) {
            this.state.text = this.props.text;
        }
        if (this.props.yes) {
            this.state.yes = this.props.yes;
        }
        if (this.props.no) {
            this.state.no = this.props.no;
        }
        if (this.props.onSubmit) {
            this.onSubmitParent = this.props.onSubmit;
        }
        if (this.props.linkBack) {
            this.state.linkBack = this.props.linkBack;
            this.state.shouldPrevent = () => {};
        }
    }

    componentDidMount = () => {
        this.propsUpdate();
    };

    propsUpdate = () => {
        if (this.props.title) {
            this.setState({
                title: this.props.title,
            });
        }
        if (this.props.author) {
            this.setState({
                author: this.props.author,
            });
        }
        if (this.props.publisher) {
            this.setState({
                publisher: this.props.publisher,
            });
        }
        if (this.props.category) {
            this.setState({
                category: this.props.category,
            });
        }
        if (this.props.change) {
            this.setState({
                change: this.props.change,
            });
        }
    };

    toggle = () => {
        this.propsUpdate();
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onSubmit = value => {
        this.toggle();
        if (this.onSubmitParent) {
            this.onSubmitParent(value);
        }
    };

    handleChangeChange = event => {
        const value = event.target.checked;
        this.setState({
            change: value,
        });
    };

    finalizeEdit = () => {
        this.onSubmit(this.state);
    };

    render() {
        return (
            <MDBModal isOpen={this.state.isOpen} toggle={this.toggle} centered>
                <MDBModalBody>
                    <form>
                        <p className="h4 text-center mb-4">Edit bookcase</p>
                        <label className="grey-text">Title</label>
                        <input type="text" value={this.state.title} className="form-control" disabled />
                        <br />
                        <label className="grey-text">Author</label>
                        <input type="text" value={this.state.author} className="form-control" disabled />
                        <br />
                        <label className="grey-text">Publisher</label>
                        <input type="text" value={this.state.publisher} className="form-control" disabled />
                        <br />
                        <label className="grey-text">Category</label>
                        <input type="text" value={this.state.category} className="form-control" disabled />
                        <br />
                        <MDBRow className="d-flex align-items-center mb-4">
                            <MDBCol md="6" className="text-center">
                                <label htmlFor="title" className="grey-text">
                                    Swap possible
                                </label>
                            </MDBCol>
                            <MDBCol md="6" className="text-center">
                                <div className="md-form pb-3">
                                    <div className="form-check my-4">
                                        <MDBInput
                                            group
                                            type="checkbox"
                                            name="change"
                                            id="change"
                                            onChange={this.handleChangeChange}
                                            checked={this.state.change}
                                        />
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={this.toggle}>
                        {this.state.no}
                    </MDBBtn>
                    <MDBBtn type="submit" color="success" onClick={this.finalizeEdit}>
                        {this.state.yes}
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}
