import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

import axios from 'axios';

export default class ReviewsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            reviews: [],
            author: '',
            content: '',
            rating: 0,
            modalEdit: false,
            modal: false,
            modalInfo: false,
            modalEditText: '',
            modalText: '',
            reviewId: '',
        };
        this.toggleEdit.bind(this);
        this.handleEdit.bind(this);
        this.toggle.bind(this);
        this.toggleDelete.bind(this);
        this.handleDelete.bind(this);
        this.toggleEditConfirm.bind(this);
        this.toggleEditLast.bind(this);
        this.toggleLast.bind(this);

        axios
            .get('reviews/myReviews')
            .then(data => this.setState({ reviews: data.data.data }))
            .catch(function(error) {
                console.log(error.response.data);
            });
    }

    handleDelete = id => {
        this.toggle();
        this.setState({
            reviewId: id,
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
            .delete('http://localhost:5000/api/reviews/' + this.state.reviewId)
            .then(() => {
                this.setState({
                    modalText: 'Review deleted',
                });
            })
            .catch(error => {
                this.setState({
                    modalText: `Review could't be deleted`,
                });
                console.log(error.response.data);
            });
    };

    handleEdit = id => {
        this.toggleEdit();
        this.setState({
            reviewId: id,
        });
        axios
            .get('http://localhost:5000/api/reviews/' + id)
            .then(response => {
                this.setState({
                    title: response.data.data.book.title,
                });
                this.setState({
                    author: response.data.data.book.author.name,
                });
                this.setState({
                    content: response.data.data.content,
                });
                this.setState({
                    rating: response.data.data.rating,
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
            .put('http://localhost:5000/api/reviews/' + this.state.reviewId, {
                title: this.state.title,
                content: this.state.content,
                rating: this.state.rating,
            })
            .then(() => {
                this.setState({
                    modalEditText: 'Review edited',
                });
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    modalEditText: 'The review has not been edited',
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

    handleContentChange = event => {
        const value = event.target.value;
        this.setState({
            content: value,
        });
    };

    handleRatingChange = event => {
        const value = event.target.value;
        this.setState({
            rating: value,
        });
    };

    render() {
        const ListOfReviews = () => {
            return (
                <div className="d-flex justify-content-center">
                    <MDBCol md="12">
                        {this.state.reviews.map((e, i) => {
                            return (
                                <div key={i}>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <MDBCardTitle>{e.book.title}</MDBCardTitle>
                                            <hr />
                                            <MDBCardText>
                                                <strong>author:</strong> {e.book.author.name}
                                                <br />
                                                <strong>review:</strong> {e.content}
                                                <br />
                                                <strong>rating:</strong> {e.rating}
                                            </MDBCardText>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.handleEdit(e._id)}
                                                className="black-text d-flex justify-content-end"
                                            >
                                                <h5>
                                                    Edit review
                                                    <MDBIcon icon="edit" className="ml-2" />
                                                </h5>
                                            </div>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.handleDelete(e._id)}
                                                className="black-text d-flex justify-content-end"
                                            >
                                                <h5>
                                                    Delete review
                                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                                </h5>
                                            </div>
                                            <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                                                <MDBModalBody>
                                                    Are you sure you want to delete this review?
                                                </MDBModalBody>
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
                                                    <a href={'http://localhost:3000/reviews'}>
                                                        <MDBBtn color="success" onClick={this.toggleLast}>
                                                            Close
                                                        </MDBBtn>
                                                    </a>
                                                </MDBModalFooter>
                                            </MDBModal>
                                        </MDBCardBody>
                                    </MDBCard>
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
                    {ListOfReviews()}
                    <MDBModal isOpen={this.state.modalEdit} toggle={this.toggleEdit} centered>
                        <MDBModalBody>
                            <form>
                                <p className="h4 text-center mb-4">Edit review</p>
                                <label className="grey-text">Title</label>
                                <input type="text" value={this.state.title} className="form-control" disabled />
                                <br />
                                <label className="grey-text">Author</label>
                                <input type="text" value={this.state.author} className="form-control" disabled />
                                <br />
                                <label className="grey-text">Content</label>
                                <textarea
                                    rows="10"
                                    cols="30"
                                    value={this.state.content}
                                    className="form-control"
                                    onChange={this.handleContentChange}
                                />
                                <br />
                                <div>
                                    <label className="grey-text">Rating</label>
                                    <select
                                        label="Rating"
                                        className="browser-default custom-select"
                                        onChange={this.handleRatingChange}
                                    >
                                        <option>Choose your grade</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <br />
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
                            <a href={'http://localhost:3000/reviews'}>
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
