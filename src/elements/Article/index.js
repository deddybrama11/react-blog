import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import Button from "elements/Button";

export default function Article(props) {
  if (props.type === "big") {
    return (
      <div className="col" style={{ marginBottom: "15px" }}>
        <div class="card card-article">
          <img
            class="card-img-top"
            src={props.article.imageUrl}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title title-article-bg">{props.article.title}</h5>
            <p class="card-text description-article">
              {props.article.description}
            </p>
            <Button
              isPrimary
              hasShadow
              type="link"
              className="btn stretched-link d-block text-white"
              href={`/article/${props.article._id}`}
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
        <span className="title-article-md">{props.article.title}</span>
        <p className="description-article">{props.article.description}</p>
        <Button
          type="link"
          // className="btn stretched-link d-block text-white"
          href={`/article/${props.article._id}`}
          // onClick={showArticle}
        >
          Read Article
        </Button>
      </div>
    );
  } else if (props.type === "small") {
    return (
      <div className="col-md-3" style={{ marginBottom: "15px" }}>
        <div class="card card-article">
          <img
            class="card-img-top"
            src={props.article.imageUrl}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title title-article-sm">{props.article.title}</h5>
            <p class="card-text description-article">
              {props.article.description}
            </p>
            <Button
              type="link"
              // className="btn stretched-link d-block text-white"
              href={`/article/${props.article._id}`}
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
