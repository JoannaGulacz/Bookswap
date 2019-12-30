import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//import App from './App';
import Root from './pages/root';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

//menu oraz nawigacja
//import UserMenu from './components/UserMenu';
//import Menu from './components/Menu';

//formularze rejestracji i logowania
//import FormCard from './components/FormCard';
//import LoginForm from './components/LoginForm';
//import RegisterForm from './components/RegisterForm';

/*
ReactDOM.render(
    <FormCard>
        <LoginForm />
        <RegisterForm />
    </FormCard>,
    document.getElementById('root')
);


ReactDOM.render(
    <>
        <Menu username="User_Name">
            <UserMenu />
        </Menu>
        <FormCard>
            <LoginForm />
            <RegisterForm />
        </FormCard>
        <NewBook />
    </>,
    document.getElementById('root')
);
*/

//Router test:
ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
