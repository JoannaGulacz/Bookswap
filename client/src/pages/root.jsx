import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

//zbiór wydawnictw
import Publishers from './Publishers';
import Publisher from './Publisher';

//zbiór kategorii
import Categories from './Categories';
import Category from './Category';

import Swap from './Swap';

import Main from './Home/Main';

// your Bookcases
import NewBook from './NewBook';
import Reviews from './Reviews';

// <Switch> powoduje że renderowany jest tylko jeden komonent (pierwszy który pasuje do ścieżki)

// exact wymusza dokładne porównanie ścieżek (domyślnie jest wyłączone)
// brak exact w testowym home roucie sprawiłby, że route /test odnosiłby się do obu komponentów (zawiera zaróno / jak i /test)

const Root = () => {
    return (
        <Router>
            <>
                <Menu>
                    <UserMenu />
                </Menu>

                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/swap" component={Swap} />
                    <Route path="/login" component={Login} />
                    <Route path="/books" component={Books} />
                    <Route path="/book/:_id" component={Book} />
                    <Route path="/authors" component={Authors} />
                    <Route path="/author/:_id" component={Author} />
                    <Route path="/publishers" component={Publishers} />
                    <Route path="/publisher/:_id" component={Publisher} />
                    <Route path="/categories" component={Categories} />
                    <Route path="/category/:_id" component={Category} />
                    <Route path="/addbook/" component={AddBook} />
                    <Route path="/bookcases" component={NewBook} />
                    <Route path="/reviews" component={Reviews} />
                    <Route path="/users/me" component={UserProfile} />
                </Switch>
            </>
        </Router>
    );
};

export default Root;

/* MATERIAŁY:

https://www.youtube.com/watch?v=Law7wfdg_ls bardzo prosty tutorial 30' (dynamic routing => ~19' przykład API linki do itemów w sklepie)

*/
