import React, { useEffect, useMemo, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechToTextProcess() {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [fullTranscript, setFullTranscript] = useState("");
  //   useMemo(() => {
  //     SpeechRecognition.startListening()
  //   },[])
  useEffect(() => {
    SpeechRecognition.startListening();
    // return () => SpeechRecognition.stopListening();
  }, []);
  //   useMemo(() => {
  //     console.log(transcript)
  //     if (finalTranscript)
  //         setFullTranscript(fullTranscript + " " + transcript);
  //   }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="text-white">
      <p>Microphone: {listening ? "on" : "off"}</p>
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}
