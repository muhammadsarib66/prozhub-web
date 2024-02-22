import React from "react";
import contact from "../images/contact1.png";
const ContactUs = () => {
  return (
    <div id="contact" className="container rounded-lg my-10 md:my-20 p-5 min-h-[80vh] bg-slate-50   ">
      <div className="grid grid-cols-1 md:grid-cols-2  ">
        <div className="max-w-md mx-auto ">
          <h1 className="md:hidden  font-bold">
            {" "}
            Contact <span className="text-[#051357]"> Us </span>{" "}
          </h1>
          <form className="grid grid-cols-1 gap-4 pt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 h-8 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-md font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 h-8 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 focus:ring-indigo-500 bg-white focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 h-8 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-md font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="px-4 flex flex-col gap-4 pt-20 md:pt-0">
          <h1 className="hidden md:block  font-bold">
            {" "}
            Contact <span className="text-[#051357]"> Us </span>{" "}
          </h1>
          <p>
            We're thrilled that you've chosen to reach out to us. Please take a
            moment to fill out the form below with your details and your
            message. Our team will get back to you as soon as possible.
          </p>
          <div>
            <img src={contact} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
