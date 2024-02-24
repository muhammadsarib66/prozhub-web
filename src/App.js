import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
import Explore from "./screens/Explore";
import ViewAll from "./screens/ViewAll screen";
import Foooter from "./components/Foooter";
import ServiceDetail from "./screens/ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProzHubApi } from "./features/Slicers/Slicer";
import AcountSetting from "./screens/AccountSetting/AcountSetting";
import RequestService from "./screens/RequestService";
import SignUp from "./screens/SignUp";
import Loading from "./screens/Loading";
import { GetMyRequestApi } from "./features/Slicers/MyRequestSlicer";
import { ToastContainer } from "react-toastify";
import Aos from "aos";
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoginSlicer);
  const [navColor,setNavText] = useState('white')

  const { isUserLogout } = useSelector((state) => state.LoginSlicer);
  const Token = sessionStorage.getItem("token");
  // const {LoginDet} = useSelector((state)=>state.LoginSlicer)
  useEffect(() => {
    if (Token) {
      dispatch(GetMyRequestApi());
      dispatch(fetchProzHubApi());
    }
    console.log("isLoading", isLoading);
  
  }, [dispatch, Token, isLoading]);

 
  useEffect(()=>{
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should only happen once while scrolling down
    })
  })
  return (
    <div>
      {isLoading && <Loading />}
      
      <Router>
      <Navbar />
        <Routes>
          {!Token && (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
            </>
          )}

          {isUserLogout}

          {Token && (
            <>
              {/* <Route path="/" element={<Home />} /> */}
              <Route exact path="/*" element={<Home />} />
              <Route path="/explore" element={<Explore />} />

              <Route path="Service" element={<ServiceDetail />} />
              <Route path="/ViewAll/:title/:bg" element={<ViewAll />} />
              <Route path="/accountsettings" element={<AcountSetting />} />
              <Route path="/requestservice" element={<RequestService />} />
            </>
          )}
        </Routes>
        <Foooter />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
