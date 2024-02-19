import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";



export const GetMyRequestApi = createAsyncThunk(
    "prozhub/GetMyRequests",
    async (arg, { dispatch, getState }) => {
      try {
        const token = sessionStorage.getItem("token");

        const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };

        const response = await axios.get(`${baseUrl}requests/get-my-requests`,config);
        console.log(response);
        // toast.success("Get Request Successfull");
        return response.data;
      } catch (error) {
        toast.error(error.response.data.message);
        // console.error(error.response.data.message);
        return error.response.data;
      }
    }
  );
  const initialState = {
    MyRequestsDetail : '',
    isLoading: false,
    IsError: false,
    error: '',
    SingleReqObj :''
  };
  const MyRequestSlicer = createSlice({
    name: "MyRequest",
    initialState,
    reducers: {
        getSingleReqObject :(state ,action )=>{
            state.SingleReqObj = action.payload;  
        }
    },
    extraReducers: (builder) => {
      builder.addCase(GetMyRequestApi.pending, (state, action) => {
        state.isLoading = true;
        // console.log("Getting Request details ");
      });
      builder.addCase(GetMyRequestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        const Data = action.payload
        const {data} = Data
        if(data.length >0){

            state.MyRequestsDetail = data;
            state.SingleReqObj = data[0];
        }
        // console.log("Get Request Successfully");
      });
      builder.addCase(GetMyRequestApi.rejected, (state, action) => {
        state.isLoading = false;
        state.IsError = true;
        // console.log("Get Requests Failed");
  
        state.error = action.error.message; 
      });
    }
  });

  export const {handleGetAllRequests} = MyRequestSlicer.actions;
  export default MyRequestSlicer.reducer;