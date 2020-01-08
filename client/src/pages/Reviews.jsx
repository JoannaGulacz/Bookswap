import React, { Component } from 'react';
import ListOfReviews from '../components/reviews/ListOfReviews';
import ConfirmPopup from '../components/search/ConfirmPopup';
import InfoPopup from '../components/search/InfoPopup';
import ReviewEdit from '../components/reviews/ReviewEdit';

import axios from 'axios';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            author: '',
            title: '',
            content: '',
            rating: 0,
            reviewId: '',
        };
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
        this.reviewEdit = React.createRef();
    }

    componentDidMount() {
        this.getReviews();
    }

    getReviews = () => {
        axios
            .get('reviews/myReviews')
            .then(data => this.setState({ reviews: data.data.data }))
            .catch(function(error) {
                console.log(error.response.data);
            });
    };

    deleteF = id => {
        this.confirmPopup.current.toggle();
        this.setState({
            reviewId: id,
        });
    };

    editF = id => {
        this.setState({
            reviewId: id,
        });
        axios
            .get('http://localhost:5000/api/reviews/' + id)
            .then(response => {
                this.setState({
                    title: response.data.data.book.title,
                });
                this.setState({
                    author: response.data.data.book.author.name,
                });
                this.setState({
                    content: response.data.data.content,
                });
                this.setState({
                    rating: response.data.data.rating,
                });
                this.reviewEdit.current.propsUpdate();
                this.reviewEdit.current.toggle();
            })
            .catch(function(error) {
                console.log(error.response);
            });
    };

    deleteReview = () => {
        axios
            .delete('http://localhost:5000/api/reviews/' + this.state.reviewId)
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Review deleted',
                    linkBack: '/reviews',
                    shouldPrevent: () => {},
                });
                this.getReviews();
            })
            .catch(err => {});
        this.infoPopup.current.toggle();
    };

    editReview = value => {
        axios
            .put('http://localhost:5000/api/reviews/' + this.state.reviewId, {
                title: value.title,
                content: value.content,
                rating: value.rating,
            })
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Review edited',
                });
                this.getReviews();
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The review has not been edited',
                });
            });
        this.infoPopup.current.toggle();
    };

    render() {
        return (
            <div>
                {ListOfReviews(this.state.reviews, this.deleteF, this.editF)}
                <ConfirmPopup
                    ref={this.confirmPopup}
                    text="Are you sure you want to delete this review?"
                    handleAction={this.deleteReview}
                />
                <InfoPopup ref={this.infoPopup} buttonText="Close" linkBack={'/reviews'} />
                <ReviewEdit
                    ref={this.reviewEdit}
                    title={this.state.title}
                    author={this.state.author}
                    content={this.state.content}
                    rating={this.state.rating}
                    onSubmit={this.editReview}
                    linkBack={'/reviews'}
                />
            </div>
        );
    }
}

export default Reviews;
