import React from "react";
import Marquee from "react-fast-marquee";
import TestimItem from "./TestimItem";
import review from "../data/Reviews";

function Testimonial() {
  return (
    <div className="container-fluid p">
      <div className="text-center">
        <div className="heading text-white">
          <h2>Testimonial</h2>
        </div>
      </div>

      <Marquee>
        {review.map((item,index) => (
          <span key={index}>

          <TestimItem item={item} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default Testimonial;
