import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";


export const NewRequestApi = createAsyncThunk(
    "prozhub/NewRequestApi",
    async (newRequest, { dispatch, getState }) => {
        console.log(newRequest, "is coming");
      try {
        if (newRequest === "") return "dont have any request details";
        const token = sessionStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post(`${baseUrl}requests/create-new-request`, newRequest,config);
        toast.success("Request Created");

        return response.data;
      } catch (error) {
        // toast.error(error.response.data.message);
        console.error(error.response.data.message);
        return error.response.data;
      }
    }
  );

  const initialState = {
    getReqData : '',
    isLoading: false,
    IsError: false,
    error: '',
  };

  const NewRequestSlicer = createSlice({
    name: "NewRequest",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(NewRequestApi.pending, (state, action) => {
        state.isLoading = true;
        console.log("Request Creating");
      });
      builder.addCase(NewRequestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        console.log("Request Created");
      });
      builder.addCase(NewRequestApi.rejected, (state, action) => {
        state.isLoading = false;
        state.IsError = true;
        console.log("Request Failed");
  
        state.error = action.error.message; 
      });
    }
  });

    // export const {} = NewRequestSlicer.actions;
    export default NewRequestSlicer.reducer;