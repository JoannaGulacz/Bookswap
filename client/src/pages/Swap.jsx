import React, { Component } from 'react';
import BooksToSwap from '../components/BooksToSwap';
import axios from '../utils/axios';
import List from '../components/List';
export default class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }

    updateBooks = BookList => {
        this.setState({ books: BookList });
    };

    async componentDidMount() {
        await axios
            .get('bookcases/swaps')
            .then(response => {
                this.setState({ books: response.data.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <BooksToSwap updateBooks={this.updateBooks} />
                <List list={this.state.books} />
            </div>
        );
    }
}
