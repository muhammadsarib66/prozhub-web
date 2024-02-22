import React from "react";
import "../styles/Home.css";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../screens/Loading";

function Discover() {
  const { getAllServices, isLoading } = useSelector((state) => state.Slicer);

  return (
    <div  id="service" className="container">
      <div className="row space">
        <div className="col-sm-12">
          <div className="explore-details">
            <h2 className="text-center font-bold">Explore</h2>
          </div>
        </div>
          <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-4 ">
            {getAllServices?.map((service) => (
              <div data-aos="fade-up" className=" bg-slate-50 rounded-2xl  flex items-center px-5   py-4">
                <div className=" rounded-md w-16 h-16 flex justify-center items-center bg-white text-2xl">
                  <i className=" text-yellow-500 fa-solid fa-thumbs-up"></i>
                </div>
                <div className="ml-9">
                  <p className="text-lg text-gray-500">{service.serviceName}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
      {isLoading && <Loading />}
    </div>
  );
}

export default Discover;
