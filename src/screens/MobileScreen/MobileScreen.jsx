import React from "react";
import AppLogo from "../../images/Appdesign.png";
import Apple from "../../images/appleLogo.png";
import Google from "../../images/playStoreLogo.png";

const MobileScreen = () => {
  return (
    <div className="container  md:my-20 px-4">
      <div className="grid grid-cols-1  space-y-7 md:grid-cols-2 min-h-96 md:h-screen">
        <div className="grid-cols-1 flex flex-col pt-36">
          <div data-aos="fade-right" className="text-[#051353] flex flex-col gap-3">
            <span>
              <p className="capitalize text-2xl md:text-4xl font-bold text-[#051353] ">
                {/* Buy without lifting a fin   ger. */}
                Transform Your Life: Download Our Multi-Service App Today!
              </p>
              <p className="font-bold text-black text-base md:text-lg ">
                Download And Create account Free
              </p>
            </span>
            <p className="">
              With a sleek and intuitive interface, our app offers a seamless
              user experience that caters to your every need. Discover a wide
              range of features designed to enhance your productivity, unleash
              your creativity, and elevate your digital experience to new
              heights.
            </p>
          </div>

          <div className="pt-10">
            {/* <div className="cursor-pointer bg-blue-950 text-blue-50 w-fit flex items-center gap-4 py-2 px-3 rounded-full"  >
                    Download the App 
                    <span>
                    <i className="text-xl fa-regular fa-circle-down"></i>
                    </span>
                </div> */}
            <span className="flex justify-center items-center md:items-start flex-col    gap-4 md:pt-5 ">

              <h3 className="">
                Download the App
                <span className="ml-4 text-base">


                <i class="fa-solid fa-arrow-down"></i>
                </span>
              </h3>
              <span className="flex flex-col md:flex-row gap-4 justify-center">
                <img className="cursor-pointer w-40" src={Apple} alt="" />
                <img className="cursor-pointer w-40" src={Google} alt="" />
              </span>
            </span>
          </div>
        </div>
        <div className="grid-cols-1  flex items-center justify-center">
          <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="w-52 md:w-72 ">
            <img src={AppLogo} alt="phone logo " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileScreen;
