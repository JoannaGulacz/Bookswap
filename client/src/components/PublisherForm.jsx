import React, { Component } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
} from 'mdbreact';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

import axios from 'axios';

export default class PublisherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher: undefined,
            infoText: '',
            modal: false,
            modalEdit: false,
            modalInfo: false,
            modalEditInfo: false,
            modalText: '',
            modalEditText: '',
            modalHref: '',
            modalSuccess: false,
            shouldPrevent: () => {},

            name: '',
        };
        axios.get('http://localhost:5000/api/publishers/' + this.props._id).then(data => {
            this.setState({
                publisher: data.data.data,
            });
            this.setState({
                name: this.state.publisher.name,
            });
        });
        this.toggle.bind(this);
        this.toggleDelete.bind(this);
        this.toggleLast.bind(this);
        this.toggleEdit.bind(this);
        this.toggleEditConfirm.bind(this);
        this.toggleEditLast.bind(this);
        this.onSubmit.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    toggleEdit = () => {
        this.setState({
            modalEdit: !this.state.modalEdit,
        });
    };

    toggleDelete = () => {
        axios
            .delete('http://localhost:5000/api/publishers/' + this.state.publisher._id)
            .then(data => {
                this.setState({
                    modalText: 'Publisher deleted',
                    modalSuccess: true,
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.setState({
                    modalText: 'The publisher is assigned to the book and cannot be deleted',
                    modalSuccess: false,
                    shouldPrevent: e => e.preventDefault(),
                });
            });
        this.setState({
            modal: !this.state.modal,
            modalInfo: !this.state.modalInfo,
        });
    };

    toggleEditConfirm = () => {
        axios
            .put('http://localhost:5000/api/publishers/' + this.state.publisher._id, {
                name: this.state.name,
            })
            .then(data => {
                this.setState({
                    modalEditText: 'Publisher edited',
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.setState({
                    modalEditText: 'The publisher has not been edited',
                    shouldPrevent: e => e.preventDefault(),
                });
            });
        this.setState({
            modalEdit: !this.state.modalEdit,
            modalEditInfo: !this.state.modalEditInfo,
        });
    };

    onSubmit = () => {
        this.setState({
            modalEditInfo: !this.state.modalEditInfo,
        });
    };

    toggleLast = () => {
        if (this.state.modalSuccess === true) {
            this.setState({
                modalInfo: !this.state.modalInfo,
                modalHref: 'http://localhost:3000/publishers',
            });
        } else {
            this.setState({
                modalInfo: !this.state.modalInfo,
                modalHref: '',
            });
        }
    };

    toggleEditLast = () => {
        this.setState({
            modalEditInfo: !this.state.modalEditInfo,
        });
    };

    handleNameChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    };

    render() {
        if (this.state.publisher === undefined || this.state.publisher === []) {
            return '';
        } else {
            const ListGroupPage = () => {
                return (
                    <MDBContainer>
                        <MDBListGroup md="6">
                            {this.state.publisher.books.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ fontSize: 12 }}
                                        >
                                            <a href={'/books/' + e._id}>
                                                Title: {e.title} <br />
                                                Author: {e.author.name}
                                            </a>
                                            <br />
                                        </MDBListGroupItem>
                                    </div>
                                );
                            })}
                        </MDBListGroup>
                    </MDBContainer>
                );
                // }
            };

            return (
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardImage
                            top
                            src="/publisher.jpg"
                            overlay="white-slight"
                            hover
                            waves
                            alt="MDBCard image cap"
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.publisher.name}</MDBCardTitle>
                            <hr />
                            {<div className="card-text" dangerouslySetInnerHTML={{ __html: this.state.infoText }} />}
                            <MDBCardText></MDBCardText>
                            {ListGroupPage()}
                            <br />
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggleEdit}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Edit publisher
                                    <MDBIcon icon="edit" className="ml-2" />
                                </h5>
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggle}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete publisher
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        <MDBModalBody>Are you sure you want to delete this publisher?</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="success" onClick={this.toggle}>
                                No
                            </MDBBtn>
                            <MDBBtn color="danger" onClick={this.toggleDelete}>
                                Yes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.modalInfo} toggle={this.toggleLast} centered>
                        <MDBModalBody>{this.state.modalText}</MDBModalBody>
                        <MDBModalFooter>
                            <a href={this.state.modalHref} onClick={this.state.shouldPrevent}>
                                <MDBBtn color="success" onClick={this.toggleLast}>
                                    Close
                                </MDBBtn>
                            </a>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleEdit} centered>
                        <MDBModalBody>
                            <form onSubmit={this.onSubmit}>
                                <p className="h4 text-center mb-4">Edit publisher</p>
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
                            <MDBBtn color="success" onClick={this.toggleEdit}>
                                Cancel
                            </MDBBtn>
                            <MDBBtn color="success" onClick={this.toggleEditConfirm}>
                                Save
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBModal isOpen={this.state.modalEditInfo} toggle={this.toggleEditLast} centered>
                        <MDBModalBody>{this.state.modalEditText}</MDBModalBody>
                        <MDBModalFooter>
                            <a href={this.state.modalHref} onClick={this.state.shouldPrevent}>
                                <MDBBtn color="success" onClick={this.toggleEditLast}>
                                    Close
                                </MDBBtn>
                            </a>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBCol>
            );
        }
    }
}
