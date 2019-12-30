import React from 'react';
import NotificationListItem from './NotificationListItem';
import { MDBContainer } from 'mdbreact';

const NotificationList = ({ swapList }) => (
    <MDBContainer>
        {swapList.map(item => (
            <NotificationListItem key={item.id} item={item} />
        ))}
    </MDBContainer>
);

export default NotificationList;
