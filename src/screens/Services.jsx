import React from "react";
import "../styles/Home.css";
import img from "../images/buisness.jpg";
import { useSelector } from "react-redux";

const Services = () => {
  const { getService } = useSelector((state) => state.SearchSeviceSlicer);

  return (
    <div>
      <div>
        {getService ? (
          getService.map((item, index) => {
            return (
              <div className="container">
                <div className="row space">
                  <div className="col-sm-6">
                    <div className="heading">
                      <h2>{item.serviceName}</h2>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="view">View All</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="item-box">
                      <img src={img} alt="images" />
                      <h5>{item.serviceName}</h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>no user Found </p>
        )}
      </div>
    </div>
  );
};

export default Services;
