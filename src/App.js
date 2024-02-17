import { useEffect } from "react";
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
import {fetchProzHubApi} from "./features/Slicers/Slicer"
import AcountSetting from "./screens/AccountSetting/AcountSetting";
import RequestService from "./screens/RequestService";
import SignUp from "./screens/SignUp";
import Loading from "./screens/Loading";
import { LoginApi } from "./features/Slicers/LoginSlicer";
import { GetMyRequestApi } from "./features/Slicers/MyRequestSlicer";
import { ToastContainer } from "react-toastify";
function App() {
  const dispatch = useDispatch();
  // const { isLoggedIn  } = useSelector((state) => state.Slicer);
  const { isLoading  } = useSelector((state) => state.LoginSlicer);
  // const {getService} = useSelector(state=>state.SearchSeviceSlicer )

  const {isUserLogout} = useSelector((state)=> state.LoginSlicer);
  const Token =sessionStorage.getItem("token");
  // const {LoginDet} = useSelector((state)=>state.LoginSlicer)
  // console.log(IsUserLogin);
  useEffect(()=>{
    if(Token){

      dispatch(fetchProzHubApi())
      dispatch(GetMyRequestApi());
    }
 console.log('isLoading', isLoading)
  },[LoginApi])
  return (
    <div>
      { isLoading && <Loading/>}
      <Router>
        <Navbar />
        <Routes>
          {!Token &&  (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />

            </>
          )}

          { isUserLogout}

          {Token && (
            <>
            
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/*" element={<Home />} />
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
