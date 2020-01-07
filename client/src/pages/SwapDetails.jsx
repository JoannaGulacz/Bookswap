import React, { Component } from 'react';
import BookToSwap from '../components/BookToSwap';
import axios from '../utils/axios';

export default class SwapDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookcases: '',
            yourBooks: '',
            user: '',
        };
        axios
            .get('/books/' + props.match.params.id)
            .then(response => {
                this.setState({
                    book: response.data.data,
                    bookcases: response.data.data.bookcases,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
        axios
            .get('/users/me')
            .then(response => {
                this.setState({
                    yourBooks: response.data.data.bookcases.filter(e => e.change === true),
                    user: response.data.data,
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <BookToSwap
                book={this.state.book}
                bookcases={this.state.bookcases}
                booksToOffer={this.state.yourBooks}
                user={this.state.user}
            />
        );
    }
}
