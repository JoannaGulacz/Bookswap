import React, { Component } from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import Search from '../components/search/Search';
import UniversalCard from '../components/search/UniversalCard';
import InputTextPopup from '../components/search/InputTextPopup';
import InfoPopup from '../components/search/InfoPopup';

import axios from 'axios';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            categories: [],
            newname: '',
            shouldPrevent: () => { },
        };
        this.infoPopup = React.createRef();
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/categories/').then(data => this.setState({ categories: data.data.data }));
    }

    handleData = (data) => {
        this.setState({
            categories: data,
        });
    }

    handleValue = (value) => {
        axios
            .post('http://localhost:5000/api/categories/', {
                name: value,
            })
            .then(() => {
                this.infoPopup.current.setState({
                    text: 'A new category has been added successfully.',
                    shouldPrevent: () => { }
                })
                this.componentDidMount()
            })
            .catch(() => {
                this.infoPopup.current.setState({
                    text: 'Adding category failed.',
                    shouldPrevent: e => e.preventDefault(),
                })
            });
        this.infoPopup.current.toggle();
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InputTextPopup buttonText="Add new category" text="Add category" onSubmit={this.handleValue} />
                    <InfoPopup ref={this.infoPopup} buttonText="Close" linkBack="/categories"></InfoPopup>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDBCol md="10">
                        <hr />
                        <Search
                            url='http://localhost:5000/api/categories/search/'
                            placeholderText="Search category"
                            handleData={this.handleData}
                        />
                    </MDBCol>
                </div>
                <MDBRow md="12">
                    {this.state.categories.map((e) => {
                        return (
                            <MDBCol md="6" lg="4" key={e._id}>
                                <UniversalCard description={e} link={`/categories/${e._id}`} />
                                <br />
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
