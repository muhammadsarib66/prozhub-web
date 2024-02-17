import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import img from "../images/buisness.jpg";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Services = () => {
  const { getService } = useSelector((state) => state.SearchSeviceSlicer);
  const check = getService.length <0
  console.log(check)

  return (
    <div>
      <div>
        {getService ?
          getService.map((item, index) => {
            // console.log(item);
            return (
              <div className="container">
                <div className="row space">
                  <div className="col-sm-6">
                    <div className="heading">
                      <h2>{item.serviceName}</h2>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="view">
                      {/* <Link
              to={`/ViewAll/${encodeURIComponent(item.title)}/${encodeURIComponent(
            
              )}`}
            > */}
                      View All
                      {/* </Link>{" "} */}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="item-box">
                      {/* <Link to=""> */}
                      <img src={img} alt="images" />
                      {/* </Link> */}
                      <h5>{item.serviceName}</h5>
                    </div>
                  </div>
                </div>

             
              </div>
            );
          })
        :
        <p>no user Found </p>
        }
      </div>
    </div>
  );
};

export default Services;
