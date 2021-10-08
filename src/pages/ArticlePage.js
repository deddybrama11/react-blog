import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Footer from "../parts/Footer";
import axios from "axios";
import { format } from "date-fns";
import Header from "../parts/Header";
import edjsHTML from "editorjs-html";

export default function ArticlePage(props) {
  const [data, setData] = useState();
  var object = {};
  object.location = useLocation();

  const edjsParser = edjsHTML();
  // const parse = require('html-react-parser');

  let { slug } = useParams();

  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  delete instance.defaults.headers.common.Authorization;

  const getArticle = () => {
    instance
      .get("/v1/posts/slug/" + slug)
      .then((response) => {
        // console.log(response)
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getArticle();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const blockToHtml = () => {
    if (data !== undefined) {
      let html = edjsParser.parse(data.content);
      console.log(html);
      return html;
    }
  };

  return data !== undefined ? (
    <>
      <Header {...object} />
      <section className="row gradient-bg-article" style={{ height: "680px" }}>
        <div className="container zindex">
          <div className="d-flex mt-5 justify-content-center">
            <div className="col-6 text-center wrapper-title-content">
              {data.title}
            </div>
          </div>
          <div className="d-flex mt-1  justify-content-center">
            <div className="col-5 text-center">{data.description}</div>
          </div>
          <div className="col mt-3" style={{ marginBottom: "15px" }}>
            <div className="card-article">
              <img
                className="card-img-top"
                src={data.cover}
                alt="card-cover-top"
                style={{ height: "400px" }}
              />
              <div className="mt-2">
                <div className="d-flex mt-1  justify-content-center">
                  <div>
                    <p className="card-text text-sm-article">
                      posted by{" "}
                      <span className="text-author">Dedy Bramayadi</span>
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
          
        </div>
        <Footer/>
      </section>
    </>
  ) : (
    <span>Loading . . .</span>
  );
}
