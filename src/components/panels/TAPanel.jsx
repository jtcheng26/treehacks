import React, { useState } from "react";
import PanelTemplate from "./PanelTemplate";
import TextBox from "./TextBox";

export default function TAPanel() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [studentQuery, setStudentQuery] = useState("");
  const enter = () => {
    console.log("Submitssion");
    setStudentQuery("");
  };
  return (
    <PanelTemplate>
      {messageHistory.length ? (
        <div></div>
      ) : (
        <div className="mt-24 relative h-full">
          <div className="flex-grow">
            <h1 className="text-xl inline-block from-emerald-500 to-indigo-500 bg-gradient-to-r bg-clip-text text-transparent font-bold">
              How can I help?
            </h1>
            <p className="text-slate-500 font-normal flex flex-col text-sm ">
              Ideas:
              <span>can you explain ____ more?</span>
              <span>can you give an example of ____?</span>
            </p>
          </div>
          <TextBox
            value={studentQuery}
            setValue={setStudentQuery}
            onEnter={enter}
          />
        </div>
      )}
    </PanelTemplate>
  );
}
