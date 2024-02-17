
import React, { useState } from 'react';

const Forms = ({setcountt, setIsModalClose}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setcountt(0)
    setIsModalClose(false)

    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mt-">
         <div className='d-flex justify-content-center  text-uppercase '>

         <h3> Submit Your Response</h3>
         </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* First Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input required placeHolder="Enter Your First Name"
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input required placeHolder="Enter Your Last Name"
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input required placeHolder="Enter Your Email Address"
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Postal Code */}
        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">
            Postal Code
          </label>
          <input required placeHolder=" Enter Your Postal Code"
            type="text"
            className="form-control"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forms;
