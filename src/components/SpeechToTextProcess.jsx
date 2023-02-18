import React, { useContext, useEffect, useMemo, useState } from "react";
import Artyom from "artyom.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import generateQuiz from "../api/generateQuiz";
import { PanelContext } from "../contexts/panel";
import { useAudio, useMicrophone } from "@dolbyio/comms-uikit-react";

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

const MIN_WORDS_FOR_QUIZ = 50;

function getWordsFromString(str) {
  console.log(str);
  console.log(str.split(" ").filter((s) => s.length > 0).length);
  return str.split(" ").filter((s) => s.length > 0).length;
}

export default function SpeechToTextProcess({
  setQuiz = () => {},
  debug = false,
}) {
  const { panel, setPanel } = useContext(PanelContext);
  async function generateQuizCommand() {
    if (getWordsFromString(fullTranscript) >= MIN_WORDS_FOR_QUIZ) {
      setPanel("quiz");
      setQuiz({});
      setQuiz(
        await generateQuiz(fullTranscript.substring(fullTranscript.length / 2))
      );
    } else {
      console.log("It's not big enough");
    }
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
