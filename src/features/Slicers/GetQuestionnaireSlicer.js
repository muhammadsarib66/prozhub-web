import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";


export const GetQuestionsApi = createAsyncThunk(
    "prozhub/GetQuestions",
    async (id, thunkAPI) => {
        // console.log(id)
        
        try {
            const response = await axios.get(
                `${baseUrl}questionnaire/get-service-quesstionaire/${id}`
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
  );


  const initialState = {
    getQuestions: [],
    isLoading: false,
    isError: false,
    questionnaire : '',
    serviceId: '',
    newRequestData : '',
  };

  const GetQuestionnaireSlicer = createSlice({
    name: "questions",
    initialState,
    reducers: {
      
     HandleClearQuestion : (state ,action)=>{
        // state.getQuestions = ''
     } ,
     HandleGetAnswers : (state,action)=>{
        console.log(action.payload)
        state.questionnaire = action.payload
     },
     HandleServiceId : (state,action)=>{
      console.log(action.payload)
      state.serviceId = action.payload
     },
    
  
    },
    extraReducers: (builder) => {
      builder.addCase(GetQuestionsApi.pending, (state, action) => {
        state.isLoading = true;
        // console.log("questions load horhe ");
      });
      builder.addCase(GetQuestionsApi.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.getQuestions = action.payload;
        console.log("service load hogai");
        // console.log(state.getQuestions);
      });
      builder.addCase(GetQuestionsApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.getQuestions = '';
        console.log("qeustions api mai error ");
      });
    },
  }); 



  export const {HandleClearQuestion ,HandleCollectQuesAns,HandleGetAnswers ,HandleServiceId} = GetQuestionnaireSlicer.actions;
export default GetQuestionnaireSlicer.reducer;