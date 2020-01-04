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

export default class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: undefined,
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
            born: '',
            died: '',
            rating: '',
        };
        axios
            .get('http://localhost:5000/api/authors/' + this.props._id)
            .then(data => {
                this.setState({
                    author: data.data.data[0],
                });
                if (this.state.author.born) {
                    this.setState({
                        infoText:
                            this.state.infoText +
                            'born: ' +
                            new Date(this.state.author.born).toLocaleDateString() +
                            '<br />',
                    });
                }
                if (this.state.author.died) {
                    this.setState({
                        infoText:
                            this.state.infoText +
                            'died: ' +
                            new Date(this.state.author.died).toLocaleDateString() +
                            '<br />',
                    });
                }
                if (this.state.author.rating) {
                    this.setState({
                        infoText: this.state.infoText + 'rating: ' + this.state.author.rating + '<br />',
                    });
                }
                this.setState({
                    name: this.state.author.name,
                });
                if (this.state.author.died) {
                    this.setState({
                        died: new Date(this.state.author.died).toLocaleDateString(),
                    });
                }

                if (this.state.author.born) {
                    this.setState({
                        born: new Date(this.state.author.born).toLocaleDateString(),
                    });
                }

                if (this.state.author.rating) {
                    this.setState({
                        rating: this.state.author.rating,
                    });
                }
            })
            .catch(err => {
                alert('aaa');
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
        axios.delete('http://localhost:5000/api/authors/' + this.state.author._id).then(data => {
            this.setState({
                modal: !this.state.modal,
                modalInfo: !this.state.modalInfo,
            });
            if (data.data.success === true) {
                this.setState({
                    modalText: 'Author deleted',
                    modalSuccess: true,
                    shouldPrevent: () => {},
                });
            } else {
                this.setState({
                    modalText: 'The author is assigned to the book and cannot be deleted',
                    modalSuccess: false,
                    shouldPrevent: e => e.preventDefault(),
                });
            }
        });
    };

    toggleEditConfirm = () => {
        axios
            .put('http://localhost:5000/api/authors/' + this.state.author._id, {
                name: this.state.name,
                born: this.state.born,
                died: this.state.died,
                rating: this.state.rating,
            })
            .then(data => {
                this.setState({
                    modalEditText: 'Author edited',
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.setState({
                    modalEditText: 'The author has not been edited',
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
                modalHref: 'http://localhost:3000/authors',
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

    render() {
        if (this.state.author === undefined || this.state.author === []) {
            return '';
        } else {
            const ListGroupPage = () => {
                // if (this.state.author.books[0] === undefined) {
                //     return '';
                // } else {
                return (
                    <MDBContainer>
                        <MDBListGroup md="6">
                            {this.state.author.books.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ fontSize: 12 }}
                                        >
                                            <a href={'/books/' + e._id}>
                                                Title: {e.title} <br />
                                                Publisher: {e.publisher.name}
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
                            src="/author.jpg"
                            overlay="white-slight"
                            hover
                            waves
                            alt="MDBCard image cap"
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.author.name}</MDBCardTitle>
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
                                    Edit author
                                    <MDBIcon icon="edit" className="ml-2" />
                                </h5>
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggle}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete author
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        <MDBModalBody>Are you sure you want to delete this author?</MDBModalBody>
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
                                <p className="h4 text-center mb-4">Edit author</p>
                                <label className="grey-text">Name</label>
                                <input
                                    type="text"
                                    value={this.state.name}
                                    className="form-control"
                                    onChange={this.handleNameChange}
                                    required
                                />
                                <br />
                                <label className="grey-text">Born</label>
                                <input
                                    type="text"
                                    value={this.state.born}
                                    className="form-control"
                                    onChange={this.handleBornChange}
                                />
                                <br />
                                <label className="grey-text">Died</label>
                                <input
                                    type="text"
                                    value={this.state.died}
                                    className="form-control"
                                    onChange={this.handleDiedChange}
                                />
                                <br />
                                <label className="grey-text">Rating</label>
                                <input
                                    type="text"
                                    value={this.state.rating}
                                    className="form-control"
                                    onChange={this.handleRatingChange}
                                />
                                {/* <div className="text-center mt-4">
                                        <MDBBtn type="submit">Save</MDBBtn>
                                    </div> */}
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
