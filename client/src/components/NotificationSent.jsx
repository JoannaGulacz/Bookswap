import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup } from 'mdbreact';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

export default class NotificationSent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swaps: [],
        };

        this.handleCancel.bind(this);
        this.getSwaps.bind(this);
    }

    componentDidMount() {
        this.getSwaps();
    }

    getSwaps() {
        axios
            .get('/swaps/sent')
            .then(response => {
                this.setState({
                    swaps: response.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleCancel(ev, id) {
        axios.delete(`/swaps/${id}`).then(this.getSwaps());
        ev.target.disabled = true;
        ev.target.innerHTML = 'Cancelled';
    }
    render() {
        if (this.state.swaps.length > 0) {
            return (
                <MDBRow center className="mt-3">
                    <MDBCol md="6">
                        <h2 className="text-center">Swap offers sent:</h2>
                        {this.state.swaps.map(el => {
                            return (
                                <MDBCard key={el._id} className="mt-3">
                                    <MDBCardBody>
                                        <MDBCardText>
                                            Give away
                                            <Link to={`/books/${el.bookToOffer.parentBook}`}>
                                                {' '}
                                                '{el.bookToOffer.title}'{' '}
                                            </Link>
                                            <br /> and get
                                            <Link to={`/books/${el.bookToGet.parentBook}`}>
                                                {' '}
                                                '{el.bookToGet.title}'{' '}
                                            </Link>
                                        </MDBCardText>
                                        <MDBCardText>Offer to {el.userThatGetsOffer.name}</MDBCardText>
                                        <MDBBtnGroup className="d-block text-center">
                                            <MDBBtn
                                                className="ml-3 w-50"
                                                color="danger"
                                                onClick={ev => this.handleCancel(ev, el._id)}
                                                disabled={false}
                                            >
                                                Cancel
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
            <MDBRow center className="mt-3">
                <h2 style={{ textAlign: 'center' }}>No swaps offers sent.</h2>
            </MDBRow>
        );
    }
}
