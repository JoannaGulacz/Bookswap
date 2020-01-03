import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import axios from 'axios';

export default class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            publisher: '',
            category: '',
            modal: false,
            modalText: '',
        };
        this.toggle.bind(this);
    }

    handleTitleChange = event => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    handleAuthorChange = event => {
        const value = event.target.value;
        this.setState({
            author: value,
        });
    };

    handlePublisherChange = event => {
        const value = event.target.value;
        this.setState({
            publisher: value,
        });
    };

    handleCategoryChange = event => {
        const value = event.target.value;
        this.setState({
            category: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();
        let body = `{"title": "${this.state.title}",
        "author": "${this.state.author}",
        "publisher": "${this.state.publisher}",
        "category": "${this.state.category}"}`;
        console.log(body);
        axios
            .post('http://localhost:5000/api/books/', {
                title: this.state.title,
                author: this.state.author,
                publisher: this.state.publisher,
                category: this.state.category,
            })
            .then(data => {
                this.setState({ modalText: 'A new book has been added successfully.' });
                this.toggle();
            })
            .catch(err => {
                this.setState({ modalText: 'A book with this title already exists' });
                this.toggle();
            });
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        return (
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={this.onSubmit}>
                            <p className="h4 text-center mb-4">Add new book</p>
                            <label className="grey-text">Title</label>
                            <input type="text" className="form-control" onChange={this.handleTitleChange} required />
                            <br />
                            <label className="grey-text">Author</label>
                            <input type="text" className="form-control" onChange={this.handleAuthorChange} required />
                            <br />
                            <label className="grey-text">Publisher</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handlePublisherChange}
                                required
                            />
                            <br />
                            <label className="grey-text">Category</label>
                            <input type="text" className="form-control" onChange={this.handleCategoryChange} required />
                            <div className="text-center mt-4">
                                <MDBBtn type="submit">Add</MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                    <MDBModalBody>{this.state.modalText}</MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="success" onClick={this.toggle}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBCol>
        );
    }
}
