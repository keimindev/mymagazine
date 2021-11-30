import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import {Provider} from 'react-redux'
import store from './redux/configStore'
import firebase from './firebase'
console.log(firebase)


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

