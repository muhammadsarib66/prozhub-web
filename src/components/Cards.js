import React from "react";
import "../styles/View.css";
function Cards({ title }) {
  return (
    <div className="card-bg">
      <div className="container">
        <div className="row space">
          <div className="col-sm-4">
            <div className="card-box">
              <h4>Tell us what you need</h4>
              <p>
                We’ll help you find {title} professionals. Help us refine your
                search by telling us your requirements and we’ll contact service
                providers in your area to help you.
              </p>
              <div className="sr">1</div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card-box">
              <h4>Receive Free Quotes</h4>
              <p>
                You’ll receive free quotes from professionals and get quick
                notifications via our website or app. We make sure we do the leg
                work for you!
              </p>
              <div className="sr">2</div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card-box">
              <h4>Choose your {title} professional</h4>
              <p>
                Pick from some of the best providers in your area. With easy
                access to reviews and direct contact with{title}
                professionals, you can be confident with your choice.
              </p>
              <div className="sr">3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
