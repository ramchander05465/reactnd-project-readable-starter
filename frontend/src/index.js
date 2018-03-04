import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
//import promise from 'redux-promise';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import App from './containers/App';
import reducers from './stores';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
     <App /> 
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();