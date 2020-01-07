import React from 'react';
import axios from '../utils/axios';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { Link } from 'react-router-dom';
import { Component } from 'react';

export default class FormToOfferSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookToGet: this.props.bookcases.length > 0 ? this.props.bookcases[0]._id : '',
            bookToOffer: this.props.booksToOffer.length > 0 ? this.props.booksToOffer[0]._id : '',
            buttonText: 'send offer',
            isDisabled: this.props.bookcases.length === 0 ? true : false,
            swaps: [],
        };
        this.handleUserOnChange.bind(this);
        this.handleBookOnChange.bind(this);
        this.handleSubmit.bind(this);
        this.getSwaps.bind(this);
        this.getSwaps();
    }

    getSwaps = async () => {
        await axios
            .get(`/swaps/sent`, { user: this.props.user.id })
            .then(response => {
                this.setState({ swaps: response.data.data }, function() {
                    this.updateButton();
                });
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
    };

    updateButton = () => {
        if (this.state.bookToGet.length === 0) {
            this.setState({ isDisabled: true, buttonText: 'invalid' });
        } else {
            this.setState({ isDisabled: false, buttonText: 'send offer' });
            this.props.bookcases.map(el => {
                if (el.id === this.state.bookToOffer) {
                    if (el.parentBook === this.props.book.id)
                        this.setState({ isDisabled: true, buttonText: 'invalid' });
                }
            });
            this.state.swaps.filter(el => {
                if (el.bookToGet._id === this.state.bookToGet && el.bookToOffer._id === this.state.bookToOffer)
                    this.setState({ isDisabled: true, buttonText: 'offer sent' });
            });
        }
    };

    handleUserOnChange = e => {
        this.setState({ bookToGet: e.target.value }, function() {
            this.updateButton();
        });
    };
    handleBookOnChange = e => {
        this.setState({ bookToOffer: e.target.value }, function() {
            this.updateButton();
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        await this.getSwaps();
        this.setState({ isDisabled: true, buttonText: 'offer sent' });
        axios
            .post(`bookcases/${this.state.bookToGet}/swaps`, {
                bookToOffer: this.state.bookToOffer,
            })
            .then(function(response) {
                console.log(response.data.data);
            })
            .catch(function(error) {
                console.log(error.response.data);
            });
    };

    render() {
        if (this.props.booksToOffer.length > 0) {
            return (
                <MDBCol md="6" className="mb-2" style={{ textAlignLast: 'center' }}>
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={this.handleSubmit} style={{ textAlignLast: 'center' }}>
                                <label htmlFor="bookToGet" className="grey-text">
                                    Swap with
                                </label>
                                <br />
                                <select name="bookToGet" onChange={this.handleUserOnChange} style={{ width: '70%' }}>
                                    {this.props.bookcases.map(el => {
                                        if (el.owner.name !== this.props.user.name) {
                                            return (
                                                <option
                                                    key={`${el._id}`}
                                                    value={`${el._id}`}
                                                    label={`${el.owner.name}`}
                                                />
                                            );
                                        } else {
                                            return <option key={`${el._id}`} value={``} label={`You own this copy`} />;
                                        }
                                    })}
                                </select>
                                <br />
                                <br />
                                <label htmlFor="bookToOffer" className="grey-text">
                                    Choose book to offer
                                </label>
                                <br />
                                <select
                                    width="50"
                                    name="bookToOffer"
                                    onChange={this.handleBookOnChange}
                                    style={{ width: '70%' }}
                                >
                                    {this.props.booksToOffer.map(el => {
                                        return <option key={`${el._id}`} value={`${el._id}`} label={`${el.title}`} />;
                                    })}
                                </select>
                                <br />
                                <br />
                                <MDBBtn rounded style={{ width: '40%' }} type="submit" disabled={this.state.isDisabled}>
                                    {this.state.buttonText}
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            );
        }
        return (
            <MDBRow center>
                <MDBCol className="mt-2" style={{ textAlign: 'center' }}>
                    You have no books to offer.
                    <br />
                    <Link to={`../../addbookcase`}>Try to add some first</Link>
                </MDBCol>
            </MDBRow>
        );
    }
}
