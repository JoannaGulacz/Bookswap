import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import axios from '../utils/axios';

import Menu from '../components/navigation/Menu';
import FooterPage from '../components/navigation/FooterPage';
import UserMenu from '../components/user_profile/UserMenu';
import UserProfile from './UserProfile';
import Login from './Login';
import Main from './Home/Main';
import Books from './Books';
import Book from './Book';
import AddBook from './AddBook';
import Authors from './Authors';
import Author from './Author';
import AddAuthor from './AddAuthor';
import Publishers from './Publishers';
import Publisher from './Publisher';
import Categories from './Categories';
import Category from './Category';
import Swap from './Swap';
import SwapDetails from './SwapDetails';
import Bookcases from './Bookcases';
import AddBookcase from './AddBookcase';
import Reviews from './Reviews';
import AddReview from './AddReview';
import Notification from './Notification';

class Root extends React.Component {
    state = {
        isLogged: false,
        userName: '',
        role: '',
        email: '',
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.getUser();
            this.setState({ isLogged: true });
        }
    }

    getUser = async () => {
        const user = await axios.get('/users/me');
        this.setState({ userName: user.data.data.name, role: user.data.data.role, email: user.data.data.email });
    };

    loginHandler = token => {
        this.getUser();
        localStorage.setItem('token', token);
        this.setState({ isLogged: true });
    };

    logoutHandler = () => {
        localStorage.removeItem('token');
        this.setState({ isLogged: false });
    };

    render() {
        return (
            <Router>
                <MDBContainer>
                    <Menu>
                        <UserMenu
                            isLogged={this.state.isLogged}
                            userName={this.state.userName}
                            logoutHandler={this.logoutHandler}
                        />
                    </Menu>

                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/swap" exact component={Swap} />
                        <Route path="/swap/:id" component={SwapDetails} />
                        <Route path="/notifications">
                            {this.state.isLogged ? <Notification /> : <Redirect to="/login" />}
                        </Route>
                        <Route
                            path="/login"
                            render={props =>
                                !this.state.isLogged ? (
                                    <Login {...props} loginHandler={this.loginHandler} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route path="/books" exact component={Books} />
                        <Route path="/books/:_id" component={Book} />
                        <Route path="/authors" exact component={Authors} />
                        <Route path="/authors/:_id" component={Author} />
                        <Route path="/addauthor/" component={AddAuthor} />
                        <Route path="/publishers" exact component={Publishers} />
                        <Route path="/publishers/:_id" component={Publisher} />
                        <Route path="/categories" exact component={Categories} />
                        <Route path="/categories/:_id" component={Category} />
                        <Route path="/addbook/" component={AddBook} />
                        <Route path="/bookcases" exact>
                            {this.state.isLogged ? <Bookcases /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/addbookcase">
                            {this.state.isLogged ? <AddBookcase /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/reviews" exact>
                            {this.state.isLogged ? <Reviews /> : <Redirect to="/login" />}
                        </Route>
                        <Route path="/addreview/:_id" component={AddReview} />
                        <Route path="/users/me">
                            {this.state.isLogged ? (
                                <UserProfile
                                    userName={this.state.userName}
                                    role={this.state.role}
                                    email={this.state.email}
                                />
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                    </Switch>
                </MDBContainer>
                <FooterPage />
            </Router>
        );
    }
}
export default Root;
