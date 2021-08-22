import LoginPage from './pages/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./assets/scss/style.scss"

import LandingPage from "./pages/LandingPage.js";
import ArticlesPage from './pages/ArticlesPage';
import CreateArticle from './pages/article/Create';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/admin" component={LoginPage}></Route>
        <Route exact path="/admin/articles" component={ArticlesPage}></Route>
        <Route exact path="/admin/articles/create" component={CreateArticle}></Route>
      </Router>
    </div>
  );
}

export default App;
