import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from 'App';
import { init } from 'config/axios';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'modules';
import thunk from 'redux-thunk';

// Default Setting
init();

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
