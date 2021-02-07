import React from "react";
import { useHistory } from "react-router";
import Men from "./../../assets/mens.jpg";
import Woman from "./../../assets/woman.jpeg";

import "./styles.scss";

const Directory = (props) => {
  const history = useHistory();
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${Men})` }}>

            <a onClick={()=>{history.push('/search/mens')}}>Shop Men</a>

        </div>
        <div className="item" style={{ backgroundImage: `url(${Woman})` }}>
        <a onClick={()=>{history.push('/search/womens')}}>Shop Womens</a>
        </div>
      </div>
    </div>
  );
};
export default Directory;
