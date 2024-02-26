import React, { useState } from "react";
import {
  GetMyRequestApi,
  setFilterData,
  setSingleRequest,
} from "../features/Slicers/MyRequestSlicer";
import { useDispatch, useSelector } from "react-redux";
import "./MyRequest.css";
import Loading from "./Loading";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CloseReqApi } from "../features/Slicers/CloseRequestSlicer";
import { MdHomeRepairService } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

const RequestService = () => {
  const { isLoading, MyRequestsDetail, SingleReqObj, FilterData } = useSelector(
    (state) => state.MyRequestSlicer
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [reqid, setReqId] = useState("");
  const [reason, setCloseReqReason] = useState("");
  const [ActiveCard, setActiveCard] = useState("0");
  const [selectedValue, setSelectedValue] = useState("All");
  let ActiveReq = [];
  let CloseReq = [];

  MyRequestsDetail &&
    MyRequestsDetail?.map((item) => {
      if (item.requestStatus === "Active") {
        ActiveReq.push(item);
        return item;
      } else if (item.requestStatus === "Closed") {
        CloseReq.push(item);
        return item;
      }
    });

  const handleViewRequest = (item, ind) => {
    setActiveCard(ind);
    dispatch(setSingleRequest(item));
  };

  const handleCloseRequest = (e) => {
    setIsOpen(true);
    setReqId(e);
  };
  const handleClose = () => setIsOpen(false);

  const RequestClosed = () => {
    const obj = { requestId: reqid, reason };
    dispatch(CloseReqApi(obj));
    setIsOpen(false);
    setCloseReqReason("");

    setTimeout(() => {
      dispatch(GetMyRequestApi());
    }, 1000);
  };
  const [isOpen11, setIsOpen11] = useState(false);

  const toggleDropdown = () => {
    setIsOpen11(!isOpen11);
  };

  const handleItemClick = (value) => {
    dispatch(setFilterData(value));

    setSelectedValue(value);
    setIsOpen11(!isOpen11); // Update the state with the selected value
  };

  return (
    <div className="container-fluid h-full m-0">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="RequestContainer   ">
          {!SingleReqObj && (
            <div className=" flex justify-center items-center h-[70vh]">
              <h2 className="capitalize font-bold text-blue-950 border-b-2 border-blue-950">
                {" "}
                Dont have any request
              </h2>
            </div>
          )}
          {SingleReqObj && (
            <div
              data-aos="zoom-out-up"
              className=" grid grid-cols-1 md:grid-cols-4   "
            >
              <div className="   CardBox shadow-md  overflow-hidden    rounded-md bg-slate-100  ">
                <div className="p-2 bg-blue-950 min-h-20 flex flex-col gap-3 text-white ">
                  <p className="text-2xl   font-bold flex items-center gap-2">
                    {" "}
                    <MdHomeRepairService /> My Requests{" "}
                    {MyRequestsDetail && MyRequestsDetail?.length}{" "}
                  </p>
                  <div className="flex  justify-around items-center">
                    <div className="text-xs text-gray-600 flex flex-row md:flex-col lg:flex-row gap-2 ">
                      <p className="bg-green-300 px-2 py-1 rounded-lg w-fit">
                        active requests {ActiveReq?.length}
                      </p>
                      <p className="bg-red-300 px-2 py-1 rounded-lg w-fit">
                        closed requests {CloseReq?.length}
                      </p>
                    </div>
                    <div className="relative inline-block text-left">
                      <div
                        onClick={toggleDropdown}
                        className="cursor-pointer inline-flex justify-center items-center gap-x-1.5 rounded-full bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                      >
                        <IoFilterSharp />
                        <span> {selectedValue} </span>
                        <svg
                          className={`h-5 w-5 ${
                            isOpen11 ? "transform rotate-180" : ""
                          } text-gray-400`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {isOpen11 && (
                        <div className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1 ">
                            <p
                              onClick={() => handleItemClick("All")}
                              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              All
                            </p>
                            <p
                              onClick={() => handleItemClick("Active")}
                              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Active
                            </p>
                            <p
                              onClick={() => handleItemClick("Closed")}
                              className="block  cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Closed
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="bg-slate-300 text-sm text-gray-600 py-2 px-3 mb-2 rounded-b-md">
                  <span className="pr-3">
                    <i class="fa-solid fa-wrench"></i>
                  </span>
                  Showing All {MyRequestsDetail && MyRequestsDetail?.length}{" "}
                  services.
                </p>
                <div className="mx-2  my-2 overflow-y-auto h-[80vh] myReqBox">
                  {FilterData &&
                    FilterData?.map((item, ind) => {
                      return (
                        <div
                          onClick={() => handleViewRequest(item, ind)}
                          key={item?.serviceId}
                          className={`
                        
                        ${ind == ActiveCard && "border-l-4 border-purple-800"}
                        
                        cursor-pointer  mb-4 min-w-full rounded-md flex gap-2  justify-around   bg-white shadow-md `}
                        >
                          <div className="flex flex-col  justify-center m-0">
                            <p className=" font-bold text-lg capitalize ">
                              {item?.serviceId?.serviceName}
                            </p>
                            <p className="text-gray-400">
                              {moment(item.createdOn).format("MMMM Do YYYY")}
                            </p>
                          </div>
                          <div className="flex gap-2  items-center">
                            {item?.requestStatus}

                            <div
                              className={` 
                        ${
                          item.requestStatus === "Active" &&
                          "bg-green-800 text-gray-800"
                        }
                        ${
                          item.requestStatus === "Hired" &&
                          "bg-green-700 text-green-800"
                        }
                        ${
                          item.requestStatus === "Closed" &&
                          "bg-red-800 text-red-800"
                        }
                        
                           rounded-full  h-4 w-4 `}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="md:col-span-3 DetailContainer   w-full">
                <div className="flex flex-col gap-3 pb-2">
                  <p className="text-xl capitalize font-bold">
                    User: {SingleReqObj?.clientId?.fullName}
                  </p>
                  <p className="text-xl capitalize font-semibold">
                    <span className="text-md pr-2">service: </span>{" "}
                    {SingleReqObj?.serviceId?.serviceName}{" "}
                  </p>
                  <p>
                    Postal Code : <span> ({SingleReqObj?.postalCode}) </span>
                  </p>

                  <p className="py-2 ">
                    <i className="fa-solid fa-phone-volume pr-2"></i>{" "}
                    {SingleReqObj?.clientId?.phoneNumber}{" "}
                    {SingleReqObj.clientId?.isActive ? (
                      <span className="text-xs text-green-400 bg-gray-200 px-2 rounded-md">
                        {" "}
                        <i class="fa-solid fa-check"></i> verified{" "}
                      </span>
                    ) : (
                      <span className="text-xs text-red-400 px-2 rounded-md bg-gray-300">
                        {" "}
                        <i class="fa-solid fa-exclamation-triangle"></i> Not
                        verified{" "}
                      </span>
                    )}
                  </p>
                  <p className="py-2">
                    <i class="fa-solid fa-envelope pr-2"></i>{" "}
                    {SingleReqObj?.clientId?.email}
                  </p>
                </div>
                <div className="flex gap-2 w-fit items-center border rounded p-3">
                  <span>
                    <span className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-5 ${
                            index < SingleReqObj?.bidBy
                              ? "bg-orange-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      ))}
                    </span>
                  </span>
                  {SingleReqObj?.bidBy}/5 professionals has responded{" "}
                  <i className="fa-solid text-yellow-700 fa-circle-exclamation"></i>
                </div>
                <div className="py-4 ">
                  {SingleReqObj?.questionnaire?.length > 0 ? (
                    <h4 className="uppercase font-bold"> given Questions </h4>
                  ) : (
                    <h4 className="uppercase font-bold">
                      {" "}
                      you Dont Have Questions{" "}
                    </h4>
                  )}
                  {SingleReqObj?.questionnaire?.map((item, ind) => {
                    return (
                      <div key={item.questionId} className="pt-2 border-b-2">
                        <p className="font-semibold  text-xl">
                          {" "}
                          Q:{ind + 1} {item.question}{" "}
                        </p>
                        <p>
                          <span className="font-semibold text-lg"> Ans: </span>{" "}
                          {item.answer}{" "}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {SingleReqObj?.requestStatus === "Active" && (
                  <div className="flex justify-center my-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCloseRequest(SingleReqObj?._id)}
                    >
                      {" "}
                      Close Request!
                    </button>
                  </div>
                )}
                <Modal show={isOpen} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Close Request Response </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="mb-3">
                      <label htmlFor="closeRequest" className="form-label">
                        reason to Close
                      </label>
                      <input
                        type="text"
                        name="closerequest"
                        value={reason}
                        onChange={(e) => setCloseReqReason(e.target.value)}
                        className="form-control"
                        id="phoneNumber"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={RequestClosed} variant="primary">
                      Close Request
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestService;
