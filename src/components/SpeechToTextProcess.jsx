import React, { useCallback, useContext, useMemo, useState } from "react";
import Artyom from "artyom.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import generateQuiz, { BASE_URL } from "../api/generateQuiz";
import { PanelContext } from "../contexts/panel";
import { useAudio, useMicrophone } from "@dolbyio/comms-uikit-react";
import io from "socket.io-client";
import { AVAILABLE_POLLS } from "./panels/PollPanel";
import updateTranscript from "../api/updateTranscript";

let trans = "";
export const socket = io.connect(BASE_URL + "/chat");
const MIN_WORDS_FOR_QUIZ = 50;
socket.on("connect", (data) => {
  console.log("connect");
  socket.emit("joined", {
    name: "student",
  });
});

function getWordsFromString(str) {
  console.log(str);
  console.log(str.split(" ").filter((s) => s.length > 0).length);
  return str.split(" ").filter((s) => s.length > 0).length;
}
export let transcriptall = ""
export default function SpeechToTextProcess({
  setQuiz = () => {},
  setPoll = () => {},
  debug = false,
  generating,
  setGenerating,
}) {
  // socket.broadcast.emit("json", (data) => {
  //   setPanel("quiz");
  //   setQuiz(data);
  // });

  const { panel, setPanel } = useContext(PanelContext);
  const [fullTranscript, setFullTranscript] = useState("");
  const [prevChunk, setPrevChunk] = useState(0);
  const chunkSize = 50;
  // const [generating, setGenerating] = useState(false);

  const generateQuizCommand = useCallback(async () => {
    if (true) {
      // socket.emit("quiz", {});
      if (!generating) {
        setGenerating(true);
        setPanel("quiz");
        // setQuiz({});
        console.log("GENERATING FROM");
        console.log(fullTranscript.substring(fullTranscript.length / 2));
        const quiz = await generateQuiz(
          fullTranscript.substring(fullTranscript.length / 2)
        );
        socket.emit("quiz", quiz);
        setQuiz(quiz);
      }
    }
  }, [fullTranscript, generating, setGenerating, setPanel, setQuiz]);
  const generatePollCommand = useCallback(
    async function () {
      if (!generating) {
        setGenerating(true);
        setPanel("poll");
        socket.emit("poll", AVAILABLE_POLLS["speed"]);
        setPoll({ ...AVAILABLE_POLLS["speed"], key: Math.random() * 100 });
      }
    },
    [generating, setGenerating, setPanel, setPoll]
  );
  const commands = [
    {
      command: "zazu generate quiz",
      callback: async (command) => {
        generateQuizCommand();
        if (debug) console.log("COMMAND:", command);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.4,
    },
    {
      command: "tell me if i am going fast",
      callback: async (command) => {
        generatePollCommand();
        if (debug) console.log("COMMAND:", command);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.4,
    },
    // {
    //   command: "create a poll",
    //   callback: async (command) => {
    //     generatePollCommand();
    //     if (debug) console.log("COMMAND:", command);
    //   },
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.3,
    // },
  ];
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });
  const [tmp, setTmp] = useState(0);

  const { isAudio } = useAudio();
  const cb = useCallback(
    (data) => {
      console.log("in on");
      setPanel("quiz");
      setQuiz(data);
    },
    [setPanel, setQuiz]
  );
  useMemo(() => {
    console.log("QUIZ CB");
    socket.on("json", cb);
    return () => socket.off("json", cb);
  }, [cb]);
  const cb2 = useCallback(
    (data) => {
      setPanel("poll");
      setPoll({ ...data, key: Math.random() * 100 });
    },
    [setPanel, setPoll]
  );
  useMemo(() => {
    console.log("POLL CB");
    socket.on("poll_data", cb2);
    return () => socket.off("poll_data", cb2);
  }, [cb2]);
  useMemo(() => {
    console.log("START CB");
    if (tmp === 1) {
      start();
      if (debug) console.log("Started");
    } else setTmp(1);
    // return () => SpeechRecognition.stopListening();
  }, [tmp, debug]);
  useMemo(() => {
    
    if (!listening && isAudio) {
      if (finalTranscript.trim().length) {
        const newFull = fullTranscript + " " + finalTranscript;
        setFullTranscript(newFull);
        // if (newFull.length >= 150 && newFull.length < 155) transcriptall = newFull
        // transcriptall = newFull
      }
      start();
      if (debug) console.log(fullTranscript);
    } else if (listening && !isAudio) {
      stop();
    }
  }, [debug, isAudio, listening, fullTranscript, finalTranscript]);
  // useMemo(() => {
  //   if (fullTranscript.length - prevChunk >= chunkSize) {
  //     updateTranscript(fullTranscript.substring(prevChunk));
  //     setPrevChunk(fullTranscript.length);
  //   }
  // }, [fullTranscript, prevChunk]);
  function start() {
    SpeechRecognition.startListening();
  }
  function stop() {
    SpeechRecognition.stopListening();
  }
  transcriptall = fullTranscript
  //   useMemo(() => {
  //     console.log(transcript)
  //     if (finalTranscript)
  //         setFullTranscript(fullTranscript + " " + transcript);
  //   }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return debug ? (
    <div className="text-white">
      <div>{listening ? "LISTENING" : "NOT LISTENIGN"}</div>
      {transcript}
      <div className="text-white">{fullTranscript}</div>
      {/* <div>{"question" in quiz ? quiz["question"] : ""}</div> */}
    </div>
  ) : (
    ""
  );
}
