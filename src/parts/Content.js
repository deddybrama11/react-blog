import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Article from "elements/Article";
import Button from "elements/Button";

export default function Content() {
  const [dataPage, setDataPage] = useState([]);

  const getArticle = () => {
    axios
      .get("/v1/posts?page=1&page_size=2&sort=newest")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axios
      .get("/v1/posts?page=1&page_size=3&sort=random")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axios
      .get("/v1/posts?page=1&page_size=4&sort=popular")
      .then((response) => {
        setDataPage((category) => [
          ...category,
          { value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
            {dataPage[0].value.map((article, index) => (
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
          <div className="row" style={{ marginTop: "20px" }}>
            {dataPage[1].value.map((article) => (
              <Article type="medium" article={article}></Article>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <span className="title-md">Most Popular Article</span>
          <div className="row" style={{ marginTop: "20px" }}>
            {dataPage[2].value.map((article) => (
              <Article type="small" article={article}></Article>
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
