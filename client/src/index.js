import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import Root from './pages/root';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Root />, document.getElementById('root'));

// TESTING Menu component [Adam] - don't remove these comments:
//import DropdownButton from './components/DropdownButton';
//import Menu from './components/Menu';
//ReactDOM.render(<DropdownButton />, document.getElementById('root'));
//ReactDOM.render(<Menu><DropdownButton /></Menu>, document.getElementById('root'));

serviceWorker.unregister();
