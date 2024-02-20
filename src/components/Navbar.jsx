import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/Slicers/Slicer";
import { setUserLogout } from "../features/Slicers/LoginSlicer";
import { toast } from "react-toastify";
import Loading from "../screens/Loading";
function Navbar() {
  const dispatch = useDispatch();
  const {ProfileImg} = useSelector((state)=>state.EditProfileSlicer)
  const [profileImage, setProfileImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const User = sessionStorage.getItem("user");
  const Token = sessionStorage.getItem("token");
  let UserName = ''
  if (User){
    const { fullName } = JSON.parse(User);
     UserName = fullName;
  } 
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsOpen2(false);
    setIsLoading(true);
    toast.success("Logout Successfull");
    setTimeout(() => {
      setIsLoading(false);
      dispatch(setUserLogout());
      navigate("/");
      // window.location.reload();
    }, 1000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsDrawerOpen(false);
  };
  const handleOpen1 = () => {
    setIsDrawerOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen2(!isOpen2);
  };

  useEffect(()=>{
    if(ProfileImg){
      const User = sessionStorage.getItem("user");
      const { profile } = JSON.parse(User);
      const img = `${baseUrl}${profile}`
      setProfileImg(img)
    }
    else if(Token) {

      const User = sessionStorage.getItem("user");
      const { profile } = JSON.parse(User);
      const img = `${baseUrl}${profile}`
      setProfileImg(img)
    }
    
  },[ProfileImg,Token])

  return (
    <>
      <nav className=" shadow-lg shadow-black fixed w-full top-0 z-[1000] h-fit py-1 items-center bg-white ">
        <div className="hidden  container md:flex justify-between w-full items-center p-0">
          <Link className="" to="Home">
            <img src={logo} alt="logo" />
          </Link>
          <ul className=" flex gap-3 items-center text-lg font-semibold ">
            <li className="">
              {Token && (
                <Link className="nav-link" to="/requestservice">
                  My Request
                </Link>
              )}
            </li>
            <li className=" cursor-pointer">
              {!isOpen ? (
                <span onClick={handleOpen} className="">
                  <Link to="/explore">
                    Explore <i className="fas fa-chevron-down "></i>
                  </Link>
                </span>
              ) : (
                <span onClick={handleOpen1} className="nav-link">
                  <a className="nav-link" href="/">
                    Explore <i className="fas fa-chevron-up "></i>
                  </a>
                </span>
              )}
            </li>
            {User ? (
              <>
                <li>{UserName}</li>
                <li className="nav-">
                  <div
                    className="relative flex items-center gap-2"
                    href="#"
                    role="button"
                    data-bs-toggle=""
                    aria-expanded="false"
                  >
                    <img
                      src={profileImage}
                      alt="logo"
                      className="w-12 h-12 rounded-full "
                    />
                    {/* {
                      User ?
                    
                    : 
                    <img
                      src={userImg}
                      alt="logo"
                      className="w-12 h-12 rounded-full "/>
                  } */}
                    <span onClick={toggleDropdown}>
                      <i class="fa-solid fa-caret-down"></i>
                    </span>
                    {isOpen2 && (
                      <div className="absolute gap-2 flex flex-col  top-full left-[-100px] text-sm font-medium  w-44 mt-2 bg-white border border-gray-200 rounded shadow-lg  p-3">
                        <p
                          className="m-0 hover:text-gray-400"
                          onClick={() => setIsOpen2(false)}
                        >
                          <Link className="" to="/accountsettings">
                            Account Settings
                          </Link>
                        </p>
                        <p
                          className=" m-0 hover:text-gray-400"
                          onClick={handleLogout}
                        >
                          <Link className="" to="/">
                            Logout
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <li className="">
                <Link className="n" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* responsive Nav */}
        <div className=" duration-300 transition container pt-2 md:hidden flex justify-between items-center">
          <Link className="" to="Home">
            <img src={logo} alt="logo" />
          </Link>
          <div onClick={toggleDrawer} className="z-[100000px] ">
            <i className="text-3xl fa-solid fa-bars"></i>
          </div>
        </div>
        {
          <div
            className={` shadow-md md:hidden  ${
              isDrawerOpen
                ? "top-20 duration-300 transition "
                : " duration-300 transition top-[-1000px]"
            } bg-white w-full h-fit pb-4 duration-500 ease-in-out  transition absolute  z-[100000]`}
          >
            <div className="container flex text-start justify-start">
              <ul className="flex flex-col gap-3 items-start text-lg font-semibold ">
                <li onClick={toggleDrawer}>
                  {Token && (
                    <Link className="nav-link" to="/requestservice">
                      My Request
                    </Link>
                  )}
                </li>
                <li className=" cursor-pointer">
                  <span onClick={handleOpen} className="">
                    <Link to="/explore">
                      Explore
                    </Link>
                  </span>
                </li>
                {Token ? (
                  <>
                    <li>{UserName}</li>
                    <li onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                      <Link className="" to="/accountsettings">
                        Account Settings
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link className="" to="/">
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className=""
                  >
                    <Link className="n" to="/login">
                      Login
                    </Link>
                  </li>
                )}
                <li></li>
              </ul>
            </div>
          </div>
        }
      </nav>

      {/* <ToastContainer position="bottom-right" /> */}
      {isLoading && <Loading />}
    </>
  );
}

export default Navbar;
