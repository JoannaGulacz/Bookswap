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
import AuthorEdit from '../components/search/AuthorEdit';
import TitleList from '../components/search/TitleList';


export default class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params._id,
            author: {
                born: '',
                died: '',
                rating: '',
                books: []
            },
            infoText: '',
        };
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
        this.authorEdit = React.createRef();
        this.bookList = React.createRef();
    }

    componentDidMount = () => {
        axios
            .get('http://localhost:5000/api/authors/' + this.state._id)
            .then(data => {
                this.setState({
                    author: data.data.data[0],
                    infoText: ''
                });
                if (this.state.author.born) {
                    this.setState({
                        infoText:
                            this.state.infoText +
                            'born: ' + this.state.author.born +
                            '<br />',
                    });
                }
                if (this.state.author.died) {
                    this.setState({
                        infoText:
                            this.state.infoText +
                            'died: ' +this.state.author.died +
                            '<br />',
                    });
                }
                if (this.state.author.rating) {
                    this.setState({
                        infoText: this.state.infoText + 'rating: ' + this.state.author.rating + '<br />',
                    });
                }
                this.setState({
                    name: this.state.author.name,
                });
                if (this.state.author.died) {
                    this.setState({
                        died: this.state.author.died
                    });
                }

                if (this.state.author.born) {
                    this.setState({
                        born: this.state.author.born
                    });
                }

                if (this.state.author.rating) {
                    this.setState({
                        rating: this.state.author.rating,
                    });
                }
                this.bookList.current.propsUpdate()
            })
            .catch(err => {});
    }

    deleteAuthor = () => {
        axios.delete('http://localhost:5000/api/authors/' + this.state.author._id).then(data => {
            if (data.data.success === true) {
                this.infoPopup.current.setState({
                    text:  'Author deleted',
                    linkBack: '/authors',
                    shouldPrevent: () => {}
                })
            } else {
                this.infoPopup.current.setState({
                    text: 'The author is assigned to the book and cannot be deleted',
                    shouldPrevent: e => e.preventDefault(),
                })
            }
        }).catch(err => {});
        this.infoPopup.current.toggle();
    };

    editAuthor = (values) => {
        axios
            .put('http://localhost:5000/api/authors/' + this.state.author._id, {
                    name: values.name,
                    born: values.born,
                    died: values.died,
                    rating: parseFloat(values.rating),
            })
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Author edited',
                    shouldPrevent: () => {},
                })
                this.componentDidMount()
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The author has not been edited',
                    shouldPrevent: e => e.preventDefault(),
                })
            });
        this.infoPopup.current.toggle();
    };

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBCol md="8">
                <MDBCard>
                    <MDBCardImage
                        top
                        src="/author.jpg"
                        overlay="white-slight"
                        hover
                        waves
                        alt="MDBCard image cap"
                    />
                    <MDBCardBody>
                        <MDBCardTitle>{this.state.author.name}</MDBCardTitle>
                        <hr />
                        {<div className="card-text" dangerouslySetInnerHTML={{ __html: this.state.infoText }} />}
                        <MDBCardText></MDBCardText>
                        <TitleList ref={this.bookList} books={this.state.author.books}/>
                        <br />
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={()=>{this.authorEdit.current.propsUpdate();this.authorEdit.current.toggle()}}
                            className="black-text d-flex justify-content-end"
                        >
                            <h5>
                                Edit author
                                <MDBIcon icon="edit" className="ml-2" />
                            </h5>
                        </div>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={()=>this.confirmPopup.current.toggle()}
                            className="black-text d-flex justify-content-end"
                        >
                            <h5>
                                Delete author
                                <MDBIcon icon="trash-alt" className="ml-2" />
                            </h5>
                        </div>
                    </MDBCardBody>
                </MDBCard>

                <ConfirmPopup ref={this.confirmPopup} 
                    text='Are you sure you want to delete this author?' 
                    handleAction={this.deleteAuthor}
                    />

                <InfoPopup ref={this.infoPopup} 
                    buttonText="Close" 
                    linkBack={`/authors/${this.state._id}`}
                    text={this.state.modalText}
                    />

                <AuthorEdit ref={this.authorEdit}
                    name={this.state.name}
                    born={this.state.born}
                    died={this.state.died}
                    rating={this.state.rating}
                    onSubmit={this.editAuthor}
                    linkBack={`/authors/${this.state._id}`}
                />
            </MDBCol>
        </div>
        );
    }
}
