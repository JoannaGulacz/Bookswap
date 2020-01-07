import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Link } from 'react-router-dom';

const List = ({ list, filter }) => {
    if (
        list.length === 0 ||
        (filter.length > 0 &&
            list.filter(el => el[0].title.toLowerCase().indexOf(filter.toLowerCase()) >= 0).length === 0)
    ) {
        return (
            <MDBRow center>
                <MDBCol md="6" style={{ textAlign: 'center' }}>
                    No results.
                </MDBCol>
            </MDBRow>
        );
    } else {
        return (
            <MDBRow center>
                {list
                    .filter(el => el[0].title.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
                    .map((el, index) => {
                        return (
                            <MDBCol md="6" className="mb-2" key={index}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>{el[0].title}</MDBCardTitle>
                                        <hr />
                                        <MDBCardText>number of copies available to swap: {el.length}</MDBCardText>
                                        <MDBCardText>
                                            <Link to={`/swap/${el[0].parentBook}`}>see details >></Link>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        );
                    })}
            </MDBRow>
        );
    }
};

export default List;
