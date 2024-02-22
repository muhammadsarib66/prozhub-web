import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo1.png";
import apple from "../images/appleLogo.png";
import play from "../images/playStoreLogo.png";
function Foooter() {
  return (
    <div className="footer bg-slate-100 ">
      {" "}
      <div className="container">
        <div className="row space  align-items-center">
          <div className="col-sm-3">
            <div className="footer-item">
              <img src={Logo} alt="logo" />
              {/* <h6>For Customers</h6>
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
              </ul> */}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="footer-item pt-6 md:pt-0">
              <h6>Contact Us</h6>
              <ul>
                <li className="">
                  <span>
                    <i class="fa-solid fa-location-dot"></i>
                  </span>
                  <Link to="/"> ADDRESS : Apartment Building Suit... </Link>
                </li>
                <li>
                  <Link to="tel:03103102166">+813100302 </Link>
                </li>
                <li>
                  <Link to="/">prozhub@gmail.com</Link>
                </li>
                <li>
                  <Link to="Login">Help centre</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="footer-item">
              <h6>Pages</h6>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#service">Services</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact Us </a>
                </li>
                <li>
                  <a
                    href="https://www.termsfeed.com/live/3c226a0f-4cb8-4c3e-a491-cb8e164de9bf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="flex gap-5 justify-center md:justify-start">
              <ul className="flex flex-col gap-2">
                <li className="text-2xl font-bold">
                  <Link>Download Our App</Link>
                </li>
                <li className="flex  flex-col lg:flex-row gap-2">
                  <img className="w-28" src={apple} alt="logo1" />
                  <img className="w-28" src={play} alt="logo2" />
                  {/* <p>(open 24 hours a day, 7 days a week)</p> */}
                </li>
                <li>
                  <ul className="flex gap-4 justify-center md:justify-end text-2xl py-2">
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
                  <span className="flex justify-center md:justify-end">
                    <select>
                      <option value="someOption">Some option</option>
                      <option value="otherOption">Other option</option>
                      <option value="otherOption">Other option</option>
                      <option value="otherOption">Other option</option>
                      <option value="otherOption">Other option</option>
                      <option value="otherOption">Other option</option>
                    </select>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row" style={{paddingBottom: "30px"}}>
          <div className="col-sm-12 text-center ">
            <hr />
            <p className="copy ">
              2024 All &copy;copyright reserve by ProzHub.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foooter;
