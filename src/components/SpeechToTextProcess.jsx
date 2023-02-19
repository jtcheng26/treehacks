import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Artyom from "artyom.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import generateQuiz from "../api/generateQuiz";
import { PanelContext } from "../contexts/panel";
import { useAudio, useMicrophone } from "@dolbyio/comms-uikit-react";
import io from "socket.io-client";
// import { socket } from './panels/ChatPanel.jsx'
import { AVAILABLE_POLLS } from "./panels/PollPanel";

// const artyom = new Artyom();

// var commandHello = {
//   indexes: ["zazu *"], // These spoken words will trigger the execution of the command
//   smart: true,
//   action: function (i, wildcard) {
//     // Action to be executed when a index match with spoken word
//     console.log(wildcard);
//   },
// };

// artyom.addCommands(commandHello); // Add the command with addCommands method. Now

// function startContinuousArtyom() {
//   artyom.fatality(); // use this to stop any of

//   setTimeout(function () {
//     // if you use artyom.fatality , wait 250 ms to initialize again.
//     artyom
//       .initialize({
//         lang: "en-US", // A lot of languages are supported. Read the docs !
//         continuous: true, // Artyom will listen forever
//         listen: true, // Start recognizing
//         debug: true, // Show everything in the console
//         speed: 1, // talk normally
//       })
//       .then(function () {
//         console.log("Ready to work !");
//       });
//   }, 250);
// }
// artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
//   if (isFinal) {
//     console.log("Final recognized text: " + recognized);
//   } else {
//     console.log(recognized);
//   }
// });

// startContinuousArtyom();

let trans = "";
const socket = io.connect("http://localhost:6969/chat")
const MIN_WORDS_FOR_QUIZ = 50;
socket.on("connect", (data) => {
  console.log("connect");
  socket.emit("joined", {
    name: "student",
  });})

function getWordsFromString(str) {
  console.log(str);
  console.log(str.split(" ").filter((s) => s.length > 0).length);
  return str.split(" ").filter((s) => s.length > 0).length;
}

export default function SpeechToTextProcess({
  setQuiz = () => {},
  setPoll = () => {},
  debug = false,
}) {


    // socket.broadcast.emit("json", (data) => {
    //   setPanel("quiz");
    //   setQuiz(data); 
    // });


  const { panel, setPanel } = useContext(PanelContext);
  
  async function generateQuizCommand() {
    if (true) {
      setPanel("quiz");
      setQuiz({});
      const quiz = await generateQuiz(fullTranscript.substring(fullTranscript.length / 2));
      socket.emit("quiz", quiz);
      setQuiz(
          quiz
      );
    } 
  }
  async function generatePollCommand() {
    setPanel("poll");
    setPoll({ ...AVAILABLE_POLLS["speed"], key: Math.random() * 100 });
  }
  const commands = [
    {
      command: "generate quiz",
      callback: async (command) => {
        generateQuizCommand();
        if (debug) console.log("COMMAND:", command);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.3,
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
  const [fullTranscript, setFullTranscript] = useState("");
  const { isAudio } = useAudio();

  //   useMemo(() => {
  //     SpeechRecognition.startListening()
  //   },[])
  // useEffect(() => {
  //   // if (finalTranscript) {
  //   trans = finalTranscript;
  //   console.log(trans);
  //   // }
  // }, [finalTranscript]);
  const cb =   useCallback((data) => {
    console.log("in on");
    setPanel("quiz");
    setQuiz(data);
  }, [setPanel, setQuiz])
  useEffect(() => {
    socket.on("json",cb);
    return () => socket.off("json", cb)
  }, [cb])
  useEffect(() => {
    setTmp(1);
    if (tmp === 1) {
      start();
      if (debug) console.log("Started");
    }
    // return () => SpeechRecognition.stopListening();
  }, [tmp, debug]);
  useEffect(() => {
    if (!listening && isAudio) {
      setFullTranscript(fullTranscript + " " + finalTranscript);
      start();
      if (debug) console.log(fullTranscript);
    } else if (listening && !isAudio) {
      stop();
    }
  }, [debug, isAudio, listening, fullTranscript, finalTranscript]);
  function start() {
    SpeechRecognition.startListening();
  }
  function stop() {
    SpeechRecognition.stopListening();
  }
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
