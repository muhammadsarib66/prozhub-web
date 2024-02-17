import React from "react";
import "../styles/Explore.css";
import Categeory from "../data/fake";
import { Link } from "react-router-dom";
function Explore() {
  // const subcat = Categeory.map((item) => item.subcat);
  //   const name = subcat.map((item) => item.title);
  //   console.log(subcat.title);
  return (
    <div  className="explore ">
      <div className="container">
        <div div className="row space">
          <div className="col-sm-12">
            <ul className="explore-list">
              {Categeory.map((item) => (
                <li>
                  {item.title}
                  <ul className="subcat">
                    {item.subcat.map((subitem) => (
                      <li key={subitem.id}>
                        <Link to="/">{subitem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
