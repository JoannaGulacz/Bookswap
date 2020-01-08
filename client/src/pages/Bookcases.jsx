import React, { Component } from 'react';
import AddBookcaseButton from '../components/bookcases/AddBookcaseButton';
import ListOfBookcases from '../components/bookcases/ListOfBookcases';
import ConfirmPopup from '../components/search/ConfirmPopup';
import InfoPopup from '../components/search/InfoPopup';
import BookcaseEdit from '../components/bookcases/BookcaseEdit';
import { MDBIcon, MDBCol } from 'mdbreact';

import axios from 'axios';

class Bookcases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookcases: [],
            change: false,
            bookcaseId: '',
            userId: '',
        };
        this.confirmPopup = React.createRef();
        this.infoPopup = React.createRef();
        this.bookcaseEdit = React.createRef();
    }

    componentDidMount() {
        this.getLibrary();
    }

    getLibrary = () => {
        axios
            .get('http://localhost:5000/api/bookcases/library')
            .then(data => {
                console.log(data.data.data[0].owner);
                this.setState({ bookcases: data.data.data, userId: data.data.data[0].owner });
            })
            .catch(function(error) {
                console.log(error.response);
            });
    };

    deleteF = id => {
        this.confirmPopup.current.toggle();
        this.setState({
            bookcaseId: id,
        });
    };

    editF = id => {
        this.setState({
            bookcaseId: id,
        });
        axios
            .get('http://localhost:5000/api/bookcases/' + id)
            .then(response => {
                console.log(response);
                this.setState({
                    title: response.data.data.title,
                });
                this.setState({
                    author: response.data.data.parentBook.author.name,
                });
                this.setState({
                    publisher: response.data.data.parentBook.publisher.name,
                });
                this.setState({
                    category: response.data.data.parentBook.category.name,
                });
                this.setState({
                    change: response.data.data.change,
                });
                this.bookcaseEdit.current.propsUpdate();
                this.bookcaseEdit.current.toggle();
            })
            .catch(function(error) {
                console.log(error.response);
            });
    };

    deleteBookcase = () => {
        axios.delete(`/swaps/bookcases/${this.state.bookcaseId}`).catch(error => console.log(error));
        axios
            .delete('http://localhost:5000/api/bookcases/' + this.state.bookcaseId)
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Bookcase deleted',
                    linkBack: '/bookcases',
                    // shouldPrevent: () => {},
                });
                this.getLibrary();
            })
            .catch(err => {});
        this.infoPopup.current.toggle();
    };

    editBookcase = value => {
        axios
            .put('http://localhost:5000/api/bookcases/' + this.state.bookcaseId, {
                title: value.title,
                author: value.author,
                publisher: value.publisher,
                category: value.category,
                change: value.change,
            })
            .then(data => {
                this.infoPopup.current.setState({
                    text: 'Bookcase edited',
                });
                this.getLibrary();
            })
            .catch(err => {
                this.infoPopup.current.setState({
                    text: 'The bookcase has not been edited',
                });
            });
        this.infoPopup.current.toggle();
    };

    onSubmit = event => {
        event.preventDefault();
        axios
            .get('http://localhost:5000/api/bookcases/search/' + this.state.title + '/' + this.state.userId)
            .then(data => this.setState({ bookcases: data.data.data }))
            .catch(response => console.log(response));
    };

    handleTitleChange = event => {
        const value = event.target.value;
        this.setState({
            title: value,
        });
    };

    render() {
        return (
            <div>
                <AddBookcaseButton />
                <hr />
                <div className="d-flex justify-content-center">
                    <MDBCol md="6">
                        <form
                            className="form-inline mt-4 mb-4"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            onSubmit={this.onSubmit}
                        >
                            <button type="submit" value="submit" style={{ all: 'unset' }}>
                                <MDBIcon icon="search" />
                            </button>
                            <input
                                className="form-control form-control-sm ml-3 w-75"
                                type="text"
                                onChange={this.handleTitleChange}
                                placeholder="Search bookcase"
                                aria-label="Search"
                            />
                        </form>
                    </MDBCol>
                </div>
                {ListOfBookcases(this.state.bookcases, this.deleteF, this.editF)}
                <ConfirmPopup
                    ref={this.confirmPopup}
                    text="Are you sure you want to delete this bookcase?"
                    handleAction={this.deleteBookcase}
                />
                <InfoPopup ref={this.infoPopup} buttonText="Close" linkBack={'/bookcases'} />
                <BookcaseEdit
                    ref={this.bookcaseEdit}
                    title={this.state.title}
                    author={this.state.author}
                    publisher={this.state.publisher}
                    category={this.state.category}
                    change={this.state.change}
                    onSubmit={this.editBookcase}
                    linkBack={'/bookcases'}
                />
            </div>
        );
    }
}

export default Bookcases;
