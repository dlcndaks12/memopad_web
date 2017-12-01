import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from 'App';
import { axiosInit } from 'config/axios';

// Redux
import { Provider } from 'react-redux';
import store from 'store';

// Default Setting
axiosInit();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
