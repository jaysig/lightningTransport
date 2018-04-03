import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
// import promise from 'redux-promise';
import reducers from './reducers';

import Landing from './components/Landing';
import MapContainer from './components/MapContainer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const Root = () => {
  return (
    <Provider store={ createStoreWithMiddleware(reducers) }>
      <Router history={hashHistory}>
        <Route path="/" component={ Landing } >
          <IndexRedirect to="/map" />
          <Route path="map" component={ MapContainer} />
        </Route>
      </Router>
    </Provider>
  )
}


ReactDOM.render(<Root />,document.getElementById('app'));

module.hot.accept();
