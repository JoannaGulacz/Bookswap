import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBadge} from 'mdbreact';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        };
    }

    componentDidMount = () => {
        this.propsUpdate()
    }
    
    propsUpdate = () => {
        if (this.props.reviews) {
            this.setState({
                reviews: this.props.reviews
            })
        }
    }

    render() {
        if (this.state.reviews[0] === undefined) {
            return '';
        } else {
            return (
                    <MDBListGroup md="6">
                        {this.state.reviews.map((e, i) => {
                            return (
                                <div key={i}>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ fontSize: 12 }}
                                    >
                                        {e.owner.name}
                                        <br />
                                        {e.content}
                                        <MDBBadge color="primary" pill>
                                            {e.rating}
                                        </MDBBadge>
                                    </MDBListGroupItem>
                                </div>
                            );
                        })}
                    </MDBListGroup>
            );
        }
    }
}