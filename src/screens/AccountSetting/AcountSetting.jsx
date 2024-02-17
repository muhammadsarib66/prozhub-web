import React, { useState } from "react";
import "./acount.css";
const AcountSetting = () => {
      
  const [name, setName] = useState('Prozhub');
  const [email, setEmail] = useState('prozhub@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('0900031031');
  const [newImg, setNewImg] = useState('');  
  const [editBtn , setEditBtn] = useState(false)
console.log(newImg)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };
  return (
    <div className="container mainCOntainer">

      
    <div className="main-screen container m-10  ">
       <div className="container mt-5">
      <h2 className="mb-4">Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 form">
          <label htmlFor="name" className="form-label">Name</label>
          <input disabled={!editBtn}  type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" disabled={!editBtn}  className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="text" disabled={!editBtn}  className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">Change Profile Image</label>
          <input  disabled={!editBtn} onChange={(e)=>setNewImg(e.target.files[0])} accept="image/*"  type="file" className="form-control" id="profileImage" />
        </div>
          {newImg &&
        <div className="mb-3 ImgChanger">
          <label htmlFor="profileImage" className="form-label">New Image</label>
          <img src={URL.createObjectURL(newImg)} alt="profile" />
          </div>
          }
          <div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button onClick={()=>setEditBtn(true)} type="submit" className="m-1 btn btn-secondary">Edit Changes</button>
          </div>
      </form>
    </div>
    </div>
    </div>

  );
};

export default AcountSetting;
