import LoginPage from './pages/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./assets/scss/style.scss"

import LandingPage from "./pages/LandingPage.js";
import Articles from './pages/ArticlesPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Articles}></Route>
      </Router>
    </div>
  );
}

export default App;
