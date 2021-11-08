import React from "react";
import propTypes from "prop-types";

export default function Project(props) {
  const className = [props.className];

  if (props.className) className.push(className);
  return (
    <div class={className.join(" ")}>
      <div className="text-center title-sm">LOREM</div>
      <img
        src={props.image}
        class="rounded"
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <p>{props.description}</p>
    </div>
  );
}

Project.propTypes = {
  className: propTypes.string,
  description: propTypes.string,
};
