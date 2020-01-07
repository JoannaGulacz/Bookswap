import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup } from 'mdbreact';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

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

    handleAccept(ev, el) {
        ev.target.disabled = true;
        ev.target.nextElementSibling.disabled = true;
        ev.target.innerHTML = 'Accepted';
        axios.delete(`/swaps/${el._id}`).then(this.getSwaps());
        axios.put(`/bookcases/${el.bookToOffer._id}`, { user: el.userThatGetsOffer });
        axios.put(`/bookcases/${el.bookToGet._id}`, { user: el.user });
    }

    handleRefuse(ev, id) {
        ev.target.disabled = true;
        ev.target.previousElementSibling.disabled = true;
        ev.target.innerHTML = 'Refused';
        axios.delete(`/swaps/${id}`).then(this.getSwaps());
    }

    render() {
        if (this.state.swaps.length > 0) {
            return (
                <MDBRow center>
                    <MDBCol md="9">
                        <h2 className="text-center">Swaps offers received:</h2>
                        {this.state.swaps.map(el => {
                            return (
                                <MDBCard key={el._id} className="mt-3">
                                    <MDBCardBody>
                                        <MDBCardText>
                                            Give away
                                            <Link to={`/books/${el.bookToGet.parentBook}`}>
                                                {' '}
                                                '{el.bookToGet.title}'{' '}
                                            </Link>
                                            <br /> and get
                                            <Link to={`/books/${el.bookToOffer.parentBook}`}>
                                                {' '}
                                                '{el.bookToOffer.title}'{' '}
                                            </Link>
                                        </MDBCardText>
                                        <MDBCardText>Offer from {el.user.name}</MDBCardText>
                                        <MDBBtnGroup className="d-block text-center">
                                            <MDBBtn
                                                className="mr-3 w-40"
                                                color="success"
                                                onClick={ev => this.handleAccept(ev, el)}
                                            >
                                                Accept
                                            </MDBBtn>
                                            <MDBBtn
                                                className="ml-3 w-40"
                                                color="danger"
                                                onClick={ev => this.handleRefuse(ev, el._id)}
                                            >
                                                Refuse
                                            </MDBBtn>
                                        </MDBBtnGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            );
                        })}
                    </MDBCol>
                </MDBRow>
            );
        }
        return (
            <MDBRow center>
                <h2 style={{ textAlign: 'center' }}>No swaps offers received.</h2>
            </MDBRow>
        );
    }
}
