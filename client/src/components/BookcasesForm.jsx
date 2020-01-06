import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBContainer,
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
        };

        axios
            .get('http://localhost:5000/api/bookcases/')
            // .then(function(response) {
            //     console.log(response.data.data);
            // })
            .then(data => {
                this.setState({ bookcases: data.data.data });
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
        this.toggleEdit.bind(this);
        this.handleEdit.bind(this);
        this.onSubmit.bind(this);
        this.handleTitleChange.bind(this);
    }

    handleEdit = id => {
        this.toggleEdit();
        axios
            .get('http://localhost:5000/api/bookcases/' + id)
            .then(response => {
                console.log('aaaaaaaaaaaaaa');
                console.log(response.data);
                // console.log(response.data.data[0]);
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

    handleTitleChange = event => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };
    onSubmit = event => {
        // event.preventDefault();
        // console.log(this.state.title);
        // axios
        //     .get('http://localhost:5000/api/bookcases/search/' + this.state.title)
        //     .then(data => this.setState({ bookcases: data.data.data }));
    };

    render() {
        return (
            <MDBContainer className="d-flex justify-content-center">
                <MDBCol md="6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBBtn rounded href="/addbookcase">
                            Add new bookcase
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
                            onChange={this.handleTitleChange}
                            placeholder="Search bookcase"
                            aria-label="Search"
                        />
                    </form>
                    {this.state.bookcases.map((e, i) => {
                        return (
                            <div key={i}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>{e.title}</MDBCardTitle>
                                        <hr />
                                        <MDBCardText>author: {e.parentBook.author.name}</MDBCardText>
                                        <MDBCardText>publisher: {e.parentBook.publisher.name}</MDBCardText>
                                        <MDBCardText>category: {e.parentBook.category.name}</MDBCardText>
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
                                        {/* <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={this.toggle}
                                            className="black-text d-flex justify-content-end"
                                        >
                                            <h5>
                                                Delete bookcase
                                                <MDBIcon icon="trash-alt" className="ml-2" />
                                            </h5>
                                        </div> */}
                                    </MDBCardBody>
                                </MDBCard>
                                <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleEdit} centered>
                                    <MDBModalBody>
                                        <form onSubmit={this.onSubmit}>
                                            <p className="h4 text-center mb-4">Edit bookcase</p>
                                            <label className="grey-text">Title</label>
                                            <input
                                                type="text"
                                                value={this.state.title}
                                                className="form-control"
                                                onChange={this.handleTitleChange}
                                                required
                                            />
                                            <br />
                                            <label className="grey-text">Author</label>
                                            <input
                                                type="text"
                                                value={this.state.author}
                                                className="form-control"
                                                onChange={this.handleAuthorChange}
                                            />
                                            <br />
                                            <label className="grey-text">Publisher</label>
                                            <input
                                                type="text"
                                                value={this.state.publisher}
                                                className="form-control"
                                                onChange={this.handlePublisherChange}
                                            />
                                            <br />
                                            <label className="grey-text">Category</label>
                                            <input
                                                type="text"
                                                value={this.state.category}
                                                className="form-control"
                                                onChange={this.handleCategoryChange}
                                            />
                                            <br />
                                            {/* <MDBRow className="d-flex align-items-center mb-4">
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
                                    </MDBRow> */}
                                            <label className="grey-text">Swap</label>
                                            <input
                                                type="checkbox"
                                                checked={this.state.change}
                                                className="form-control"
                                                onChange={this.handleChangeChange}
                                            />
                                            {/* <div className="text-center mt-4">
                                            <MDBBtn type="submit">Save</MDBBtn>
                                        </div> */}
                                        </form>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="success" onClick={this.handleEdit}>
                                            Cancel
                                        </MDBBtn>
                                        <MDBBtn color="success" onClick={this.toggleEditConfirm}>
                                            Save
                                        </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </div>
                        );
                    })}
                </MDBCol>
            </MDBContainer>
        );
    }
}
