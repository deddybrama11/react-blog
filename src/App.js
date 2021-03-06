import LoginPage from "./pages/LoginPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import { ProtectedRoute } from "./parts/protected.route";
import "./assets/scss/style.scss";

import LandingPage from "./pages/LandingPage.js";
import ArticlesPage from "./pages/ArticlesPage";
import CreateArticle from "./pages/article/Create";
import ProfilePage from "./pages/ProfilePage";
import CategoriesPage from "pages/CategoriesPage";
import EditCategory from "pages/categories/Edit";
import TagsPage from "pages/TagsPage";
import EditTags from "pages/tags/Edit";
import EditArticle from "pages/article/Edit";
import ArticlePage from "pages/ArticlePage";
import AllArticlePage from "pages/AllArticlePage";
import PortfolioPage from "pages/PortfolioPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/article/:slug" element={<ArticlePage />}/>
        <Route exact path="/article" element={<AllArticlePage/>}/>
        <Route exact path="/portfolio/:name" element={<PortfolioPage/>}/>
        <Route exact path="/admin" element={<LoginPage />}/>

        {/* <ProtectedRoute
          exact
          path="/admin/articles"
          component={ArticlesPage}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/articles/create"
          component={CreateArticle}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/articles/:id"
          component={EditArticle}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/admin/profile"
          component={() => <ProfilePage />}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/admin/categories"
          component={() => <CategoriesPage />}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/categories/:id"
          component={() => <EditCategory />}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/admin/tags"
          component={() => <TagsPage />}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/tags/:id"
          component={() => <EditTags />}
        ></ProtectedRoute>

        <Route exact path="*" component={() => "404 NOT FOUND"}></Route> */}
      </Routes>
    </div>
  );
}

export default App;