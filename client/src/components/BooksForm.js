import React, { Component } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

import axios from 'axios';

export default class BooksForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            books: [],
        };
        this.onSubmit.bind(this);
        this.handleTitleChange.bind(this);
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
        axios
            .get('http://localhost:5000/api/books/search/' + this.state.title)
            .then(data => this.setState({ books: data.data.data }));
    };
    render() {
        return (
            <MDBCol md="6">
                <form
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
                        placeholder="Search book"
                        aria-label="Search"
                    />
                </form>
                {this.state.books.map((e, i) => {
                    return (
                        <div key={i}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{e.title}</MDBCardTitle>
                                    <hr />
                                    <MDBCardText>{e.author.name}</MDBCardText>
                                    <a href={'/book/' + e._id} className="black-text d-flex justify-content-end">
                                        <h5>
                                            More information
                                            <MDBIcon icon="angle-double-right" className="ml-2" />
                                        </h5>
                                    </a>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    );
                })}
            </MDBCol>
        );
    }
}
