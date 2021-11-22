import React from "react";
import propTypes from "prop-types";

export default function Project(props) {
  const className = [props.className];

  if (props.className) className.push(className);
  return (
    <div className={className.join(" ")}>
      <div className="text-center title-sm d-flex flex-column justify-content-center" style={{ height: "80px" }}>
        <span>{props.title}</span>
      </div>
      <img
        src={props.image}
        className="rounded"
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div className="mt-3" style={{ height: "150px", overflowY:"auto" }} >
        <p>{props.description}</p>
      </div>
    </div>
  );
}

Project.propTypes = {
  className: propTypes.string,
  description: propTypes.string,
  title: propTypes.string,
};
