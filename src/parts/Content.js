import React from "react";
import Article from "elements/Article";
import Button from "elements/Button";

export default function content(props) {
  console.log(props.data.latest_article);
  return (
    <section className="container justify-center">
      <div className="row">
        <div className="col-lg-8">
          <span className="title-md">Latest Article</span>
          <div className="row" style={{ marginTop: "20px" }}>
            {props.data.latest_article.map((article, index) => (
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
            {props.data.interesting_article.map((article) => (
              <Article type="medium" article={article}></Article>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <span className="title-md">Most Popular Article</span>
          <div className="row" style={{ marginTop: "20px" }}>
            {props.data.most_popular_article.map((article) => (
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
  );
}
