import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from 'mdbreact';

import axios from 'axios';

export default class ReviewsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            reviews: [],
        };
        this.onSubmit.bind(this);
        this.handleTitleChange.bind(this);

        axios
            .get('reviews/')
            // .then(function(response) {
            //     console.log(response.data.data);
            // })
            .then(data => this.setState({ reviews: data.data.data }))
            .catch(function(error) {
                console.log(error.response.data);
            });
    }
    handleTitleChange = event => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();
        console.log(this.state.title);
        // axios
        //     .get('http://localhost:5000/api/bookcases/search/' + this.state.title)
        //     .then(data => this.setState({ bookcases: data.data.data }));
    };
    render() {
        return (
            <MDBContainer className="d-flex justify-content-center">
                <MDBCol md="6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBBtn rounded href="/addreview">
                            Add new review
                        </MDBBtn>
                    </div>
                    <hr />
                    {/* <form
                        className="form-inline mt-4 mb-4"
                        style={{ display: 'flex', justifyContent: 'center' }}
                        onSubmit={this.onSubmit}
                    >
                        <button type="submit" value="submit" style={{ all: 'unset' }}>
                            <MDBIcon icon="search" />
                        </button>
                        <input
                            className="form-control form-control-sm ml-3 w-75"
                            type="text"
                            onChange={this.handleTitleChange}
                            placeholder="Search bookcase"
                            aria-label="Search"
                        />
                    </form> */}
                    {this.state.reviews.map((e, i) => {
                        return (
                            <div key={i}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>{e.book.title}</MDBCardTitle>
                                        <hr />
                                        <MDBCardText>author: {e.book.author.name}</MDBCardText>
                                        <MDBCardText>content: {e.content}</MDBCardText>
                                        <MDBCardText>rating: {e.rating}</MDBCardText>
                                        {/* <a href={'/bookcases/' + e._id} className="black-text d-flex justify-content-end">
                                            <h5>
                                                Edytuj
                                                <MDBIcon icon="angle-double-right" className="ml-2" />
                                            </h5>
                                        </a> */}
                                    </MDBCardBody>
                                </MDBCard>
                                <br />
                            </div>
                        );
                    })}
                </MDBCol>
            </MDBContainer>
        );
    }
}
