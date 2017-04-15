import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import snoowrap from 'snoowrap';
//
// const r = new snoowrap({});
// r.getHot().map(post => post.title).then(console.log);

import CommonParent from "./CommonParent";

const App = () => (
  <Router history={history}>
    <Route path="/" component={CommonParent} />
  </Router>
);

export default App;
