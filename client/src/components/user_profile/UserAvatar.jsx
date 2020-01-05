import React from 'react';
import faker from 'faker';

const style = { minHeight: '100%' };

const UserAvatar = () => {
    const imgUrl = faker.image.avatar();
    return <img src={imgUrl} className="rounded mx-auto d-block" alt="Your Avatar" style={style}></img>;
};

export default UserAvatar;
