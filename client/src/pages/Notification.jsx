import React from 'react';
import NotificationReceived from '../components/NotificationReceived';
import NotificationSent from '../components/NotificationSent';

const Notification = () => {
    return (
        <div>
            <NotificationReceived />
            <NotificationSent />
        </div>
    );
};
export default Notification;
