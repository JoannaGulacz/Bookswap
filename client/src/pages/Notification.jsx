import React from 'react';
import NotificationReceived from '../components/swaps/NotificationReceived';
import NotificationSent from '../components/swaps/NotificationSent';

const Notification = () => {
    return (
        <div>
            <NotificationReceived />
            <NotificationSent />
        </div>
    );
};
export default Notification;
