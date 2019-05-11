import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

const store = createStore(reducers);



const firebase = require('firebase/app');

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "web-hour-teachers.firebaseapp.com",
    databaseURL: "https://web-hour-teachers.firebaseio.com",
    projectId: "web-hour-teachers",
    storageBucket: "web-hour-teachers.appspot.com",
    messagingSenderId: "521694429836"
  };
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>  
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
