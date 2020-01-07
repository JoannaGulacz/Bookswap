import React, { Component } from 'react';
import NotificationReceived from './NotificationReceived';
import NotificationSent from './NotificationSent';
import { MDBContainer } from 'mdbreact';
import axios from '../utils/axios';

export default class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swapsReceived: [],
            swapsSent: [],
        };
        this.handleCancel.bind(this);
        this.getReceivedSwaps.bind(this);
        this.getSentSwaps.bind(this);
    }

    getReceivedSwaps() {
        axios
            .get('/swaps/received')
            .then(response => {
                this.setState({
                    swapsReceived: response.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    getSentSwaps() {
        axios
            .get('/swaps/sent')
            .then(response => {
                this.setState({
                    swapsSent: response.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    handleCancel(id) {
        axios.delete(`/swaps/${id}`);
        this.getSentSwaps();
        console.log('ok');
    }

    render() {
        return (
            <MDBContainer>
                <NotificationReceived received={this.state.swapsReceived} />
                <NotificationSent sent={this.state.swapsSent} handleCancel={this.handleCancel} />
            </MDBContainer>
        );
    }
}
