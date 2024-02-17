import React from "react";

import "../styles/Home.css";
function TestimItem({ item }) {
  return (
    <div className="commment text-center">
      <div className="testim-image">
        <img src={item.img} alt="img" />
      </div>
      <div className="text">
        <h5>{item.name}</h5>
        <h6>{item.designation}</h6>
        <p>{item.comments}</p>
      </div>
    </div>
  );
}

export default TestimItem;
