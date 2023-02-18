import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { SECONDARY_COLOR } from "../../constants/colors";
import QuizOption from "../buttons/QuizOption";
import Loader from "../spinners/BeatLoader";
import PanelTemplate from "./PanelTemplate";

const duration = 100000;
const transitionStyles = {
  entering: { width: 100 },
  entered: { width: 100 },
  exiting: { width: 0 },
  exited: { width: 0 },
};

export default function QuizPanel({
  clearQuiz = () => {},
  visible,
  quiz,
  loading,
}) {
  const nodeRef = useRef();
  const [selected, setSelected] = useState("");
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    setBarWidth(100);
    setSelected("");
    const to = setTimeout(() => {
      clearQuiz();
    }, 100000);
    return () => clearTimeout(to);
  }, [quiz]);
  const quizDuration = 100000;
  useEffect(() => {
    // post data depending on whether answer is right
  }, [selected]);
  return (
    <PanelTemplate
      headerText="comprehension check"
      visible={visible}
      fontColor={SECONDARY_COLOR[500]}
      borderColor={SECONDARY_COLOR[500]}
    >
      <div className="h-full">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="mt-16 space-y-4 relative">
            <h1 className="text-white text-lg">{quiz.question}</h1>
            <QuizOption
              value="A"
              isSelected={selected === "A"}
              isCorrect={quiz.answer === 1}
              isResults={selected !== ""}
              //   isResults
              setSelected={setSelected}
            >
              {quiz.choice1}
            </QuizOption>
            <QuizOption
              value="B"
              isSelected={selected === "B"}
              // isSelected
              // isResults
              isCorrect={quiz.answer === 2}
              isResults={selected !== ""}
              setSelected={setSelected}
            >
              {quiz.choice2}
            </QuizOption>
            <QuizOption
              value="C"
              isSelected={selected === "C"}
              isCorrect={quiz.answer === 3}
              isResults={selected !== ""}
              setSelected={setSelected}
            >
              {quiz.choice3}
            </QuizOption>
            <QuizOption
              value="D"
              isSelected={selected === "D"}
              isCorrect={quiz.answer === 4}
              isResults={selected !== ""}
              setSelected={setSelected}
            >
              {quiz.choice4}
            </QuizOption>

            <div className="absolute botttom-0 bg-indigo-500 h-2 w-full">
              <Transition
                nodeRef={nodeRef}
                in={barWidth === 100}
                timeout={duration}
                appear
              >
                {(state) => (
                  <div
                    className="bg-indigo-300 h-2 transition-all duration-1000"
                    style={{
                      width: transitionStyles[state].width + "%",
                    }}
                  />
                )}
              </Transition>
            </div>
          </div>
        )}
      </div>
    </PanelTemplate>
  );
}
