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
        // console.log(response);
        return response.data;
      } catch (error) {
        toast.error(error.response.data.message);
        return error.response.data;
      }
    }
  );
  const initialState = {
    MyRequestsDetail : '',
    isLoading: false,
    IsError: false,
    error: '',
    SingleReqObj :'',
    FilterData : '',
    ActiveReq: "",
    CloseReq : ""
  };
  const MyRequestSlicer = createSlice({
    name: "MyRequest",
    initialState,
    reducers: {
          setFilterData:(state, action )=>{
            if(state.MyRequestsDetail){
                if(action.payload !== "Closed" && action.payload !== "Active"){
                state.FilterData = state.MyRequestsDetail;
                }
                else {
                  const filter = state.MyRequestsDetail?.filter((item)=> item.requestStatus === action.payload)
                  state.FilterData = filter
                }
         
        }
      },
      setSingleRequest :(state,action)=>{
        state.SingleReqObj = action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(GetMyRequestApi.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(GetMyRequestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        const Data = action.payload
        const {data} = Data
        if(Data){

          state.SingleReqObj = data[0];
          state.MyRequestsDetail = data;
          state.FilterData = data;
          }
      });
      builder.addCase(GetMyRequestApi.rejected, (state, action) => {
        state.isLoading = false;
        state.IsError = true;
        // console.log("Get Requests Failed");
  
        state.error = action.error.message; 
      });
    }
  });

  export const {setSingleRequest,setFilterData} = MyRequestSlicer.actions;
  export default MyRequestSlicer.reducer;