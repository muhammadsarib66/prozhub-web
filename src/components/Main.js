import React, { useEffect, useState } from "react";
import "./Main.css";
import Categeory from "../data/fake";
import {
  HandleShowModal,
  SerchServiceApi,
} from "../features/Slicers/SearchSeviceSlicer";
import { useSelector, useDispatch } from "react-redux";
import Services from "../screens/Services";
import RequestServiceModal from "./RequestServiceModal";
import { GetQuestionsApi } from "../features/Slicers/GetQuestionnaireSlicer";
import SendNewRequest from "./SendNewRequest";

function Main() {
  const dispatch = useDispatch();
  const { getService } = useSelector((state) => state.SearchSeviceSlicer);
  const { getAllServices } = useSelector((state) => state.Slicer);
  const [isInputFocused, setIsInputFocused] = useState(false);
  // console.log(getService);
  const [SearchedService, setSearcedService] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    dispatch(SerchServiceApi(input));

    // Filter category and subcategory titles based on the first letter of the input
    const filteredSuggestions = Categeory.filter((category) =>
      category.title.toLowerCase().startsWith(input.toLowerCase())
    ).map((category) => category.title);

    setSuggestions(filteredSuggestions);
  };
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(suggestion);
    setSearchInput("");
    dispatch(GetQuestionsApi(suggestion?._id));

    dispatch(HandleShowModal(suggestion));
  };

  useEffect(() => {
    setSearcedService(getService);
  }, []);
  return (
    <>
      <div className="main">
        <div className="detail">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>
                  Find the perfect <br /> professional for you
                </h1>
                <h3>Get free quotes within minutes</h3>
                <div className="search-box ">
                  <div className="box">
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      className="text"
                      value={searchInput}
                      onFocus={handleInputFocus}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  {/* <div className="box2">
                    <i class="fa-solid fa-location-dot"></i>
                    <input
                      type="text"
                      placeholder="postal code"
                      className="postal"
                    />
                  </div> */}
                  <div className="">
                    <button className="search-btn"> Search</button>
                  </div>
                </div>
              </div>
            </div>

            {isInputFocused && !searchInput == "" && (
              <ul className="suggestion-list rounded border border-white">
                {getService &&
                  getService?.map((suggestion, index) => {
                    // console.log(suggestion)
                    return (
                      <li
                        style={{ cursor: "pointer" }}
                        key={suggestion?._id}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion?.serviceName}
                      </li>
                    );
                  })}
              </ul>
            )}
            <div className="modalReq">
              <RequestServiceModal />
            </div>
            <div>
              <SendNewRequest />
            </div>
            <p>Popular: House Cleaning, Web Design, Personal Trainers</p>
          </div>
        </div>
      </div>
      {/* {getService && <Services />} */}
    </>
  );
}

export default Main;
