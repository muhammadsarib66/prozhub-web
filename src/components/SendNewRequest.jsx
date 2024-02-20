import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { handleCloseFinalReq } from '../features/Slicers/SearchSeviceSlicer';
import {  toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import { NewRequestApi } from '../features/Slicers/NewRequestSlicer';
import Loading from '../screens/Loading';

function SendNewRequest() {
  const navigate = useNavigate() 
  const dispatch = useDispatch()
  const Token =sessionStorage.getItem("token");
  const userLoggedString = sessionStorage.getItem("user");
  let _id = null;
  const { FinalReqModel  } = useSelector(
    (state) => state.SearchSeviceSlicer
  );
  const {questionnaire ,serviceId} = useSelector(state =>state.GetQuestionnaireSlicer)
  
  const [postalCode, setPostalCode] = useState("");
 const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    
    const trimmedValue = e.target.value.trim(); // Trim spaces from input value
    setPostalCode(trimmedValue);
  };

  if (Token) {
    const user = JSON.parse(userLoggedString);
    _id = user?._id;
  } else {
    console.log("No user found"); // or handle the absence of user id accordingly
  }
  const HandleCreateRequeste = ()=>{
    if(Token){

      const sendData = {clientId :  _id ,postalCode,  serviceId, questionnaire }
        // console.log(sendData)
      dispatch(NewRequestApi(sendData));
      setIsLoading(true)

      // toast.success("Request Create Successfully")
      setTimeout(() => {
      setIsLoading(false)
        dispatch(handleCloseFinalReq());
        // navigate("/");
      }, 2000);
    }
    else{

      toast.error("Please Login First");
      setIsLoading(true)
      // Delay navigation to the login page after 2 seconds
      setTimeout(() => {
        dispatch(handleCloseFinalReq());
        setIsLoading(false)
        navigate("/login");
      }, 2000);
    }
  }  
  const handleClose = () => dispatch(handleCloseFinalReq());

  return (
    <>
        <Modal show={FinalReqModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

        <div class="mb-3">
  <label htmlFor="postalcode" class="form-label">Add Postal Code</label>
  <input onChange={handleChange} type="text" class="form-control"  placeholder="Enter Your Postal Code" />
  <div  class="form-text">We'll never securely save your detail</div>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleCreateRequeste}>
            Create Request
          </Button>
        </Modal.Footer>
     
    {isLoading && <Loading/> }

      </Modal>
    </>
  );
}

export default SendNewRequest;