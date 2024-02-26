import React from "react";
import aboutImg from "../../images/aboutUs.jpg";
const AboutUs = () => {
  return (
    <div className="container my-10 md:my-20 px-4">
      <div className="col-sm-12">
        <div className="explore-details  mb-12">
          <h1 id='about' className="text-center font-bold text-4xl">About Us</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 space-x-5 md:grid-cols-2  h-fit  sm:h-screen ">
        <div className="grid-cols-1 bg-slate-50 rounded-lg px-4  md:pt-20 ">
          <div data-aos="fade-down-right" className="flex flex-col justify-center  items-center  gap-2  py-3 md:p-5">
            <h2 className=" text-2xl font-bold md:pb-10 md:px-5 ">
              Our Dream is Global Learning Transformation
            </h2>
            <p className="text-base md:px-5 md:tracking-wider md:leading-6 md:text-justify max-h-96 overflow-y-scroll ">
              At ProzHub, we are dedicated to providing multiple service to the client 
              that are ease the People Life. Our
              team is passionate about [describe what your team is passionate
              about, e.g., delivering exceptional service, innovating new
              solutions, etc.]. Founded in [year founded], we have been serving
              our valued customers for [number of years] years. Throughout our
              journey, we have [highlight any significant achievements,
              milestones, or growth]. Our commitment to excellence is reflected
              in everything we do. From our [describe any unique aspects of your
              products or services] to our exceptional customer service, we
              strive to exceed expectations and deliver exceptional value to our
              customers.
            </p>
          </div>
        </div>
        <div className="grid-cols-1  flex flex-col rounded-lg ">
            <img  className="object-contain   rounded-lg" src={aboutImg} alt="about" />
         
          <div className=" grid grid-cols-2 gap-4 pt-10">
          {[1,2,3,4].map((item)=> <div className="bg-slate-50 rounded-xl  flex flex-col  p-4 ">
                <h2 className="font-bold">
                    3.5  </h2>
                    <p>
                    Years of Working
                    </p>

                </div>
          )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
