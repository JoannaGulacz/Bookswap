import React from 'react';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
//import DropdowanButton from './DropdownButton';

const Menu = props => {
    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="10">
                        <h1 className="my-2 text-center">BOOKSWAP</h1>
                    </MDBCol>
                    <MDBCol md="2">
                        <div className="my-2">{props.children}</div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
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
