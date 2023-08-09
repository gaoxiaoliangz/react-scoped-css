import React from "react";
import "./Grid.scoped.scss";

const GridForwardProps = (props) => {
  const { className } = props;
  return (
    <div {...props} className={`grid ${className ? className : ""}`}>
      {props.children}
    </div>
  );
};

export default GridForwardProps;
