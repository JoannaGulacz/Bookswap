import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class InfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            text: 'Processing..',
            buttonText: '',
            linkBack: '',
            shouldPrevent: e => e.preventDefault()
        };
        if (this.props.text) {
            this.state.text = this.props.text
        }
        if (this.props.linkBack) {
            this.state.linkBack = this.props.linkBack
            this.state.shouldPrevent = () => { }
        }
        if (this.props.buttonText) {
            this.state.buttonText = this.props.buttonText
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <MDBModal isOpen={this.state.isOpen} toggle={this.toggle} centered>
                <MDBModalBody>
                    {this.state.text}
                </MDBModalBody>
                <MDBModalFooter>
                    <Link to={this.state.linkBack} onClick={this.state.shouldPrevent}>
                        <MDBBtn color="primary" onClick={this.toggle}>
                            {this.state.buttonText}
                        </MDBBtn>
                    </Link>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}