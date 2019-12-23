import React from 'react';
//import DropdowanButton from './DropdownButton';

const Menu = props => {
    return (
        <div>
            <h1>BOOKSWAP</h1>
            <div>{props.children}</div>
        </div>
    );
};

export default Menu;

/* code for Axios task:

import axios from 'axios';

axios.default.baseURL = "http://localhost:5000/api/"
axios.interceptors.request.use( req => {
  const token = localStorage.getItem("token"); // token???
  if (token) req.headers[Authorization] = `Bearer ${token}`;
  return req;
})

export default axios;

*/
