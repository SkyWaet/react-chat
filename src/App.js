import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/JoinPage/JoinPage';

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/join" component={Join} />
      <Route path="/chat" component={Chat} />
      <Redirect to="/join" />
    </Router>
  );
}
export default App;