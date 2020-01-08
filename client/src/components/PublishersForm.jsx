import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

import axios from 'axios';

export default class PublishersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            publishers: [],
            newname: '',
            modal: false,
            modalSubmit: false,
            modalText: '',
            shouldPrevent: () => {},
        };
        this.onSubmit.bind(this);
        this.handleNameChange.bind(this);
        this.toggle.bind(this);
        this.toggleSubmit.bind(this);
        this.toggleClose.bind(this);

        axios.get('http://localhost:5000/api/publishers/').then(data => this.setState({ publishers: data.data.data }));
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    toggleSubmit = () => {
        this.setState({
            modal: !this.state.modal,
            modalSubmit: !this.state.modalSubmit,
        });
        axios
            .post('http://localhost:5000/api/publishers/', {
                name: this.state.name,
            })
            .then(data => {
                this.setState({
                    modalText: 'A new publisher has been added successfully.',
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.setState({
                    modalText: 'Adding publisher failed.',
                    shouldPrevent: e => e.preventDefault(),
                });
            });
    };

    toggleClose = () => {
        this.setState({
            modalSubmit: !this.state.modalSubmit,
        });
    };

    handleNameChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();
        axios.get('http://localhost:5000/api/publishers/search/' + this.state.name).then(data => {
            this.setState({
                publishers: data.data.data,
            });
        });
    };
    render() {
        return (
            <MDBCol md="6">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDBBtn rounded onClick={this.toggle}>
                        Add new publisher
                    </MDBBtn>
                </div>
                <hr />
                <form
                    className="form-inline mt-4 mb-4"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    onSubmit={this.onSubmit}
                >
                    <button type="submit" value="submit" style={{ all: 'unset' }}>
                        <MDBIcon icon="search" />
                    </button>
                    <input
                        className="form-control form-control-sm ml-3 w-75"
                        type="text"
                        onChange={this.handleNameChange}
                        placeholder="Search publisher"
                        aria-label="Search"
                    />
                </form>
                {this.state.publishers.map((e, i) => {
                    return (
                        <div key={i}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{e.name}</MDBCardTitle>
                                    <hr />
                                    {/* <MDBCardText>{e.author.name}</MDBCardText> */}
                                    <a href={'/publishers/' + e._id} className="black-text d-flex justify-content-end">
                                        <h5>
                                            More information
                                            <MDBIcon icon="angle-double-right" className="ml-2" />
                                        </h5>
                                    </a>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    );
                })}

                <MDBModal isOpen={this.state.modal} toggle={this.toggleEdit} centered>
                    <MDBModalBody>
                        <form onSubmit={this.onSubmit}>
                            <p className="h4 text-center mb-4">Add publisher</p>
                            <label className="grey-text">Name</label>
                            <input
                                type="text"
                                value={this.state.name}
                                className="form-control"
                                onChange={this.handleNameChange}
                                required
                            />
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.toggle}>Cancel</MDBBtn>
                        <MDBBtn onClick={this.toggleSubmit}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={this.state.modalSubmit} toggle={this.toggleClose} centered>
                    <MDBModalBody>{this.state.modalText}</MDBModalBody>
                    <MDBModalFooter>
                        <a href="/publishers" onClick={this.state.shouldPrevent}>
                            <MDBBtn color="success" onClick={this.toggleClose}>
                                Close
                            </MDBBtn>
                        </a>
                    </MDBModalFooter>
                </MDBModal>
            </MDBCol>
        );
    }
}
