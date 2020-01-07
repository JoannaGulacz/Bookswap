import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBInput,
} from 'mdbreact';

import axios from 'axios';

export default class BookcasesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            publisher: '',
            category: '',
            bookcases: [],
            change: false,
            bookcaseId: '',
            modalEdit: false,
            modal: false,
            modalInfo: false,
            modalEditText: '',
            modalText: '',
        };

        axios
            .get('http://localhost:5000/api/bookcases/library')
            .then(data => {
                this.setState({ bookcases: data.data.data });
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
        this.toggle.bind(this);
        this.toggleEdit.bind(this);
        this.toggleDelete.bind(this);
        this.handleDelete.bind(this);
        this.handleEdit.bind(this);
        this.onSubmit.bind(this);
        this.handleTitleChange.bind(this);
        this.toggleEditConfirm.bind(this);
        this.toggleEditLast.bind(this);
        this.toggleLast.bind(this);
    }

    handleDelete = id => {
        this.toggle();
        this.setState({
            bookcaseId: id,
        });
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    toggleDelete = () => {
        this.setState({
            modal: !this.state.modal,
            modalInfo: !this.state.modalInfo,
        });
        axios
            .delete('http://localhost:5000/api/bookcases/' + this.state.bookcaseId)
            .then(() => {
                this.setState({
                    modalText: 'Bookcase deleted',
                });
            })
            .catch(error => {
                this.setState({
                    modalText: `Bookcase could't be deleted`,
                });
                console.log(error.response.data);
            });
    };

    handleEdit = id => {
        this.toggleEdit();
        this.setState({
            bookcaseId: id,
        });
        axios
            .get('http://localhost:5000/api/bookcases/' + id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    title: response.data.data.title,
                });
                this.setState({
                    author: response.data.data.parentBook.author.name,
                });
                this.setState({
                    publisher: response.data.data.parentBook.publisher.name,
                });
                this.setState({
                    category: response.data.data.parentBook.category.name,
                });
                this.setState({
                    change: response.data.data.change,
                });
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
    };

    toggleEdit = () => {
        this.setState({
            modalEdit: !this.state.modalEdit,
        });
    };

    toggleEditConfirm = () => {
        axios
            .put('http://localhost:5000/api/bookcases/' + this.state.bookcaseId, {
                title: this.state.title,
                author: this.state.author,
                publisher: this.state.publisher,
                category: this.state.category,
                change: this.state.change,
            })
            .then(() => {
                this.setState({
                    modalEditText: 'Bookcase edited',
                });
            })
            .catch(err => {
                this.setState({
                    modalEditText: 'The bookcase has not been edited',
                });
            });
        this.setState({
            modalEdit: !this.state.modalEdit,
            modalEditInfo: !this.state.modalEditInfo,
        });
    };

    toggleEditLast = () => {
        this.setState({
            modalEditInfo: !this.state.modalEditInfo,
        });
    };

    toggleLast = () => {
        this.setState({
            modalInfo: !this.state.modalInfo,
        });
    };

    handleTitleChange = event => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    handleChangeChange = event => {
        const value = event.target.checked;
        this.setState({
            change: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();
        axios
            .get('http://localhost:5000/api/bookcases/search/' + this.state.title)
            .then(data => this.setState({ bookcases: data.data.data }));
    };

    render() {
        const ListOfBookcases = () => {
            return (
                <div className="d-flex justify-content-center">
                    <MDBCol md="12">
                        {this.state.bookcases.map((e, i) => {
                            return (
                                <div key={i}>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <MDBCardTitle>{e.title}</MDBCardTitle>
                                            <hr />
                                            <MDBCardText>
                                                <strong>author:</strong> {e.parentBook.author.name}
                                                <br />
                                                <strong>publisher:</strong> {e.parentBook.publisher.name}
                                                <br />
                                                <strong>category:</strong> {e.parentBook.category.name}
                                            </MDBCardText>
                                            <MDBCardText>
                                                {e.change ? (
                                                    <strong>SWAP IS POSSIBLE</strong>
                                                ) : (
                                                    <strong>SWAP IS UNAVAILABLE</strong>
                                                )}
                                            </MDBCardText>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.handleEdit(e._id)}
                                                className="black-text d-flex justify-content-end"
                                            >
                                                <h5>
                                                    Edit bookcase
                                                    <MDBIcon icon="edit" className="ml-2" />
                                                </h5>
                                            </div>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.handleDelete(e._id)}
                                                className="black-text d-flex justify-content-end"
                                            >
                                                <h5>
                                                    Delete bookcase
                                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                                </h5>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>

                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                                        <MDBModalBody>Are you sure you want to delete this bookcase?</MDBModalBody>
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
                                            <a href={'http://localhost:3000/bookcases'}>
                                                <MDBBtn color="success" onClick={this.toggleLast}>
                                                    Close
                                                </MDBBtn>
                                            </a>
                                        </MDBModalFooter>
                                    </MDBModal>
                                    <br />
                                </div>
                            );
                        })}
                        ;
                    </MDBCol>
                </div>
            );
        };
        return (
            <div className="d-flex justify-content-center">
                <MDBCol md="6">
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
                            onChange={this.handleTitleChange}
                            placeholder="Search bookcase"
                            aria-label="Search"
                        />
                    </form>
                    {ListOfBookcases()}
                    <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleEdit} centered>
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
                            <a href={'http://localhost:3000/bookcases'}>
                                <MDBBtn color="success" onClick={this.toggleEditLast}>
                                    Close
                                </MDBBtn>
                            </a>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBCol>
            </div>
        );
    }
}
