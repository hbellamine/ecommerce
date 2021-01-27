import React from "react";
import Men from "./../../assets/men.jpeg";
import Woman from "./../../assets/woman.jpeg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${Men})` }}>
          <a>Shop Men</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${Woman})` }}>
          <a>Shop Womens</a>
        </div>
      </div>
    </div>
  );
};
export default Directory;
