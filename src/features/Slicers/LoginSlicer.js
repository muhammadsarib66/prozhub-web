import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let LoginDet = {};
let SignUpDet = {};
let errorMess = "";
 

export const LoginApi = createAsyncThunk(
  "prozhub/LoginApi",
  async (LoginDetail, { dispatch, getState }) => {
    try {
      console.log(LoginDetail, "is coming");
      if (LoginDetail === "") return "dont have login details";

      const response = await axios.post(`${baseUrl}users/login`, LoginDetail);
      console.log(response);
      toast.success("Login Successfull",{autoClose: 500});
      const token = response.data.token;
      sessionStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message,{autoClose: 500});
      console.error(error.response.data.message);
      return error;
    }
  }
);

// for Sigup
export const SignUpApi = createAsyncThunk(
  "prozhub/SignUpApi",
  async (user, {}) => {
    console.log(user, "arhi hai");
    if (user === "") return "SignUp Failed";

    await axios
      .post(`${baseUrl}users/register-client`, user)
      .then((res) => {
        console.log(res);
        toast.success("SignUp Successfull");
        SignUpDet = res.data;

        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        errorMess = err.response;
        return err;
      });
  }
);

const initialState = {
  IsUserLogin: false,
  User: {},
  isUserLogout: false,
  userLogin: "",
  UserSignUp: "",
  isLoading: false,
  isError: false,
};

const LoginSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    GetUser: (state, action) => {
      console.log("runn");
    },
    setUserLogout: (state, action) => {
      state.isUserLogout = true;
      console.log(state.isUserLogout)
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApi.pending, (state, action) => {
      state.isLoading = true;
      console.log("login load horhi ");
    });
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.IsUserLogin = true;
      const {user} = action.payload;
      state.User = user
      if(user){

        sessionStorage.setItem("user", JSON.stringify(user));
        const userLoggedString = sessionStorage.getItem("user");
        const userLogged = JSON.parse(userLoggedString) ?? "Not Found";
        console.log(userLogged);
      }
      else{
        state.isError = true;
        state.userLogin = "";
        console.log(errorMess);
        state.isLoading = false
      }

      // console.log(action.payload);

      // console.log(state.IsUserLogin);

      // console.log(errorMess);

      console.log("login load hogai");
    });
    builder.addCase(LoginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.userLogin = "";
      console.log("login mai error ");
    });
    // For SignUp the User

    builder.addCase(SignUpApi.pending, (state, action) => {
      state.isLoading = true;
      console.log("SignUp load horhi");
    });
    builder.addCase(SignUpApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (SignUpDet) {
        state.UserSignUp = SignUpDet;
        console.log(state.UserSignUp);
        
      } else {
        state.isError = true;
        state.UserSignUp = {};
        console.log(errorMess);
      }
      console.log("SignUp load hogai");
    });
    builder.addCase(SignUpApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.UserSignUp = {};
      console.log("SignUp mai error");
    });
  },
});

export const { GetUser, setUserLogout } = LoginSlicer.actions;
export default LoginSlicer.reducer;
