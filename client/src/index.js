import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Root from './pages/root';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
