import React, { Component } from 'react';
import BooksToSwap from '../components/BooksToSwap';
import axios from '../utils/axios';
import ListOfSwaps from '../components/ListOfSwaps';
import { MDBRow } from 'mdbreact';

export default class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            filter: '',
        };
    }
    componentDidMount() {
        axios
            .get('books')
            .then(response => {
                let allBooks = response.data.data
                    .filter(el => el.bookcases.length > 0)
                    .map(el => el.bookcases.filter(el => el.change))
                    .filter(el => el.length > 0);
                this.setState({ books: allBooks });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    updateBooks = title => {
        this.setState({ filter: title });
    };

    render() {
        return (
            <div>
                <MDBRow center>
                    <BooksToSwap updateBooks={this.updateBooks} />
                </MDBRow>
                <ListOfSwaps list={this.state.books} filter={this.state.filter} />
            </div>
        );
    }
}
