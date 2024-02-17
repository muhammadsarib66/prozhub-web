import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";

export const SerchServiceApi = createAsyncThunk(
  "prozhub/serchService",
  async (searchvalue, {}) => {
    try{
      const response = await axios.get(
        `${baseUrl}services/search-services?q=${searchvalue}`
        );
        console.log(response.data, 'getservice')
        return response.data;
      }catch(error){
        return error
      }
    }
);

const initialState = {
  getService: [],
  isLoading: false,
  isError: false,
  NewReqModalOpen : false,
  FinalReqModel : false,
  NewRequest : {}
};

const SearchServiceSlicer = createSlice({
  name: "service",
  initialState,
  reducers: {
    HandleShowModal :(state,action)=>{
      state.NewReqModalOpen = true
      state.NewRequest = action.payload;
      console.log(state.NewRequest)
      
    } ,
    handleCloseModal : (state,action)=>{
      state.NewReqModalOpen = false
    },
    handleOpenFinalReq : (state, action)=>{
      state.FinalReqModel = true
    },
    handleCloseFinalReq : (state, action)=>{
      state.FinalReqModel = false
    }

  },
  extraReducers: (builder) => {
    builder.addCase(SerchServiceApi.pending, (state, action) => {
      state.isLoading = true;
      // console.log("service load horhi ");
    });
    builder.addCase(SerchServiceApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getService = action.payload;
      // console.log("service load hogai");
    });
    builder.addCase(SerchServiceApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.getService = '';
      // console.log("search service error ");
    });
  },
});

export const {HandleShowModal,handleCloseModal,handleOpenFinalReq ,handleCloseFinalReq} = SearchServiceSlicer.actions;
export default SearchServiceSlicer.reducer;
