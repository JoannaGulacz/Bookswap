import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBBtnGroup, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

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
    }
    render() {
        if (this.state.swaps.length > 0) {
            return (
                <MDBRow center className="mt-3">
                    <MDBCol md="9">
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Swap offers sent:</h2>
                    </MDBCol>
                    {this.state.swaps.map((el, index) => {
                        return (
                            <MDBCol md="4" key={index}>
                                <MDBCard className="mt-3 text-center">
                                    <MDBCardBody>
                                        <MDBCardText>
                                            Give away: <br />"
                                            <Link to={`/books/${el.bookToOffer.parentBook.id}`}>
                                                {el.bookToOffer.title}
                                            </Link>
                                            "
                                            <br /> and get: <br />"
                                            <Link to={`/books/${el.bookToGet.parentBook.id}`}>
                                                {el.bookToGet.title}
                                            </Link>
                                            "
                                        </MDBCardText>
                                        <MDBCardText>Offer to {el.userThatGetsOffer.name}</MDBCardText>
                                        <MDBBtnGroup>
                                            <MDBBtn
                                                className="pl-3 pr-3"
                                                color="danger"
                                                onClick={ev => this.handleCancel(ev, el._id)}
                                                disabled={false}
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
            <MDBRow center className="mt-3">
                <h2 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>No swaps offers sent.</h2>
            </MDBRow>
        );
    }
}
