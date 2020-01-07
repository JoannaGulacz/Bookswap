import React from 'react';
import NotificationListItem from './NotificationListItem';

const NotificationList = ({ swapList }) => (
    <ul>
        <li>
            {swapList.map(item => (
                <NotificationListItem key={item.id} item={item} />
            ))}
        </li>
    </ul>
);

export default NotificationList;
