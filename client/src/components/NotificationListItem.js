import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';

// Zmockowane, do pobrania z serwera jeśli pyanie ma być o wymiane książki za książkę to podejrzewam, że będzie to obiekt tego typu.
//Wymiana książki za książkę, czyli mamy 2

const swapList = () => [
    { id: 1, userName: 'aaa', book1Title: 'x', book2Title: 'y' },
    { id: 2, userName: 'bbb', book1Title: 'y', book2Title: 'z' },
];

const NotificationListItem = () => {
    swapList.map(item => (
        <MDBCard>
            <MDBCardBody>
                <MDBCardTitle>{item.userName} wants to swap book!</MDBCardTitle>
                <MDBCardText>
                    Do you want to exechange {item.book1Title} for {item.book2Title}?
                </MDBCardText>
                <MDBBtn>Yes</MDBBtn>
                <MDBBtn>No</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    ));
};

export default NotificationListItem;
