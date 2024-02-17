import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Location from "../data/Locations";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function Carousle() {
  const CustomPrevArrow = (props) => (
    <button className="prev-button" onClick={props.onClick}>
      <GrPrevious />
    </button>
  );

  const CustomNextArrow = (props) => (
    <button className="next-button" onClick={props.onClick}>
      <GrNext />
    </button>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="slids">
      <Slider {...settings}>
        {Location.map((loc) => (
          <div className="col-sm-4">
            <div className="cars">
              <img src={loc.img} alt="" />
              <div className="details">
                <h2>{loc.city}</h2>
                <button>Search {loc.city}</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default Carousle;
