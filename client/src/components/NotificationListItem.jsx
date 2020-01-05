import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';

// TODO Pobieranie z serwera, po zrobieniu endpointu.

const NotificationListItem = () => {
    // TODO Pobieranie z serwera, po zrobieniu endpointu.

    swapList.map(item => (
        <MDBCard>
            <MDBCardBody>
                <MDBCardTitle>{item.user} wants to swap book!</MDBCardTitle>
                <MDBCardText>
                    Do you want to exechange {item.bookToOffer} for {item.bookToGet}?
                </MDBCardText>
                <MDBBtn>Yes</MDBBtn>
                <MDBBtn>No</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    ));
};

export default NotificationListItem;
