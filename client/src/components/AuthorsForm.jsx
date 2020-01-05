import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';

import axios from 'axios';

export default class AuthorsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            authors: [],
        };
        this.onSubmit.bind(this);
        this.handleNameChange.bind(this);

        axios.get('http://localhost:5000/api/authors/').then(data => this.setState({ authors: data.data.data }));
    }
    handleNameChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    };
    onSubmit = event => {
        event.preventDefault();
        console.log(this.state.name);
        axios
            .get('http://localhost:5000/api/authors/search/' + this.state.name)
            .then(data => this.setState({ authors: data.data.data }));
    };
    render() {
        return (
            <MDBCol md="6">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDBBtn rounded href="/addauthor">
                        Add new author
                    </MDBBtn>
                </div>
                <hr />
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
                        onChange={this.handleNameChange}
                        placeholder="Search author"
                        aria-label="Search"
                    />
                </form>
                {this.state.authors.map((e, i) => {
                    return (
                        <div key={i}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{e.name}</MDBCardTitle>
                                    <hr />
                                    {/* <MDBCardText>{e.author.name}</MDBCardText> */}
                                    <a href={'/authors/' + e._id} className="black-text d-flex justify-content-end">
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
