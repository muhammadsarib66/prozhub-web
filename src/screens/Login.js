import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo1.png";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../features/Slicers/LoginSlicer";
import { toast } from "react-toastify";
import { GetUser } from "../features/Slicers/LoginSlicer";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setEmail(""); // Clear the email input
      setPassword("");
      toast.error("Please fill all fields");
    } else {
      const user = { email, password };
      dispatch(LoginApi(user));
      if (token) {
        dispatch(GetUser());
        navigate("/home")
      }
      setEmail(""); // Clear the email input
      setPassword(""); // Clear the password input
      setError("");
    }
  };

  return (
    <div>
      <div className="login h-[50vh]  md:h-screen ">
        <div data-aos="zoom-out" className="login-box ">
          <div className="logo text-center">
            <img src={logo} alt="img" />
          </div>
          <div className="heading">
            <h2>Login</h2>
          </div>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField type={"checkbox"} label={"Remember me"} id={"check"} />

          <Button title="Login" onClick={handleSubmit} type="submit" />

          <div className="forget">
            <p className="SignUp">
              don't have account?{" "}
              <Link
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  borderBottom: "2px solid blue",
                }}
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
            <Link to="/">Forget password?</Link>
          </div>
          {error && (
            <p style={{ color: "red" }} className="error-message">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
