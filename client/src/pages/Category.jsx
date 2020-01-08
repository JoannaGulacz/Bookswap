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
import ConfirmPopup from '../components/search/ConfirmPopup';
import InfoPopup from '../components/search/InfoPopup';
import BookList from '../components/search/BookList';
import InputTextPopup from '../components/search/InputTextPopup';

export default class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params._id,
            category: undefined,
            infoText: '',
            name: '',
        };
        this.bookList = React.createRef();
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
        this.inputTextPopup = React.createRef();
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/categories/' + this.state._id).then(data => {
            this.setState({
                category: data.data.data,
            });
            this.setState({
                name: this.state.category.name,
            });
            this.bookList.current.propsUpdate()
        });
    }

    deleteCategory = () => {
        axios
            .delete('http://localhost:5000/api/categories/' + this.state.category._id)
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Category deleted',
                    linkBack: '/categories',
                    shouldPrevent: () => {},
                });
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The category is assigned to the book and cannot be deleted',
                    shouldPrevent: e => e.preventDefault(),
                });
            });
        this.infoPopup.current.toggle();
    };

    editCategory = (value) => {
        axios
            .put('http://localhost:5000/api/categories/' + this.state.category._id, {
                name: value,
            })
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Category edited',
                    shouldPrevent: () => {},
                })
                this.componentDidMount()
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The category has not been edited',
                    shouldPrevent: e => e.preventDefault(),
                })
            });
        this.infoPopup.current.toggle()
    };

    render() {
        if (this.state.category === undefined || this.state.category === []) {
            return '';
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MDBCol md="8">
                    <MDBCard>
                        <MDBCardImage
                            top
                            src="/category.jpg"
                            overlay="white-slight"
                            hover
                            waves
                            alt="MDBCard image cap"
                        />
                        <MDBCardBody>
                            <MDBCardTitle>{this.state.category.name}</MDBCardTitle>
                            <hr />
                            {<div className="card-text" dangerouslySetInnerHTML={{ __html: this.state.infoText }} />}
                            <MDBCardText></MDBCardText>
                            <BookList ref={this.bookList} books={this.state.category.books}/>
                            <br />
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={()=>{this.inputTextPopup.current.propsUpdate();this.inputTextPopup.current.toggle()}}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Edit category
                                    <MDBIcon icon="edit" className="ml-2" />
                                </h5>
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={()=>this.confirmPopup.current.toggle()}
                                className="black-text d-flex justify-content-end"
                            >
                                <h5>
                                    Delete category
                                    <MDBIcon icon="trash-alt" className="ml-2" />
                                </h5>
                            </div>
                        </MDBCardBody>
                    </MDBCard>


                    <ConfirmPopup ref={this.confirmPopup} 
                        text='Are you sure you want to delete this category?' 
                        handleAction={this.deleteCategory}
                        />

                    <InfoPopup ref={this.infoPopup} 
                        buttonText="Close"
                        linkBack={`/categories/${this.state._id}`}
                        text={this.state.modalText}
                        />

                    <InputTextPopup ref={this.inputTextPopup} 
                        text="Edit category" 
                        value={this.state.name}
                        onSubmit={this.editCategory} 
                        buttonDisplay='none'/>
                </MDBCol>
        </div>
            );
        }
    }
}
