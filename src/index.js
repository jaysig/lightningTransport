import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import Landing from './components/Landing';
import MapContainer from './components/MapContainer';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={ Landing } >
        <IndexRedirect to="/map" />
        <Route path="map" component={ MapContainer} />
      </Route>
    </Router>
  )
}


ReactDOM.render(<Root />,document.getElementById('app'));

module.hot.accept();
