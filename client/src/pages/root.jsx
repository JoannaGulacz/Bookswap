import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//menu oraz nawigacja
import UserMenu from '../components/UserMenu';
import Menu from '../components/Menu';

//formularze rejestracji i logowania
import Login from './Login';

//testowe routy
import RouterTest from './routerTest';
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
                <Menu username="User_Name">
                    <UserMenu />
                </Menu>

                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/test" component={RouterTest} />
                    <Route path="/login" component={Login} />
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
