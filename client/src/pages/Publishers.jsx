import React, { Component } from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import Search from '../components/search/Search';
import UniversalCard from '../components/search/UniversalCard';
import InputTextPopup from '../components/search/InputTextPopup';
import InfoPopup from '../components/search/InfoPopup';
import axios from 'axios';

export default class Publishers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            publishers: [],
            newname: '',
            shouldPrevent: () => { },
        };
        this.infoPopup = React.createRef();
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/api/publishers/').then(data => this.setState({ publishers: data.data.data }));
    }

    handleData = (data) => {
        this.setState({
            publishers: data,
        });
    }

    handleValue = (value) => {
        axios
            .post('http://localhost:5000/api/publishers/', {
                name: value,
            })
            .then(() => {
                this.infoPopup.current.setState({
                    text: 'A new publisher has been added successfully.',
                    shouldPrevent: () => { },
                });

                this.componentDidMount()
            })
            .catch(() => {
                this.infoPopup.current.setState({
                    text: 'Adding publisher failed.',
                    shouldPrevent: e => e.preventDefault(),
                });
            });
        this.infoPopup.current.toggle();
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InputTextPopup buttonText="Add new publisher" text="Add publisher" onSubmit={this.handleValue} />
                    <InfoPopup ref={this.infoPopup} buttonText="Close" linkBack="/publishers"></InfoPopup>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MDBCol md="10">
                        <hr />
                        <Search
                            url='http://localhost:5000/api/publishers/search/'
                            placeholderText="Search publisher"
                            handleData={this.handleData}
                        />
                    </MDBCol>
                </div>
                <MDBRow md="12">
                    {this.state.publishers.map((e) => {
                        return (
                            <MDBCol md="6" lg="4" key={e._id}>
                                <UniversalCard description={e} link={`/publishers/${e._id}`} />
                                <br />
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            </div>
        );
    }
}
