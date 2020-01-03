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
    MDBBadge,
    MDBContainer,
} from 'mdbreact';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

import axios from 'axios';

export default class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: undefined,
            modal: false,
            modalInfo: false,
            modalText: '',
            modalHref: '',
            modalSuccess: false,
            shouldPrevent: () => {},
        };
        axios
            .get('http://localhost:5000/api/books/' + this.props._id)
            .then(data => this.setState({ book: data.data.data }));
        this.toggle.bind(this);
        this.toggleDelete.bind(this);
        this.toggleLast.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    toggleDelete = () => {
        axios.delete('http://localhost:5000/api/books/' + this.state.book._id).then(data => {
            this.setState({
                modal: !this.state.modal,
                modalInfo: !this.state.modalInfo,
            });
            if (data.data.success === true) {
                this.setState({
                    modalText: 'Book deleted',
                    modalSuccess: true,
                    shouldPrevent: () => {},
                });
            } else {
                this.setState({
                    modalText: 'The book is assigned to the user and cannot be deleted',
                    modalSuccess: false,
                    shouldPrevent: e => e.preventDefault(),
                });
            }
        });
    };

    toggleLast = () => {
        if (this.state.modalSuccess === true) {
            this.setState({
                modalInfo: !this.state.modalInfo,
                modalHref: 'http://localhost:3000',
            });
        } else {
            this.setState({
                modalInfo: !this.state.modalInfo,
                modalHref: '',
            });
        }
    };

    render() {
        if (this.state.book === undefined || this.state.book === []) {
            return '';
        } else {
            const ListGroupPage = () => {
                if (this.state.book.reviews[0] === undefined) {
                    return '';
                } else {
                    return (
                        <MDBContainer>
                            <MDBListGroup md="6">
                                {this.state.book.reviews.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <MDBListGroupItem
                                                className="d-flex justify-content-between align-items-center"
                                                style={{ fontSize: 12 }}
                                            >
                                                {e.title}
                                                <br />
                                                {e.content}
                                                <MDBBadge color="primary" pill>
                                                    {e.rating}
                                                </MDBBadge>
                                            </MDBListGroupItem>
                                        </div>
                                    );
                                })}
                            </MDBListGroup>
                        </MDBContainer>
                    );
                }
            };

            return (
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardImage
                            top
                            src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                            overlay="white-slight"
                            hover
                            waves
                            alt="MDBCard image cap"
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.book.title}</MDBCardTitle>
                            <hr />
                            <MDBCardText>
                                author: {this.state.book.author.name} <br />
                                publisher: {this.state.book.publisher.name} <br />
                                category: {this.state.book.category.name} <br />
                                rating: {this.state.book._rating}
                            </MDBCardText>
                            <a href="/bookcases" /* <- link do dodawania recenzji */>
                                <div style={{ cursor: 'pointer' }} className="black-text d-flex justify-content-end">
                                    <h5>
                                        Write new review
                                        <MDBIcon icon="pen-fancy" className="ml-2" />
                                    </h5>
                                </div>
                            </a>
                            {ListGroupPage()}
                            <br />
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={this.toggle}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete book
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        <MDBModalBody>
                            Are you sure you want to delete this book?
                            <br />
                            (TO DO: implementacja usunięcia)
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
                            <a href={this.state.modalHref} onClick={this.state.shouldPrevent}>
                                <MDBBtn color="success" onClick={this.toggleLast}>
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
