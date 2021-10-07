import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Article from "elements/Article";
import Button from "elements/Button";
import { data } from "jquery";

export default function Content() {
  const [dataPage, setDataPage] = useState([]);

  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  delete instance.defaults.headers.common.Authorization

  const getArticle = () => {
    instance
      .get("/v1/posts?page=1&page_size=2&sort=newest")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { name: "latest", value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });

    instance
      .get("/v1/posts?page=1&page_size=3&sort=random")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { name: "interesting", value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });

    instance
      .get("/v1/posts?page=1&page_size=4&sort=popular")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { name: "popular", value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getItem = (item) => {
    for (var i = 0; i < dataPage.length; i++) {
      if (dataPage[i].name === item) {
        return dataPage[i];
      }
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  useEffect(() => {
    console.log(dataPage[0]);
  }, [dataPage]);

  return dataPage.length === 3 ? (
    <section className="container justify-center">
      <div className="row">
        <div className="col-lg-8">
          <span className="title-md">Latest Article</span>
          <div className="row" style={{ marginTop: "20px" }}>
            {getItem("latest").value.map((article, index) => (
              <Article
                key={`latest-article-` + index}
                type="big"
                article={article}
              ></Article>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <span className="title-md">Interesting Article</span>
          <div style={{ marginTop: "20px" }}>
            {getItem("interesting").value.map((article, index) => (
              <Article
                key={`interesting-article-` + index}
                type="medium"
                article={article}
              ></Article>
            ))}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <span className="title-md">Most Popular Article</span>
          <div className="row" style={{ marginTop: "20px" }}>
            {getItem("popular").value.map((article, index) => (
              <Article
                key={`popular-article-` + index}
                type="small"
                article={article}
              ></Article>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          style={{
            fontSize: "20px",
            marginTop: "80px",
            color: "#0984E3",
            fontWeight: "600",
          }}
          type="link"
          href="/article"
        >
          More articles ...
        </Button>
      </div>
    </section>
  ) : (
    <span>Loading ...</span>
  );
}
