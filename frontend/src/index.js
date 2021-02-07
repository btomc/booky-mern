import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import GlobalStyle from './globalStyles'
import App from './App';

ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>,
  document.getElementById('root')
);


