import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: {
                title: "title",
                author: {
                    name: "author name"
                }
            },
            link: ''
        };
        if (this.props.description) {
            this.state.description = this.props.description
        }
        if (this.props.link) {
            this.state.link = this.props.link
        }
    }

    render() {
        return (
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{this.state.description.title}</MDBCardTitle>
                    <hr />
                    <MDBCardText>{this.state.description.author.name}</MDBCardText>
                    <Link to={this.state.link} className="black-text d-flex justify-content-end">
                        <h5>
                            More information
                            <MDBIcon icon="angle-double-right" className="ml-2" />
                        </h5>
                    </Link>
                </MDBCardBody>
            </MDBCard>
        );
    }
}