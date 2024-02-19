import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../screens/Loading";
import "./acount.css";
import {
  AddImageApi,
  ChangePassApi,
  EditUserApi,
  PassOpenModal,
} from "../../features/Slicers/EditProfileSlicer";
import { toast } from "react-toastify";
import ChangePass from "./ChangePass";

const AcountSetting = () => {
  const { isLoading } = useSelector((state) => state.EditProfileSlicer);
  const dispatch = useDispatch();
  const User = sessionStorage.getItem("user");
  const storedUserObject = JSON.parse(User);
  const [editName, setEditName] = useState(storedUserObject?.fullName);
  const [editPhone, setEditphone] = useState(storedUserObject?.phoneNumber);
  const [newImg, setNewImg] = useState("");
  const [editBtn, setEditBtn] = useState(true);
  const handleSubmit = (e) => {
    // dispatch(ChangePassApi(newImg))

    if (editName === "" || editPhone === "") {
      return toast.error("Please fill all the fields");
    } else {
      if (editPhone.length < 10)
        return toast.error("Phone Number must be 10 digits");
      const user = { fullName: editName, phoneNumber: editPhone };
      dispatch(EditUserApi(user));
    }
  };
  const HandleAddImg = ()=>{
    if(newImg){
      dispatch(AddImageApi(newImg))
    }
  }
  return (
    <div className="container mainCOntainer">
      <div
        className="formDiv main-screen container m-10  "
      >
        <div className="container  mt-5">
          <h2 className="mb-4">Account Settings</h2>
          <div>
            <div className="    mb-3 form">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                disabled={editBtn}
                type="text"
                className="form-control"
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                disabled
                className="form-control"
                id="email"
                value={storedUserObject?.email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                disabled={editBtn}
                className="form-control"
                id="phoneNumber"
                value={editPhone}
                onChange={(e) => {
                  let inputValue = e.target.value;
                  // Remove any non-numeric characters
                  let sanitizedValue = inputValue.replace(/\D/g, "");
                  setEditphone(sanitizedValue);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                Change Profile Image
              </label>
              <input
                disabled={editBtn}
                onChange={(e) => {
                  const file = e.target.files[0]; // Get the uploaded file
                  setNewImg(file)
                }}
                accept="image/*"
                type="file"
                className="form-control"
                id="profileImage"
              />
            </div>
            {newImg && (
              <div className="mb-3 ImgChanger">
                <label htmlFor="profileImage" className="form-label">
                  New Image
                </label>
                <img src={URL.createObjectURL(newImg)} alt="profile" />
              </div>
            )}
            <div className=" flex justify-end">
              <p
                onClick={() => dispatch(PassOpenModal())}
                className="cursor-pointer text-blue-900 underline"
              >
                {" "}
                Change Password
              </p>
            </div>
            <ChangePass />
            <div>
              <button onClick={handleSubmit} className="btn btn-primary">
                Save Changes
              </button>
              <button
                onClick={() => setEditBtn(false)}
                className="m-1 btn btn-secondary"
              >
                Edit Changes
              </button>
              <button
                onClick={HandleAddImg}
          
                className="m-1 btn btn-info"
              >
                upload Img
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default AcountSetting;
