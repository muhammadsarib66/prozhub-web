import React, { useEffect, useState } from "react";
import { GetMyRequestApi } from "../features/Slicers/MyRequestSlicer";
import { useDispatch, useSelector } from "react-redux";
import "./MyRequest.css";
import Loading from "./Loading";
import moment from "moment";
// import { Modal } from "bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RequestService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, MyRequestsDetail , SingleReqObj } = useSelector(
    (state) => state.MyRequestSlicer
  );
  const {getReqData}  = useSelector(item =>item.NewRequestSlicer)
  // eslint-disable-next-line no-unused-vars
  const [SeeRequest, setSeeRequest] = useState([]);
  const handleViewRequest = (item) => {
    setSeeRequest(item);
    console.log(item);
  };

  const handleCloseRequest=(e)=>{
    setIsOpen(true)
    console.log(e)
  }

  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    setSeeRequest(SingleReqObj);
    if (MyRequestsDetail.length > 0) {
      setSeeRequest(MyRequestsDetail[0]);
    }
    else{
      setSeeRequest(getReqData)
    }
    dispatch(GetMyRequestApi());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="container-fluid  ">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="RequestContainer  container pt-5">
          <div className=" row">
            <div className="col-sm-6">
              <h4>My Reequest</h4>
            </div>
            <div className="col-sm-6 pb-3 ">
              {" "}
              <button className=" float-right btn btn-primary">
                Create Request
              </button>
            </div>
          </div>
          {!SingleReqObj && <h2> Dont have any request</h2>}
          {SingleReqObj &&
          <div className="row   ">
            <div className=" col-sm-4  CardBox  max-h-[90vh] overflow-y-scroll py-2 px-4 rounded-md bg-[#edeef1] ">
              {MyRequestsDetail &&
                MyRequestsDetail.map((item) => {
                  return (
                    <div className="mb-4 min-w-full rounded-md flex gap-2 flex-col justify-center items-center  bg-white shadow-md p-4">
                      <div className="flex flex-col items-center justify-center m-0">
                        <p className=" font-bold text-lg capitalize ">
                          {item?.serviceId?.serviceName}
                        </p>
                        <p className="text-gray-400">
                          {moment(item.createdOn).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <div
                        className={`min-w-fit px-4
                        ${
                          item.requestStatus === "Active" &&
                          "bg-gray-200 text-gray-800"
                        }
                        ${
                          item.requestStatus === "Hired" &&
                          "bg-green-200 text-green-800"
                        }
                        ${
                          item.requestStatus === "Closed" &&
                          "bg-red-200 text-red-800"
                        }
                        
                           rounded-md font-semibold p-[12px] text-center text-sm`}
                      >
                        {item.requestStatus}
                      </div>
                      <div>
                        <button
                          onClick={() => handleViewRequest(item)}
                          className="btn btn-primary"
                        >
                          View Request
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="col-sm-8 DetailContainer   w-full">
             
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
              <div className="py-2 ">
                {SeeRequest?.questionnaire?.length > 0 && (
                  <h4 className="uppercase font-bold"> given Questions </h4>
                )}
                {SeeRequest?.questionnaire?.map((item) => {
                  console.log(item.question);
                  return (
                    <div className="pt-2 border-b-2">
                      <p className="font-semibold  text-xl">
                        {" "}
                        Q: {item.question}{" "}
                      </p>
                      <p>
                        <span className="font-semibold text-lg"> Ans: </span>{" "}
                        {item.answer}{" "}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center my-4" >
                <button  className="btn btn-danger" onClick={()=>handleCloseRequest(SeeRequest?._id)}> Close Request!</button>
            </div>
            <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Close Request Response </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="OldPassword" className="form-label">
            reason to Close
          </label>
          <input
            type="text"
            name="oldPassword"
            // value={oldPassword}
            // onChange={(e) =>  setOldPassword(e.target.value) }
            className="form-control"
            id="phoneNumber"
          />
        </div>
       
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" >
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
            </div>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default RequestService;
