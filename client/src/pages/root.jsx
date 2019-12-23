import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import RouterTest from './routerTest';
import Home from './routerTestHome';

// exact wymusza dokładne porównanie ścieżek (domyślnie jest wyłączone)
// brak exact w testowym home roucie sprawiłby, że route /test odnosiłby się do obu komponentów (zawiera zaróno / jak i /test)
const Root = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/test">Test</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/test" component={RouterTest} />
                </Switch>
            </div>
        </Router>
    );
};

export default Root;
