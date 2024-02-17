import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = 'http://104.207.133.129:3000/'
// export const baseUrl = 'http://192.168.226.91:3000/'

export const fetchProzHubApi = createAsyncThunk('prozhub/getServices',async () => {
     return await axios.get(`${baseUrl}services/get-services`).then((resp)=> resp.data.data).catch((err)=> err)
    // return response.data.data
}
)

const initialState = {
  testValue: 1,
  isLoading : false,
  isError : false,
  isLoggedIn : false,
  reviews: [],
  getAllServices : []
  
};

const Slicer = createSlice({
  name: "review",
  initialState,
  reducers: {
    setUserLogin : (state , action)=>{
      state.isLoggedIn = action.payload
    }
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchProzHubApi.pending, (state, action) => {
        state.isLoading = true
        console.log('app load horhi')
        
    })
    builder.addCase(fetchProzHubApi.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllServices = action.payload
        console.log('app load hogai')
        console.log(state.getAllServices)

    })
    builder.addCase(fetchProzHubApi.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.reviews = []
        console.log('app error arha hai ')

    })

  }
});

export const {setUserLogin} = Slicer.actions;
export default Slicer.reducer;
