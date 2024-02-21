import React, { useRef, useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo1.png";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import User from "../data/User";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogin } from "../features/Slicers/Slicer";
import { useNavigate } from "react-router-dom";
import { LoginApi, SignUpApi } from "../features/Slicers/LoginSlicer";
import { ToastContainer, toast } from "react-toastify";
// import { Navigate } from "react-router-dom";
function SignUp() {
  const { isLoggedIn } = useSelector((state) => state.Slicer);
  const { userLogin, IsUserLogin } = useSelector((state) => state.LoginSlicer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !email || !password|| !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (fullName && phoneNumber && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password does not match");
        return;
      }
      const user = { fullName, phoneNumber, email, password };
      dispatch(SignUpApi(user))
      console.log(user);

      setName("");
      setEmail("");
      setPhone("");
      setPass("");
      setConfPass("");
    }

  };

  return (
    <div>
      <div className="login h-screen">
        <form onSubmit={handleSubmit} className="login-box">
          <div className="logo text-center">
            <img src={logo} alt="img" />
          </div>
          <div className="heading">
            <h2>Sign Up</h2>
          </div>
          <InputField
            type="text"
            placeholder={"Enter your Full Name"}
            id="text"
            value={fullName }
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            type={"text"}
            placeholder={"Enter your Phone Number"}
            id={"Number"}
            value={phoneNumber}
            onChange={(e) =>{
                const inputValue = e.target.value;
    // Only allow numeric characters in the phone input field
    const numericValue = inputValue.replace(/\D/g, '');
    setPhone(numericValue);
                }}
          />
          <InputField
            type={"email"}
            placeholder={"Enter your Email"}
            id={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type={"password"}
            placeholder={"Password"}
            id={"password"}
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
          <InputField
            type={"password"}
            placeholder={" Confirm Password"}
            id={"confirmpassword"}
            value={confirmPassword}
            onChange={(e) => setConfPass(e.target.value)}
          />
          <Button title="Sign Up" type="submit" />
          <div className="forget">
            <p className="SignIn">
              Already have account?{" "}
              <Link
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  borderBottom: "2px solid blue",
                }}
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
      
    </div>
  );
}

export default SignUp;
