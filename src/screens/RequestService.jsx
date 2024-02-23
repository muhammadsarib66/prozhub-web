import React, { useEffect, useState } from "react";
import { GetMyRequestApi } from "../features/Slicers/MyRequestSlicer";
import { useDispatch, useSelector } from "react-redux";
import "./MyRequest.css";
import Loading from "./Loading";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CloseReqApi } from "../features/Slicers/CloseRequestSlicer";
import { MdHomeRepairService } from "react-icons/md";

const RequestService = () => {
  const { isLoading, MyRequestsDetail, SingleReqObj } = useSelector(
    (state) => state.MyRequestSlicer
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [reqid, setReqId] = useState("");
  const [reason, setCloseReqReason] = useState("");
  const [ActiveCard, setActiveCard] = useState("0");
  const [SeeRequest, setSeeRequest] = useState(SingleReqObj);
  let ActiveReq = [];
  let CloseReq = [];
  const ActReq = MyRequestsDetail && MyRequestsDetail?.map((item) => {
    if (item.requestStatus === "Active") {
      ActiveReq.push(item);
      return item;
    } else if (item.requestStatus === "Closed") {
      CloseReq.push(item);
      return item;
    }
  });
  // console.log(ActiveReq , CloseReq)
  const handleViewRequest = (item, ind) => {
    setActiveCard(ind);

    setSeeRequest(item);
    console.log(item);
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
  useEffect(() => {
    dispatch(GetMyRequestApi());
  }, [dispatch]);
  return (
    <div className="container-fluid h-full m-0">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="RequestContainer  ">
          {!SingleReqObj && <h2> Dont have any request</h2>}
          {SingleReqObj && (
            <div className="grid grid-cols-1 md:grid-cols-4   ">
              <div className="   CardBox shadow-md max-h-[90vh] overflow-hidden    rounded-md bg-slate-100  ">
                <div className="p-2 bg-blue-950 min-h-20 text-white ">
                  <p className="text-2xl   font-bold flex items-center gap-2">
                    {" "}
                    <MdHomeRepairService /> My Requests{" "}
                    {MyRequestsDetail && MyRequestsDetail?.length}{" "}
                  </p>
                  <div className="text-xs text-gray-600 flex gap-2 py-2">
                    <p className="bg-green-300 px-2 py-1 rounded-full w-fit">
                      active requests {ActiveReq?.length}
                    </p>
                    <p className="bg-red-300 px-2 py-1 rounded-full w-fit">
                      closed requests {CloseReq?.length}
                    </p>
                  </div>
                </div>
                <p className="bg-slate-300 text-sm text-gray-600 py-2 px-3 mb-2 rounded-b-md">
                  <span className="pr-3">
                    {/* <i class="fa-solid fa-server"></i> */}
                    <i class="fa-solid fa-wrench"></i>
                  </span>
                  Showing All {MyRequestsDetail && MyRequestsDetail?.length}{" "}
                  services.
                </p>
                <div className="mx-2 my-2 overflow-y-auto h-[80vh] myReqBox">
                  {MyRequestsDetail &&
                    MyRequestsDetail?.map((item, ind) => {
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
                          >
                          </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="md:col-span-3 DetailContainer   w-full">
                <p className="text-xl capitalize font-bold">
                  {SeeRequest?.clientId?.fullName}
                </p>
                <p className="text-xl capitalize font-semibold">
                  <span className="text-md pr-2">service: </span>{" "}
                  {SeeRequest?.serviceId?.serviceName}{" "}
                </p>
                <p>
                  Postal Code : <span> ({SeeRequest?.postalCode}) </span>
                </p>

                <p className="py-2 ">
                  <i className="fa-solid fa-phone-volume text-2xl"></i>{" "}
                  {SeeRequest?.clientId?.phoneNumber}{" "}
                  {SeeRequest.clientId?.isActive ? (
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
                  <i class="fa-solid fa-envelope text-2xl"></i>{" "}
                  {SeeRequest?.clientId?.email}
                </p>

                <div className="flex gap-2 w-fit items-center border rounded p-3">
                  <span>
                    <span className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-5 ${
                            index < SeeRequest?.bidBy
                              ? "bg-orange-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      ))}
                    </span>
                  </span>
                  {SeeRequest?.bidBy}/5 professionals has responded{" "}
                  <i className="fa-solid text-gray-300 fa-circle-exclamation"></i>
                </div>
                <div className="py-4 ">
                  {SeeRequest?.questionnaire?.length > 0 ? (
                    <h4 className="uppercase font-bold"> given Questions </h4>
                  ) : (
                    <h4 className="uppercase font-bold">
                      {" "}
                      you Dont Have Questions{" "}
                    </h4>
                  )}
                  {SeeRequest?.questionnaire?.map((item,ind) => {
                    return (
                      <div key={item.questionId} className="pt-2 border-b-2">
                        <p className="font-semibold  text-xl">
                          {" "}
                          Q:{ind+1} {item.question}{" "}
                        </p>
                        <p>
                          <span className="font-semibold text-lg"> Ans: </span>{" "}
                          {item.answer}{" "}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {SeeRequest?.requestStatus === "Active" && (
                  <div className="flex justify-center my-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCloseRequest(SeeRequest?._id)}
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
