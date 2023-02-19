import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import PollOption from "../buttons/PollOption";
import QuizOption from "../buttons/QuizOption";
import { socket } from "../SpeechToTextProcess";
import Loader from "../spinners/BeatLoader";
import PanelTemplate from "./PanelTemplate";

const duration = 15000;

export const AVAILABLE_POLLS = {
  speed: {
    question: "How is the speed of the lecture?",
    choice1: "Too fast!",
    choice2: "Just right.",
    choice3: "A bit slow.",
  },
};

export default function PollPanel({
  clearQuiz = () => {},
  visible,
  quiz,
  loading,
}) {
  const [selected, setSelected] = useState("");
  const [barWidth, setBarWidth] = useState(0);
  const [cnts, setCnts] = useState([0, 0, 0]);
  const pcts = useMemo(() => {
    const sum = cnts.reduce((a, b) => a + b, 0);
    // console.log(cnts.map((c) => (sum === 0 ? 0 : c / sum)));
    return cnts.map((c) => c / sum);
  }, [cnts]);
  const cb = useCallback(
    (data) => {
      // pass to socket.on
      const nc = cnts.slice(0);
      const d = { A: 0, B: 1, C: 2 };
      nc[d[data.id]]++;
      setCnts(nc);
    },
    [cnts, setCnts]
  );
  useEffect(() => {
    socket.on("poll_answer", cb);
  }, [cb]);
  useEffect(() => {
    setBarWidth(100);
    setSelected("");
    setCnts([0, 0, 0]);
    const to = setTimeout(() => {
      clearQuiz();
    }, duration);
    return () => clearTimeout(to);
  }, [quiz]);
  function setSelectedOption(option) {
    setSelected(option);
    cb({ id: option });
  }
  useEffect(() => {
    // post data depending on whether answer is right
    // socket.emit
    if (selected !== "") socket.emit("poll_answer", { id: selected });
  }, [selected]);
  return (
    <PanelTemplate
      headerText="comprehension check"
      visible={visible}
      fontColor={PRIMARY_COLOR[500]}
      borderColor={PRIMARY_COLOR[500]}
    >
      <div className={"h-full relative"}>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color={PRIMARY_COLOR[500]} />
          </div>
        ) : (
          <div className="mt-16 space-y-4 relative">
            <h1 className="text-white text-lg">{quiz.question}</h1>
            <PollOption
              value="A"
              isSelected={selected === "A"}
              isResults={selected !== ""}
              setSelected={setSelectedOption}
              pct={pcts[0]}
            >
              {quiz.choice1}
            </PollOption>
            <PollOption
              value="B"
              isSelected={selected === "B"}
              isResults={selected !== ""}
              setSelected={setSelectedOption}
              pct={pcts[1]}
            >
              {quiz.choice2}
            </PollOption>
            <PollOption
              value="C"
              isSelected={selected === "C"}
              isResults={selected !== ""}
              setSelected={setSelectedOption}
              pct={pcts[2]}
            >
              {quiz.choice3}
            </PollOption>
            <div className="absolute top-96 bg-emerald-600 h-2 w-full rounded-full">
              {/* <Transition
                nodeRef={nodeRef}
                in={barWidth === 100}
                timeout={duration}
                appear
              >
                {(state) => ( */}
              <div
                className="bg-emerald-200 h-2 transition-all duration-1000 flex flex-row-reverse float-right rounded-full"
                style={{
                  animation: duration / 1000 + "s progress linear",
                }}
              />
              {/* )}
              </Transition> */}
            </div>
          </div>
        )}
      </div>
    </PanelTemplate>
  );
}
