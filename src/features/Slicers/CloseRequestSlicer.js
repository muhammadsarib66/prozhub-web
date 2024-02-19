import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

// requests/close-request


export const CloseReqApi = createAsyncThunk(
    "prozhub/CloseReqApi",
    async (reqObj, { dispatch, getState }) => {
        console.log(reqObj, "is coming");
      try {
        if (reqObj === "") return "dont have any request details";
        const token = sessionStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post(`${baseUrl}requests/create-new-request`, reqObj,config);
        toast.success("Request Closed");

        return response.data;
      } catch (error) {
        // toast.error(error.response.data.message);
        console.error(error.response.data.message);
        return error.response.data;
      }
    }
  );
  const initialState = {
    closeReqData : '',
    isLoading: false,
    IsError: false,
    error: '',
  };

  const CloseRequestSlicer = createSlice({
    name: "closeRequest",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(CloseReqApi.pending, (state, action) => {
        state.isLoading = true;
        console.log("Request closing pending");
      });
      builder.addCase(CloseReqApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.closeReqData = action.payload 
        console.log(action.payload);
        console.log("Request Closed Succes");
      });
      builder.addCase(CloseReqApi.rejected, (state, action) => {
        state.isLoading = false;
        state.IsError = true;
        console.log("Request closed Failed");
  
        state.error = action.error.message; 
      });
    }
  });

  export const {} = CloseRequestSlicer.actions;
  export default CloseRequestSlicer.reducer;