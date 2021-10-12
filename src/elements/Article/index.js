import React from "react";
import propTypes from "prop-types";
import Button from "elements/Button";
import { format } from "date-fns";

export default function Article(props) {
  if (props.type === "big") {
    return (
      <div className="col" style={{ marginBottom: "15px" }}>
        <div className="card card-article">
          <img
            className="card-img-top"
            src={props.article.cover}
            alt="card-cover-top"
            style={{ height: "240px" }}
          />
          <div className="card-body">
            <h5
              className="card-title title-article-bg"
              style={{ marginBottom: "1px" }}
            >
              {props.article.title}
            </h5>
            <p
              className="card-text description-article"
              style={{ fontWeight: "500", fontSize: "12px" }}
            >
              By <span>{props.article.author_name}</span> ―{" "}
              {format(new Date(props.article.created_at), "MMMM dd, yyyy")}
            </p>
            <p className="card-text description-article">
              {props.article.description}
            </p>

            <Button
              isPrimary
              hasShadow
              type="link"
              className="btn stretched-link d-block text-white"
              href={`/article/${props.article.slug}`}
              // onClick={showArticle}
              // style={{ marginTop: "50px" }}
            >
              Read Article
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (props.type === "medium") {
    return (
      <div
        style={{
          paddingLeft: "15px",
          paddingRight: "15px",
          marginBottom: "12px",
        }}
      >
        <a href={`/article/${props.article.slug}`} className="title-article-md">
          {props.article.title}
        </a>
        <p
          className="card-text description-article"
          style={{ fontWeight: "500", fontSize: "11px" }}
        >
          By <span>{props.article.author_name}</span> ―{" "}
          {format(new Date(props.article.created_at), "MMMM dd, yyyy")}
        </p>
        <p className="description-article">{props.article.description}</p>
        <Button
          type="link"
          // className="btn stretched-link d-block text-white"
          href={`/article/${props.article.slug}`}
          // onClick={showArticle}
        >
          Read Article
        </Button>
      </div>
    );
  } else if (props.type === "small") {
    return (
      <div className="col-md-3" style={{ marginBottom: "15px" }}>
        <div className="card card-article">
          <img
            className="card-img-top"
            src={props.article.cover}
            alt="card-cap"
            style={{ height: "180px" }}
          />
          <div className="card-body">
            <h5 className="card-title title-article-sm">
              <a className="card-title title-article-sm" href={`/article/${props.article.slug}`}>
                {props.article.title}
              </a>
            </h5>
            <p
              className="card-text description-article"
              style={{ fontWeight: "500", fontSize: "12px" }}
            >
              By <span>{props.article.author_name}</span> ―{" "}
              {format(new Date(props.article.created_at), "MMMM dd, yyyy")}
            </p>
            <p className="card-text description-article">
              {props.article.description}
            </p>
            <Button
              type="link"
              // className="btn stretched-link d-block text-white"
              href={`/article/${props.article.slug}`}
              // onClick={showArticle}
            >
              Read Article
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}

Article.propTypes = {
  className: propTypes.string,
  type: propTypes.oneOf(["big", "medium", "small"]),
  onClick: propTypes.func,
  outerClassName: propTypes.string,
};
