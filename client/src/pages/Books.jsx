import React, { Component } from 'react';
import { MDBCol, MDBBtn } from 'mdbreact';
import Search from '../components/search/Search';
import BookCard from '../components/search/BookCard';

import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            books: [],
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/books/').then(data => this.setState({ books: data.data.data }));
    }
    
    handleData = (data) => {
        this.setState({ 
            books: data 
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBCol md="6">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/addbook">
                    <MDBBtn color="primary" rounded>
                        Add new book
                    </MDBBtn>
                    </Link>
                </div>
                <hr />
                <Search 
                    url='http://localhost:5000/api/books/search/' 
                    placeholderText="Search book"
                    handleData={this.handleData}
                />
                {this.state.books.map((e, i) => {
                    return (
                        <div key={i}>
                            <BookCard description={e} link={`/books/${e._id}`}/>
                            <br />
                        </div>
                    );
                })}
            </MDBCol>
        </div>
        );
    }
}
