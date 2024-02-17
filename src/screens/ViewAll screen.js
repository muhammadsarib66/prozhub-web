import React from "react";
import "../styles/View.css";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Cards from "../components/Cards";
import "../styles/Home.css";

import { useParams, useNavigate } from "react-router-dom";
import Categeory from "../data/fake";
import MiniList from "../components/MiniList";
function ViewAll() {
  const navigate = useNavigate();
  const { title, bg } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const decodedBg = decodeURIComponent(bg);

  const findSubcatByTitle = () => {
    const category = Categeory.find((cat) => cat.title === title);

    if (category) {
      return category.subcat;
    }

    return [];
  };

  const titleToFind = { decodedTitle };
  const subcatArray = findSubcatByTitle(titleToFind);
  const findAllcatByTitle = () => {
    const category = Categeory.find((cat) => cat.title === title);

    if (category) {
      return category.all;
    }

    return [];
  };
  const allcatArray = findAllcatByTitle(titleToFind);

  const go = (item) => {
    console.log("Item data:", item);
    navigate("/Service", { state: { item } });
    console.log(item);
  };

  return (
    <div>
      <div className="views">
        <img src={decodedBg} alt="img" />
        <div className="View-Heading">
          <h2>Find {decodedTitle} professionals near you</h2>
          <div className="services-form">
            <h5>What sevice do You need?</h5>
            <InputField type={"text"} />
            <h5>Where do you need it?</h5>
            <InputField
              type={"text"}
              placeholder={"Enter Your zipcode & Town"}
            ></InputField>
            <Button title={"Continue"} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row space">
          <div className="col-sm-12">
            <div className="details-description">
              <h2>Need help finding a {decodedTitle} professional?</h2>
              <p>
                You can find the best {decodedTitle} professionals on Bark.
                Start your search and get free quotes now!
              </p>
              <p>
                First time looking for a {decodedTitle} professional and not
                sure where to start? Tell us about your project and we’ll send
                you a list of {decodedTitle} professionals to review. There’s no
                pressure to hire, so you can compare profiles, read previous
                reviews and ask for more information before you make your
                decision.{" "}
              </p>
              <p>Best of all - it’s completely free!</p>
            </div>
          </div>
        </div>
      </div>
      <Cards title={decodedTitle} />

      <div className="container">
        <div className="row space">
          <div className="col-sm-12">
            <div className="heading">
              <h2>Popular Categories</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {subcatArray.map((item) => (
            <div className="col-sm-4">
              <div className="item-box" onClick={() => go(item)}>
                {/* <Link to={{ pathname: "/Service", state: { item } }}> */}
                <img src={item.img} alt="images" />
                {/* </Link> */}
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="row space">
          <div className="col-sm-12">
            <div className="headings">
              <h2>All Services</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="headings">
              {allcatArray.map((item) => (
                <MiniList title={item.title} data={allcatArray} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAll;
