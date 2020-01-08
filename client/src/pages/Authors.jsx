import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBRow } from 'mdbreact';
import Search from '../components/search/Search';
import UniversalCard from '../components/search/UniversalCard';

import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            authors: [],
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/authors/').then(data => this.setState({ authors: data.data.data }));
    }

    handleData = (data) => {
        this.setState({
            authors: data,
        });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/addauthor`}>
                        <MDBBtn color="primary" rounded>
                            Add new author
                    </MDBBtn>
                    </Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDBCol md="10">
                        <hr />
                        <Search
                            url='http://localhost:5000/api/authors/search/'
                            placeholderText="Search author"
                            handleData={this.handleData}
                        />
                    </MDBCol>
                </div>
                <MDBRow md="12">
                    {this.state.authors.map((e) => {
                        return (
                            <MDBCol md="6" lg="4" key={e._id}>
                                <UniversalCard description={e} link={`/authors/${e._id}`} />
                                <br />
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
