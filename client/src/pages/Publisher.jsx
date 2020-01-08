import React, { Component } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
} from 'mdbreact';
import axios from 'axios';
import ConfirmPopup from '../components/search/ConfirmPopup';
import InfoPopup from '../components/search/InfoPopup';
import BookList from '../components/search/BookList';
import InputTextPopup from '../components/search/InputTextPopup';

export default class Publisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params._id,
            publisher: undefined,
            infoText: '',
            name: '',
        };
        this.bookList = React.createRef();
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
        this.inputTextPopup = React.createRef();
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/publishers/' + this.state._id).then(data => {
            this.setState({
                publisher: data.data.data,
            });
            this.setState({
                name: this.state.publisher.name,
            });
            this.bookList.current.propsUpdate()
        });
    }

    deletePublisher = () => {
        axios
            .delete('http://localhost:5000/api/publishers/' + this.state.publisher._id)
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Publisher deleted',
                    linkBack: '/publishers',
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The publisher is assigned to the book and cannot be deleted',
                    shouldPrevent: e => e.preventDefault(),
                });
            });
            this.infoPopup.current.toggle();
    };

    editPublisher = (value) => {
        axios
            .put('http://localhost:5000/api/publishers/' + this.state.publisher._id, {
                name: value,
            })
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Publisher edited',
                    shouldPrevent: () => {},
                })
                this.componentDidMount()
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The publisher has not been edited',
                    shouldPrevent: e => e.preventDefault(),
                })
            });
        this.infoPopup.current.toggle()
    };

    render() {
        if (this.state.publisher === undefined || this.state.publisher === []) {
            return '';
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardImage
                            top
                            src="/publisher.jpg"
                            overlay="white-slight"
                            hover
                            waves
                            alt="MDBCard image cap"
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.publisher.name}</MDBCardTitle>
                            <hr />
                            {<div className="card-text" dangerouslySetInnerHTML={{ __html: this.state.infoText }} />}
                            <MDBCardText></MDBCardText>
                            <BookList ref={this.bookList} books={this.state.publisher.books}/>
                            <br />
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={()=>{this.inputTextPopup.current.propsUpdate();this.inputTextPopup.current.toggle()}}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Edit publisher
                                    <MDBIcon icon="edit" className="ml-2" />
                                </h5>
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={()=>this.confirmPopup.current.toggle()}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete publisher
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <ConfirmPopup ref={this.confirmPopup} 
                        text='Are you sure you want to delete this publisher?' 
                        handleAction={this.deletePublisher}
                        />

                    <InfoPopup ref={this.infoPopup} 
                        buttonText="Close"
                        linkBack={`/publishers/${this.state._id}`}
                        />

                    <InputTextPopup ref={this.inputTextPopup} 
                        text="Edit category" 
                        value={this.state.name}
                        onSubmit={this.editPublisher} 
                        buttonDisplay='none'/>
                </MDBCol>
        </div>
            );
        }
    }
}
