import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const FooterPage = () => {
    return (
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="8">
                        <h5 className="title">Bookswap</h5>
                        <p>Now you can easily exchange your old books with other people.</p>
                    </MDBCol>
                    <MDBCol md="4">
                        <h5 className="title">Useful links</h5>
                        <ul>
                            <li className="list-unstyled">
                                <Link to="/users/me">Your Account</Link>
                            </li>
                            <li className="list-unstyled">
                                <Link to="/books">Book Encyclopedia</Link>
                            </li>
                            <li className="list-unstyled">
                                <Link to="/swap">Book ready to exchange</Link>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    <a href="https://github.com/JoannaGulacz/Bookswap/"> Bookswap </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
};

export default FooterPage;
