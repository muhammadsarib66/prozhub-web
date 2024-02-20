import React from "react";
import "../styles/Home.css";
import { useSelector} from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loading from "../screens/Loading";

function Discover() {
  const {getAllServices, isLoading} = useSelector((state) => state.Slicer);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="row space">
        <div className="col-sm-12">
          <div className="explore-details">
            <h2 className="text-center">Explore</h2>
          </div>
        </div>

        <div className="row">
          {
            isLoading && <Loading />
          }
          <div>

            <Slider {...settings}>
              {getAllServices?.map((service ) => (
                <div key={service?._id}style={{ marginLeft: "10px", marginRight: "10px" }}>
                  <div className="categeory_listing  ">
                    <div className="iconBoxs">
                      <i className="fa-regular fa-heart"></i>
                    </div>

                    <h6>{service?.serviceName}</h6>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
