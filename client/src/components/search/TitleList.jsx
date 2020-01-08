import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }
    
    componentDidMount = () => {
        this.propsUpdate()
    }
    
    propsUpdate = () => {
        if (this.props.books) {
            this.setState({
                books: this.props.books
            })
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBListGroup md="6">
                    {this.state.books.map((e, i) => {
                        return (
                            <div key={i}>
                                <MDBListGroupItem
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ fontSize: 12 }}
                                >
                                    <Link to={`/books/${e._id}`}>
                                        Title: {e.title} <br />
                                        Publisher: {e.publisher.name}
                                    </Link>
                                    <br />
                                </MDBListGroupItem>
                            </div>
                        );
                    })}
                </MDBListGroup>
            </MDBContainer>
        );
    }
}