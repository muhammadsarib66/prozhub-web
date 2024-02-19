import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangePassApi, PassCloseModal } from "../../features/Slicers/EditProfileSlicer";
import { toast } from "react-toastify";
// import { BsLock } from 'react-icons';

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
  const { isOpen } = useSelector((state) => state.EditProfileSlicer);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(PassCloseModal());
  };
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//   };

  const HandleChangePass = () => {
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      return toast.error("Please fill all the fields");
    } else {
      if (newPassword !== confirmNewPassword) {
        return toast.error("Password does not match");
      }
      if (newPassword.length  > 5 || confirmNewPassword.length >5 ) {
        return toast.error("Password must be 5 characters long");
      }
      const pass = { oldPassword, newPassword };
      dispatch(ChangePassApi(pass));
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Your Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="OldPassword" className="form-label">
            Old Password
          </label>
          <input
            type="text"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) =>  setOldPassword(e.target.value)
            }
            className="form-control"
            id="phoneNumber"
          />
        </div>
    <div className="mb-3 ">
      <label htmlFor="NewPassword" className="form-label">
        New Password
      </label>
      <div className="input-group ">
        <input
          type={showPass ? "text" : "password" }
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className=" form-control"
          id="phoneNumber"
        />
        <span onClick={()=>setShowPass(!showPass)} className="input-group-text">
          <i class={`fa-solid  ${showPass ? 'fa-eye-slash': "fa-eye" }`}></i>
        </span>
      </div>
    </div>
    <div className="mb-3 ">
      <label htmlFor="ConfirmNewPassword" className="form-label">
      Confirm New Password
      </label>
      <div className="input-group ">
        <input
          type={showPass ? "text" : "password" }
          name="confirmNewPass"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className=" form-control"
        />
        <span onClick={()=>setShowPass(!showPass)} className="input-group-text">
          <i class={`fa-solid  ${showPass ? 'fa-eye-slash': "fa-eye" }`}></i>
        </span>
      </div>
    </div>
        {/* <div className="mb-3">
          <label htmlFor="ConfirmNewPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="text"
            name="confirmNewPass"
            value={confirmNewPassword}
            onChange={(e)=> setConfirmNewPassword(e.target.value)}
            className="form-control"
          />
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={HandleChangePass}>
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePass;
