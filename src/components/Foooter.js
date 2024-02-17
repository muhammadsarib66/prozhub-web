import React from "react";
import { Link } from "react-router-dom";
function Foooter() {
  return (
    <div className="footer">
      {" "}
      <div className="container">
        <div className="row space">
          <div className="col-sm-3">
            <div className="footer-item">
              <h6>For Customers</h6>
              <ul>
                <li>
                  <Link to="/">Find a profesional </Link>
                </li>
                <li>
                  <Link to="/">How it work </Link>
                </li>
                <li>
                  <Link to="/Login">Login </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="footer-item">
              <h6>For Professionals</h6>
              <ul>
                <li>
                  <Link to="/">How it works </Link>
                </li>
                <li>
                  <Link to="/">Pricing </Link>
                </li>
                <li>
                  <Link to="/">Join as a Professional</Link>
                </li>
                <li>
                  <Link to="Login">Help centre</Link>
                </li>
                <li>
                  <Link to="Login">Mobile App</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="footer-item">
              <h6>About</h6>
              <ul>
                <li>
                  <Link to="/">About ProzHub</Link>
                </li>
                <li>
                  <Link to="/">Careers</Link>
                </li>
                <li>
                  <Link to="/">Affiliates</Link>
                </li>
                <li>
                  <Link to="/">Blog</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="footer-link">
              <ul>
                <li>
                  <Link to="mailto:abcd@gmail.com">prozhub@gmail.com</Link>
                </li>
                <li>
                  <Link to="tell:0305542144">0305542144</Link>
                  <p>(open 24 hours a day, 7 days a week)</p>
                </li>
                <li>
                  <ul className="social">
                    <li>
                      <Link to="/">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <select>
                    <option value="someOption">Some option</option>
                    <option value="otherOption">Other option</option>
                    <option value="otherOption">Other option</option>
                    <option value="otherOption">Other option</option>
                    <option value="otherOption">Other option</option>
                    <option value="otherOption">Other option</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 text-center">
            <hr />
            <p className="copy">
              2024 All &copy;copyright reserve by ProzHub.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foooter;
