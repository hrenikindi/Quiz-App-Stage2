import React, { useRef, useState } from "react";
import "./Quiz.css";
import data from "../assets/data1.json";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuesiton] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        if (option_array[question.ans - 1].current) {
          option_array[question.ans - 1].current.classList.add("correct");
        }
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock == true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
      setIndex(++index);
      setQuesiton(data[index]);
      setLock(false);
    }
  };

  const prev = () => {
    if (lock === true && index > 0) {
      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct", "wrong");
        }
      });
      setIndex(index - 1);
      setQuesiton(data[index - 1]);
      setLock(false);
    }
  };

  const resetState = () => {
    setIndex(0);
    setQuesiton(data[0]);
    setScore(0);
    setLock(false);
  };

  const quitQuiz = () => {
    const quitConfirmed = window.confirm(
      "Are you sure you want to quit the quiz?"
    );
    if (quitConfirmed) {
      resetState();
    }
  };

  const reset = () => {
    resetState();
    setResult(false);
  };

  const percentage = ((score / data.length) * 100).toFixed(1);
  const attemptedQuestions = index + 1;
  const correctAnswers = score;
  const wrongAnswers = attemptedQuestions - correctAnswers;

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <div className="btn-group">
            <button onClick={next}>Next</button>
            <button onClick={prev}>Previous</button>
            <button onClick={quitQuiz}>Quit</button>
          </div>
          <div className="index">
            {index + 1}of {data.length} Questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length} questions ({percentage}%)
          </h2>
          <p>Total Number of Questions: {data.length}</p>
          <p>Total Number of Attempted Questions: {attemptedQuestions}</p>
          <p>Total Number of Correct Answers: {correctAnswers}</p>
          <p>Total Number of Wrong Answers: {wrongAnswers}</p>
          <button className="btn-group" onClick={reset}>
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
