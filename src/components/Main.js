import React, { useEffect, useState } from "react";
import "./Main.css";
import {
  HandleShowModal,
  SerchServiceApi,
} from "../features/Slicers/SearchSeviceSlicer";
import { useSelector, useDispatch } from "react-redux";
import RequestServiceModal from "./RequestServiceModal";
import { GetQuestionsApi } from "../features/Slicers/GetQuestionnaireSlicer";
import SendNewRequest from "./SendNewRequest";

function Main() {
  const dispatch = useDispatch();
  const { getService } = useSelector((state) => state.SearchSeviceSlicer);
  // const { getAllServices } = useSelector((state) => state.Slicer);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [SearchedService, setSearcedService] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    dispatch(SerchServiceApi(input));
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
      <div id="home" className="main">
        <div data-aos="zoom-in" className="detail ">
          <div className="relative container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="w-full">
                  Discover Your Ideal <br /> Professional Match!
                </h1>
                <h3>Receive instant quotes at no cost within minutes!</h3>
                <div className="search-box rounded-full text-black ">
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

                  <div className=" text-gray-500 text-xl pr-5 flex justify-end items-center w-fit">
                    {searchInput ? (
                      <i
                        onClick={() => setSearchInput("")}
                        className="cursor-pointer text-blue-900 fa-solid fa-close"
                      ></i>
                    ) : (
                      <i className="fa-solid fa-magnifying-glass"></i>
                    )}
                    {/* <button className="search-btn"> Search</button> */}
                  </div>
                  {isInputFocused && !searchInput == "" && (
                    <ul className="  w-full px-2 suggestion-list rounded-2xl border border-white">
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
                </div>
              </div>
            </div>

            <div className="modalReq">
              <RequestServiceModal />
            </div>
            <div>
              <SendNewRequest />
            </div>
            {!searchInput && (
              <p style={{ paddingLeft: "5px" }}>
                Popular: House Cleaning, Web Design, Personal Trainers
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
