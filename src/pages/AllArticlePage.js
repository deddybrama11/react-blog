import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import Footer from "../parts/Footer";
import axios from "axios";
import Article from "elements/Article";
import Header from "../parts/Header";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

export default function AllArticlePage(props) {
  var object = {};
  object.location = useLocation();

  const [dataPage, setDataPage] = useState([]);
  const [itemPage, setItemPage] = useState([]);

  const pageSize = 10;
  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  delete instance.defaults.headers.common.Authorization;

  const getArticle = () => {
    instance
      .get("/v1/posts?page=1&page_size=" + pageSize + "&sort=newest")
      .then((response) => {
        //   console.log(response)
        setDataPage((category) => [
          ...category,
          { name: "latest", value: response.data.data },
        ]);

        setItemPage((item) => [
          ...item,
          { name: "latest", value: response.data.data.posts },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getItemArticle = async (page) => {
    return await instance
      .get("/v1/posts?page=" + page + "&page_size=" + pageSize + "&sort=newest")
      .then((response) => {
        return [{ name: "latest", value: response.data.data.posts }];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getArticle();
  }, []);

  const handlePageClick = async (data) => {
    const tmp = await getItemArticle(data.selected + 1);
    setItemPage(tmp);
  };

  useEffect(() => {
    console.log(itemPage);
  }, [itemPage]);

  return (
    <>
      <Header {...object} />
      <section
        className="article-page row gradient-bg-article"
        style={{ height: "680px" }}
      >
        {itemPage && itemPage[0] !== undefined ? (
          <div className="container zindex">
            <div className="mt-5">
              {itemPage[0].value.map((obj, index) => {
                return (
                  <Article
                    key={`popular-article-` + index}
                    type="medium"
                    article={obj}
                  ></Article>
                );
              })}
              <div className="d-flex mt-5 justify-content-center">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  previousLinkClassName={"page-link"}
                  pageClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  pageLinkClassName={"page-link"}
                  pageCount={dataPage[0].value.total_pages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex mt-5 justify-content-center">
            <ReactLoading
              type={"bars"}
              color={"#0984E3"}
              height={"10%"}
              width={"10%"}
            />
          </div>
        )}
        <Footer />
      </section>
    </>
  );
}
