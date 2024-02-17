// import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {  useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  handleCloseModal,
  handleOpenFinalReq,
} from "../features/Slicers/SearchSeviceSlicer";
import {
  HandleClearQuestion,
  HandleGetAnswers,
  HandleServiceId,
} from "../features/Slicers/GetQuestionnaireSlicer";
function RequestServiceModal() {
  const dispatch = useDispatch();
  const { NewReqModalOpen, NewRequest } = useSelector(
    (state) => state.SearchSeviceSlicer
  );
  const { getQuestions } = useSelector((state) => state.GetQuestionnaireSlicer);
  const serviceID = NewRequest?._id ?? 0;

  // const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleClose = () => {
    dispatch(handleCloseModal());
    // setSelectedAnswer("");
    setCurrentQuestionIndex(0);
  };
  dispatch(HandleClearQuestion());

  const handleAnswerChange = (e, id, questionId ,ques) => {
    console.log( ques)
    const newAnswer = { questionId, answerId: id, answer: e.target.value, question: ques};
    setSelectedAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingIndex !== -1) {
        // Update existing answer if questionId already exists
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      } else {
        // Add new answer if questionId doesn't exist
        return [...prevAnswers, newAnswer];
      }
    });
    // setSelectedAnswer(e.target.value);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, getQuestions.length - 1)
    );
  };

  const HandleSubmit = () => {
    // setNewReqData({ serviceId: serviceID, questionnaire: selectedAnswers });
    // const questss =   selectedAnswers 
    console.log({questionaire: selectedAnswers ,sevideId: serviceID})
    dispatch(HandleGetAnswers(selectedAnswers ))
    dispatch(HandleServiceId(serviceID))
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    dispatch(handleCloseModal());
    dispatch(handleOpenFinalReq());
  };

  
  return (
    <>
      <Modal show={NewReqModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {NewRequest.serviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>
                Q{currentQuestionIndex + 1}:
                {getQuestions[currentQuestionIndex]?.question}
              </h5>
              <h6> Answers :</h6>
              <p>
                {getQuestions[currentQuestionIndex]?.answers.map(
                  (ans, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="radio"
                          name={`answer-${ans.questionId}`}
                          id={`answer-${ans?._id}`}
                          onChange={(e) =>
                            handleAnswerChange(e, ans?._id, ans?.questionId ,getQuestions[currentQuestionIndex]?.question)
                          }
                          value={ans?.answer}
                          checked={selectedAnswers.some(
                            (answer) =>
                              answer.questionId === ans.questionId &&
                              answer.answerId === ans._id
                          )}
                        />
                        <label htmlFor={`answer-${ans.questionId}`}>
                          {ans.answer}
                        </label>
                      </div>
                    );
                  }
                )}
              </p>
            </div>
          </div>
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Prev
          </Button>
          {currentQuestionIndex === getQuestions.length - 1 ? (
            <>
              <Button variant="primary" onClick={HandleSubmit}>
                Submit
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentQuestionIndex === getQuestions.length - 1}
            >
              Next
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestServiceModal;
