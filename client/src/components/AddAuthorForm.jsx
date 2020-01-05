import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import axios from 'axios';

export default class AddAuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            born: '',
            died: '',
            rating: '',
            modal: false,
            modalText: '',
        };
        this.toggle.bind(this);
    }

    handleNameChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    };

    handleBornChange = event => {
        const value = event.target.value;
        this.setState({
            born: value,
        });
    };

    handleDiedChange = event => {
        const value = event.target.value;
        this.setState({
            died: value,
        });
    };

    handleRatingChange = event => {
        const value = event.target.value;
        this.setState({
            rating: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/authors/', {
                name: this.state.name,
                born: this.state.born,
                died: this.state.died,
                rating: this.state.rating,
            })
            .then(data => {
                this.setState({ modalText: 'A new author has been added successfully.' });
                this.toggle();
            })
            .catch(err => {
                this.setState({
                    modalText: 'Adding author failed.',
                });
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
                            <p className="h4 text-center mb-4">Add new author</p>
                            <label className="grey-text">Name</label>
                            <input type="text" className="form-control" onChange={this.handleNameChange} required />
                            <br />
                            <label className="grey-text">Born</label>
                            <input type="text" className="form-control" onChange={this.handleBornChange} />
                            <br />
                            <label className="grey-text">Died</label>
                            <input type="text" className="form-control" onChange={this.handleDiedChange} />
                            <br />
                            <label className="grey-text">Rating</label>
                            <input type="text" className="form-control" onChange={this.handleRatingChange} />
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
