import React from 'react';
import Header from './Header';

const Landing = (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
    </div>
  );
};

export default Landing;
