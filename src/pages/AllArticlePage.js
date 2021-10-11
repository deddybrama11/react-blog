import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Footer from "../parts/Footer";
import axios from "axios";
import { format } from "date-fns";
import Header from "../parts/Header";
import ReactPaginate from "react-paginate";
import Button from "elements/Button";

export default function AllArticlePage(props) {
  var object = {};
  object.location = useLocation();

  const [dataPage, setDataPage] = useState([]);

  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  delete instance.defaults.headers.common.Authorization;

  const getArticle = () => {
    instance
      .get("/v1/posts?page=1&page_size=2&sort=newest")
      .then((response) => {
        //   console.log(response)
        setDataPage((category) => [
          ...category,
          { name: "latest", value: response.data.data },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getArticle();
  }, []);

  const handlePageClick = (data) => {
    console.log(data);
    // let selected = data.selected;
    // let offset = Math.ceil(selected * this.props.perPage);

    // this.setState({ offset: offset }, () => {
    //   this.loadCommentsFromServer();
    // });
  };

    useEffect(() => {
      console.log(dataPage);
    }, [dataPage]);

  return dataPage !== undefined && dataPage[0] !== undefined ? (
    <>
      <Header {...object} />
      <section
        className="article-page row gradient-bg-article"
        style={{ height: "680px" }}
      >
        <div className="container zindex">
          <div className="mt-5">
            {/* {
                dataPage.map((obj) => {
                    return <div>dsadasa</div>
                })
            } */}
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
        <Footer />
      </section>
    </>
  ) : (
    <span>Loading . . .</span>
  );
}
