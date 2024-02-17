import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../Slicers/Slicer";
import SearchSeviceSlicer from "../Slicers/SearchSeviceSlicer";
import LoginSlicer from "../Slicers/LoginSlicer";
import GetQuestionnaireSlicer from "../Slicers/GetQuestionnaireSlicer";
import NewRequestSlicer from "../Slicers/NewRequestSlicer";
import MyRequestSlicer from "../Slicers/MyRequestSlicer";

export const store = configureStore({
  reducer: {
    Slicer,
    SearchSeviceSlicer,
    LoginSlicer,
    GetQuestionnaireSlicer,
    NewRequestSlicer,
    MyRequestSlicer
  },
});
