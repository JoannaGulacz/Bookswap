import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MDBContainer } from 'mdbreact';
import axios from '../utils/axios';

//nawigacja
import Menu from '../components/navigation/Menu';

//użytkownik
import UserMenu from '../components/user_profile/UserMenu';
import UserProfile from './UserProfile';

//formularze rejestracji i logowania
import Login from './Login';

//zbiór ksiązek
import Books from './Books';
import Book from './Book';
import AddBook from './AddBook';

//zbiór autorów
import Authors from './Authors';
import Author from './Author';
import AddAuthor from './AddAuthor';

//zbiór wydawnictw
import Publishers from './Publishers';
import Publisher from './Publisher';

//zbiór kategorii
import Categories from './Categories';
import Category from './Category';

import Swap from './Swap';
import SwapDetails from './SwapDetails';

import Main from './Home/Main';

// zbiór posiadanych książek
import Bookcases from './Bookcases';
import AddBookcase from './AddBookcase';

//zbiór recenzji
import Reviews from './Reviews';
import AddReview from './AddReview';

//Powiadomienia
import Notification from './Notification';

// <Switch> powoduje że renderowany jest tylko jeden komonent (pierwszy który pasuje do ścieżki)

// exact wymusza dokładne porównanie ścieżek (domyślnie jest wyłączone)
// brak exact w testowym home roucie sprawiłby, że route /test odnosiłby się do obu komponentów (zawiera zaróno / jak i /test)

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
                        <Route path="/swap" component={Swap} />
                        <Route path="/login" render={props => <Login {...props} loginHandler={this.loginHandler} />} />
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
                        <Route path="/bookcases" exact component={Bookcases} />
                        <Route path="/addbookcase" component={AddBookcase} />
                        <Route path="/reviews" exact component={Reviews} />
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
            </Router>
        );
    }
}
export default Root;

/* MATERIAŁY:

https://www.youtube.com/watch?v=Law7wfdg_ls bardzo prosty tutorial 30' (dynamic routing => ~19' przykład API linki do itemów w sklepie)

*/
