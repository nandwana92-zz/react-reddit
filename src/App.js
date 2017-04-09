import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CommonParent from "./CommonParent";

const App = () => (
  <Router history={history}>
    <Route path="/" component={CommonParent} />
  </Router>
);

export default App;
