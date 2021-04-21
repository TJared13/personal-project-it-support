import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import App from './App';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


