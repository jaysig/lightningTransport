import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';

// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import promise from 'redux-promise';
import reducers from './reducers';

import Map from './components/Map';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const Root = () => {
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <Router>
      <Route path="/" component={ Map }></Route>
    </Router>
  </Provider>
}


ReactDOM.render(<Root />,document.getElementById('app'));

module.hot.accept();
