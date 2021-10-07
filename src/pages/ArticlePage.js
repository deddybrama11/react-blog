import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../parts/Header";

export default function ArticlePage(props) {
  const [data, setData] = useState();
  var object = {};
  object.location = useLocation();

  let { slug } = useParams();

  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  delete instance.defaults.headers.common.Authorization;

  const getArticle = () => {
    console.log(data);
    instance
      .get("/v1/posts/slug/" + slug)
      .then((response) => {
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
            <div className="card card-article">
              <img
                className="card-img-top"
                src={data.cover}
                alt="card-cover-top"
                style={{ height: "400px" }}
              />
              <div className="cadrd-body">
                <div className="d-flex mt-1  justify-content-center">
                  <div>
                    <p className="card-text description-article">
                      posted by{" "}
                      <span className="text-author">Dedy Bramayadi</span>
                    </p>
                  </div>
                </div>
                <div className="d-flex mt-1  justify-content-center">
                  <div>
                    <p className="card-text description-article">
                      <span className="">{data.created_at}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <span>Loading . . .</span>
  );
}
