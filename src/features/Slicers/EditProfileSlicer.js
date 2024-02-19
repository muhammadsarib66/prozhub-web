import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./Slicer";
import axios from "axios";
import { toast } from "react-toastify";


export const EditUserApi = createAsyncThunk(
  "prozhub/EditUser",

  async (user, { dispatch, state }) => {
    console.log(user, "change users detail");
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseUrl}users/edit-profile`,
        user,
        config
      );
      toast.success("User Updated");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(error.response.data.message);
      return error.response.data;
    }
  }
);

export const ChangePassApi = createAsyncThunk(
  "prozhub/ChangePass",  async (pass, { dispatch, state }) => {
    console.log(pass, "password Changed");
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseUrl}users/change-password`,
        pass,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response.data.message);
      return error.response.data;
    }
  }
);

export const AddImageApi = createAsyncThunk(
    "prozhub/AddImage",
    async (img, { dispatch, state }) => {
        console.log(img,'get img from input field')
      try {
        const formData = new FormData();
        formData.append('profile', img);

        const token = sessionStorage.getItem("token");
        const config = {
            
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${baseUrl}users/upload-profile`,
          formData,
          config
        );
        console.log(response.data);
        toast.success("Image Added");
        return response.data.data;
      } catch (error) {
        console.error(error.response.data.message);
        return error.response.data;
      }
    }
  );


// ADD IMAGE API

const initialState = {
  // getReqData : '',
  userNewValue: "",
  isLoading: false,
  IsError: false,
  isOpen: false,
    ProfileImg :""
};

const EdiprofileSlicer = createSlice({
  name: "EditProfile",
  initialState,
  reducers: {
    PassOpenModal: (state, action) => {
      state.isOpen = true;
    },
    PassCloseModal: (state, action) => {
      state.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    // for Imgae Add

    builder.addCase(AddImageApi.pending, (state,action)=>{
        state.isLoading = true;
        console.log("Image Adding");
    });
    builder.addCase(AddImageApi.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.ProfileImg = action.payload;
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        console.log(action.payload)
        console.log("Image Added");
    }
    );
    builder.addCase(AddImageApi.rejected, (state,action)=>{
        state.isLoading = false;
        state.IsError = true;
        console.log("Image Add Failed");
    }
    );

    /// for edit user
    builder.addCase(EditUserApi.pending, (state, action) => {
      state.isLoading = true;
      console.log("User Updating");
    });
    builder.addCase(EditUserApi.fulfilled, (state, action) => {
      state.isLoading = false;
      sessionStorage.removeItem("user");

      sessionStorage.setItem("user", JSON.stringify(action.payload));
      console.log(action.payload);
      state.userNewValue = action.payload;

      console.log("User Updated", state.userNewValue);
    });
    builder.addCase(EditUserApi.rejected, (state, action) => {
      state.isLoading = false;
      state.IsError = true;
      console.log("User Update Failed");
    });
    // for change password

    builder.addCase(ChangePassApi.pending, (state, action) => {
      state.isLoading = true;
      console.log("Password Changing");
    });
    builder.addCase(ChangePassApi.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.message === "Invalid old password") {
        toast.error(action.payload.message);
        // ("Password Changed");}
      } else {
        state.isOpen = false;
        toast.success(action.payload.message);
      }
    });
    builder.addCase(ChangePassApi.rejected, (state, action) => {
      state.isLoading = false;
      state.IsError = true;
      console.log("Password Change Failed");
    });
  },
});

export const { PassOpenModal, PassCloseModal } = EdiprofileSlicer.actions;
export default EdiprofileSlicer.reducer;
