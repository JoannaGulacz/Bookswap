import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';

export default class AuthorEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: '',
            author: '',
            content: '',
            rating: 0,
            linkBack: '',
            yes: 'Save',
            no: 'Cancel',
            shouldPrevent: e => e.preventDefault(),
        };

        if (this.props.text) {
            this.state.text = this.props.text;
        }
        if (this.props.yes) {
            this.state.yes = this.props.yes;
        }
        if (this.props.no) {
            this.state.no = this.props.no;
        }
        if (this.props.onSubmit) {
            this.onSubmitParent = this.props.onSubmit;
        }
        if (this.props.linkBack) {
            this.state.linkBack = this.props.linkBack;
            this.state.shouldPrevent = () => {};
        }
    }

    componentDidMount = () => {
        this.propsUpdate();
    };

    propsUpdate = () => {
        if (this.props.title) {
            this.setState({
                title: this.props.title,
            });
        }
        if (this.props.author) {
            this.setState({
                author: this.props.author,
            });
        }
        if (this.props.content) {
            this.setState({
                content: this.props.content,
            });
        }
        if (this.props.rating) {
            this.setState({
                rating: this.props.rating,
            });
        }
    };

    toggle = () => {
        this.propsUpdate();
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onSubmit = value => {
        this.toggle();
        if (this.onSubmitParent) {
            this.onSubmitParent(value);
        }
    };

    handleContentChange = event => {
        const value = event.target.value;
        this.setState({
            content: value,
        });
    };

    handleRatingChange = event => {
        const value = event.target.value;
        this.setState({
            rating: value,
        });
    };

    finalizeEdit = () => {
        this.onSubmit(this.state);
    };

    render() {
        return (
            <MDBModal isOpen={this.state.isOpen} toggle={this.toggle} centered>
                <MDBModalBody>
                    <form>
                        <p className="h4 text-center mb-4">Edit review</p>
                        <label className="grey-text">Title</label>
                        <input type="text" value={this.state.title} className="form-control" disabled />
                        <br />
                        <label className="grey-text">Author</label>
                        <input type="text" value={this.state.author} className="form-control" disabled />
                        <br />
                        <label className="grey-text">Content</label>
                        <textarea
                            rows="10"
                            cols="30"
                            value={this.state.content}
                            className="form-control"
                            onChange={this.handleContentChange}
                        />
                        <br />
                        <div>
                            <label className="grey-text">Rating</label>
                            <select
                                label="Rating"
                                className="browser-default custom-select"
                                onChange={this.handleRatingChange}
                            >
                                <option>Choose your grade</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <br />
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={this.toggle}>
                        {this.state.no}
                    </MDBBtn>
                    <MDBBtn type="submit" color="success" onClick={this.finalizeEdit}>
                        {this.state.yes}
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}
