import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//menu oraz nawigacja
import UserMenu from '../components/UserMenu';
import Menu from '../components/Menu';

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

//import Home from './routerTestHome';
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
                    <Route path="/bookcases" component={NewBook} />
                    <Route path="/reviews" component={Reviews} />
                </Switch>
            </>
        </Router>
    );
};

export default Root;

/* MATERIAŁY:

https://www.youtube.com/watch?v=Law7wfdg_ls bardzo prosty tutorial 30' (dynamic routing => ~19' przykład API linki do itemów w sklepie)

*/
