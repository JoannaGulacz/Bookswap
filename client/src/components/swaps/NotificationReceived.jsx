import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

export default class NotificationReceived extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swaps: [],
        };

        this.handleAccept.bind(this);
        this.handleRefuse.bind(this);
        this.getSwaps.bind(this);
    }

    componentDidMount() {
        this.getSwaps();
    }

    getSwaps() {
        axios
            .get('/swaps/received')
            .then(response => {
                this.setState({
                    swaps: response.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleAccept(el) {
        axios.delete(`/swaps/bookcases/${el.bookToOffer._id}`).then(this.getSwaps());
        axios.delete(`/swaps/bookcases/${el.bookToGet._id}`).then(this.getSwaps());
        axios.put(`/bookcases/${el.bookToOffer._id}`, { user: el.userThatGetsOffer, change: false });
        axios.put(`/bookcases/${el.bookToGet._id}`, { user: el.user, change: false });
    }

    handleRefuse(id) {
        axios.delete(`/swaps/${id}`).then(this.getSwaps());
    }

    render() {
        if (this.state.swaps.length > 0) {
            return (
                <MDBRow center>
                    <MDBCol md="9">
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Swaps offers received:</h2>
                    </MDBCol>
                    {this.state.swaps.map((el, index) => {
                        return (
                            <MDBCol md="4" key={index}>
                                <MDBCard className="mt-3 text-center">
                                    <MDBCardBody>
                                        <MDBCardText>
                                            Give away: <br />"
                                            <Link to={`/books/${el.bookToGet.parentBook.id}`}>
                                                {el.bookToGet.title}
                                            </Link>
                                            "
                                            <br /> and get:
                                            <br />"
                                            <Link to={`/books/${el.bookToOffer.parentBook.id}`}>
                                                {el.bookToOffer.title}
                                            </Link>
                                            "
                                        </MDBCardText>
                                        <MDBCardText>Offer from {el.user.name}</MDBCardText>
                                        <MDBBtnGroup>
                                            <MDBBtn
                                                className="ml-1 pl-3 pr-3"
                                                color="success"
                                                onClick={() => this.handleAccept(el)}
                                            >
                                                <MDBIcon far icon="check-circle" style={{ fontSize: '2rem' }} />
                                            </MDBBtn>
                                            <MDBBtn
                                                className="ml-1 pl-3 pr-3"
                                                color="danger"
                                                onClick={() => this.handleRefuse(el._id)}
                                            >
                                                <MDBIcon far icon="times-circle" style={{ fontSize: '2rem' }} />
                                            </MDBBtn>
                                        </MDBBtnGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            );
        }
        return (
            <MDBRow center>
                <h2 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                    No swaps offers received.
                </h2>
            </MDBRow>
        );
    }
}
