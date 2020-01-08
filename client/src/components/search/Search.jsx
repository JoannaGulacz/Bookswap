import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';
import axios from 'axios';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            url: 'http://localhost:5000/api/books/search/',
            placeholderText: "Search"
        };
        if (this.props.url) {
            this.state.url = this.props.url
        }
        if (this.props.placeholderText) {
            this.state.placeholderText = this.props.placeholderText
        }
        if (this.props.handleData) {
            this.handleData = this.props.handleData
        }
    }

    handleData = data => {
    }

    onSubmit = event => {
        event.preventDefault();
        axios
            .get(this.state.url + this.state.searchValue)
            .then(data => this.handleData(data.data.data))
    };

    handleSearchValue = event => {
        const value = event.target.value;
        this.setState({
            searchValue: value,
        });
    };

    render() {
        return (
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
                    onChange={this.handleSearchValue}
                    placeholder={this.state.placeholderText}
                    aria-label="Search"
                />
            </form>
        );
    }
}