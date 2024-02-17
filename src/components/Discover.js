import React from "react";
import "../styles/Home.css";
import Categeory from "../data/fake";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <div className="container-fluid">
      <div className="row space">
        <div className="col-sm-12">
          <div className="explore-details">
            <h2 className="text-center">Explore</h2>
            <div className=" space">
              <ul className="items">
                {Categeory.map((category) => (
                  <li key={category.id}>
                    <Link link to="">
                      <div className="icon-box">
                        <img src={category.image} alt={category.title} />
                      </div>
                      <p>{category.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
