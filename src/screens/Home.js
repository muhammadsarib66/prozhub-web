import React, { useEffect } from "react";
import Main from "../components/Main";
import Discover from "../components/Discover";
// import CategeoryList from "../components/Categeory";
// import Categeory from "../data/fake";
import Testimonial from "../components/Testimonial";
import { GetMyRequestApi } from "../features/Slicers/MyRequestSlicer";
import { useDispatch } from "react-redux";
import { fetchProzHubApi } from "../features/Slicers/Slicer";
import MobileScreen from "./MobileScreen/MobileScreen";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs";
// import Foooter from "../components/Foooter";
function Home() {
  const dispatch = useDispatch();

  const User = sessionStorage.getItem("user");
  useEffect(() => {
    dispatch(fetchProzHubApi());
    if (User) {
      dispatch(GetMyRequestApi());
    }
  }, [dispatch, User]);

  return (
    <div>
      <Main />
      <Discover />
      <MobileScreen />
      <AboutUs/>
      {/* {Categeory.map((Categeory, index) => (
        <span key={index}>
          <CategeoryList
            title={Categeory.title}
            sub={Categeory.subcat}
            Categeory={Categeory}
            bg={Categeory.bg}
          />
        </span>
      ))} */}

      <div className="testim-box space bg-gradient-to-r from-indigo-800 to-slate-600">
        <Testimonial />
      </div>
      <ContactUs />
    </div>
  );
}

export default Home;
