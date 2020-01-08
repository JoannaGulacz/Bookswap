import React, { Component } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText
} from 'mdbreact';
import axios from 'axios';
import ReviewList from '../components/search/ReviewList';
import ConfirmPopup from '../components/search/ConfirmPopup';
import InfoPopup from '../components/search/InfoPopup';
import { Link } from 'react-router-dom';


export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params._id,
            book: undefined,
        };
        this.reviewList = React.createRef();
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
    }
    
    componentDidMount = () => {
        axios
            .get('http://localhost:5000/api/books/' + this.state._id)
            .then(data => {
                this.setState({ book: data.data.data })
                this.reviewList.current.propsUpdate()
            });
    }

    deleteBook = () => {
        axios.delete('http://localhost:5000/api/books/' + this.state.book._id).then(data => {
            if (data.data.success === true) {
                this.infoPopup.current.setState({
                    text: 'Book deleted',
                    linkBack: '/books',
                    shouldPrevent: () => {},
                });
            } else {
                this.infoPopup.current.setState({
                    text: 'The book is assigned to the user and cannot be deleted',
                    shouldPrevent: e => e.preventDefault(),
                });
            }
        });
        this.infoPopup.current.toggle()
    };

    render() {
        if (this.state.book === undefined || this.state.book === []) {
            return '';
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardImage top src="/book.jpg" overlay="white-slight" hover waves alt="MDBCard image cap" />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.book.title}</MDBCardTitle>
                            <hr />
                            <MDBCardText>
                                author:{' '}
                                <Link to={`/authors/${this.state.book.author._id}`}>{this.state.book.author.name}</Link>{' '}
                                <br />
                                publisher:{' '}
                                <Link to={`/publishers/${this.state.book.publisher._id}`}>
                                    {this.state.book.publisher.name}
                                </Link>{' '}
                                <br />
                                category:{' '}
                                <Link to={`/categories/${this.state.book.category._id}`}>
                                    {this.state.book.category.name}
                                </Link>{' '}
                                <br />
                                rating: {this.state.book._rating}
                            </MDBCardText>
                            <Link to={`/addreview/${this.state._id}`}>
                                <div style={{ cursor: 'pointer' }} className="black-text d-flex justify-content-end">
                                    <h5>
                                        Write new review
                                        <MDBIcon icon="pen-fancy" className="ml-2" />
                                    </h5>
                                </div>
                            </Link>
                            <ReviewList ref={this.reviewList} reviews={this.state.book.reviews}/>
                            <br />
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={()=>this.confirmPopup.current.toggle()}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete book
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <ConfirmPopup ref={this.confirmPopup} 
                        text='Are you sure you want to delete this book?' 
                        handleAction={this.deleteBook}
                        />

                    <InfoPopup ref={this.infoPopup} 
                        buttonText="Close" 
                        linkBack={this.state.modalHref}
                        text={this.state.modalText}
                        />
                </MDBCol>
        </div>
            );
        }
    }
}
