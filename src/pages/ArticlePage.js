import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Footer from "../parts/Footer";
import axios from "axios";
import { format } from "date-fns";
import Header from "../parts/Header";
import edjsHTML from "editorjs-html";
import Button from "elements/Button";
import loading from "../assets/images/loading-buffering.gif";
import { Helmet } from "react-helmet";

export default function ArticlePage(props) {
  const [data, setData] = useState();
  var object = {};
  const contactRef = useRef();
  object.location = useLocation();

  function customImage(block) {
    return `<img src="${block.data.file.url}" className="img-fluid"/>`;
  }

  function customHeader(block) {
    switch (block.data.level) {
      case 1:
        return `<p className="title-article-content-1"> ${block.data.text} </p>`;

      case 2:
        return `<p className="title-article-content-2"> ${block.data.text} </p>`;

      case 3:
        return `<p className="title-article-content-3"> ${block.data.text} </p>`;

      case 4:
        return `<p className="title-article-content-4"> ${block.data.text} </p>`;

      case 5:
        return `<p className="title-article-content-5"> ${block.data.text} </p>`;

      case 6:
        return `<p className="title-article-content-6"> ${block.data.text} </p>`;

      default:
        return `<p className="wrapper-title-content" style={{ fontSize:"25px" }}> ${block.data.text} </p>`;
    }
    // return `<p className="wrapper-title-content"> ${block.data.text} </p>`;
  }

  const edjsParser = edjsHTML({ header: customHeader, image: customImage });

  let { slug } = useParams();

  const instance = axios.create({
    baseURL: "https://api.codermuda.com",
  });

  delete instance.defaults.headers.common.Authorization;

  const getArticle = () => {
    instance
      .get("/v1/posts/slug/" + slug)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getArticle();
  }, []);

  const blockToHtml = () => {
    if (data !== undefined) {
      let html = edjsParser.parse(data.content);
      return html;
    }
  };

  return (
    <>
      <Header {...object} contactRef={contactRef} />
      <section
        className="article-page row gradient-bg-article"
        style={{ height: "680px" }}
      >
        {data !== undefined ? (
          <div className="container zindex" style={{ marginTop: "80px" }}>
            <Helmet>
              <title>{data.title}</title>
              <meta name="description" content={data.description}></meta>
            </Helmet>
            <div className="d-flex mt-5 justify-content-center">
              <div className="col-6">
                <h1 className="text-center wrapper-title-content">
                  {data.title}
                </h1>
              </div>
            </div>
            <div className="d-flex mt-1  justify-content-center">
              <div className="col-5 text-center">{data.description}</div>
            </div>

            <div className="d-flex mt-2 justify-content-center">
              {data.categories !== null
                ? data.categories.map((obj) => {
                    return (
                      <Button
                        className="btn px-2"
                        // isPrimary
                        hasShadow
                        // onClick={showArticle}
                        style={{ marginLeft: "10px" }}
                      >
                        {obj.category}
                      </Button>
                    );
                  })
                : ""}
            </div>

            <div className="col mt-3" style={{ marginBottom: "15px" }}>
              <div className="card-article">
                <img
                  className="card-img-top"
                  src={data.cover}
                  alt={data.title + " image"}
                  style={{ height: "400px" }}
                />
                <div className="mt-2">
                  <div className="d-flex mt-1  justify-content-center">
                    <div>
                      <p className="card-text text-sm-article">
                        posted by{" "}
                        <span className="text-author">{data.author_name}</span>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div>
                      <p className="card-text text-sm-article">
                        <span>
                          {format(new Date(data.created_at), "dd MMMM yyyy")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              {blockToHtml().map((obj) => {
                return parse(obj);
              })}
            </div>

            <div className=" mt-5">
              <p className="d-flex">
                <span style={{ fontWeight: "600" }}>Tags: </span>
                {data.tags !== null
                  ? data.tags.map((obj) => {
                      return (
                        <Button
                          className="btn px-2"
                          isPrimary
                          hasShadow
                          // onClick={showArticle}
                          style={{ marginLeft: "10px" }}
                        >
                          {obj.tag}
                        </Button>
                      );
                    })
                  : ""}{" "}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="d-flex mt-5 justify-content-center"
            style={{ width: "100%" }}
          >
            <img className="loading" src={loading} alt="loading" />
          </div>
        )}
        <Footer contactRef={contactRef} />
      </section>
    </>
  );
}
