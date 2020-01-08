import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

export default class ConfirmPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            text: '',
            yes: 'Yes',
            no: 'No',
            value: ''
        };
        if (this.props.buttonText) {
            this.state.buttonText = this.props.buttonText
        }
        if (this.props.text) {
            this.state.text = this.props.text
        }
        if (this.props.yes) {
            this.state.yes = this.props.yes
        }
        if (this.props.no) {
            this.state.no = this.props.no
        }

        if (this.props.handleAction) {
            this.handleParentAction = this.props.handleAction
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleAction = () => {
        this.toggle()
        this.handleParentAction()
    }

    render() {
        return (
            <MDBModal isOpen={this.state.isOpen} toggle={this.toggle} centered>
                <MDBModalBody>
                    {this.state.text}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={this.toggle}>
                        {this.state.no}
                    </MDBBtn>
                    <MDBBtn color="danger" onClick={this.handleAction}>
                        {this.state.yes}
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        )
    }
}