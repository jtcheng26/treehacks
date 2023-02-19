import React, { useCallback, useEffect, useState } from "react";
import sendStudentQuery from "../../api/sendStudentQuery";
import { GRADIENT_TEXT, PRIMARY_COLOR } from "../../constants/colors";
import Loader from "../spinners/BeatLoader";
import PanelTemplate from "./PanelTemplate";
import TextBox from "./TextBox";
import io from "socket.io-client";
import { BASE_URL } from "../../api/generateQuiz";
import { socket } from "../SpeechToTextProcess";
// const socket = io.connect(BASE_URL + "/chat");
// setSocketInstance(socket);

socket.on("connect", (data) => {
  console.log(data);
  socket.emit("joined", {
    name: "joe",
  });
});
socket.on("disconnect", (data) => {
  console.log(data);
});
export default function ChatPanel({ visible, user = "test" }) {
  const [socketInstance, setSocketInstance] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const update = useCallback(
    (data) => {
      const sender = data.msg.substring(0, data.msg.indexOf(":"));
      const message = data.msg.substring(data.msg.indexOf(":") + 1);
      if (sender !== user)
        setMessageHistory([
          {
            sender: sender,
            message: message,
          },
          ...messageHistory,
        ]);
      console.log(data);
    },
    [messageHistory, user]
  );

  useEffect(() => {
    setSocketInstance(socket);
    setLoading(false);
    socket.on("message", update);

    return () => {
      socket.off("message", update);
    };
  }, [update]);

  const sampleMessage = {
    sender: "TA",
    message: "Test",
  };
  const [studentQuery, setStudentQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const enter = useCallback(async () => {
    if (studentQuery === "") return;
    console.log("Submission");
    setMessageHistory([
      {
        sender: "student",
        message: studentQuery,
      },
      ...messageHistory,
    ]);
    setLoading(true);
    setStudentQuery("");
    if (socketInstance)
      socketInstance.emit("text", { name: user, msg: studentQuery });
    // const data = await sendStudentQuery(studentQuery);
    setLoading(false);
  }, [messageHistory, studentQuery, user, socketInstance]);
  // useEffect(() => {
  //   if (socketInstance)
  // }, [socketInstance, update]);
  return (
    <PanelTemplate visible={visible} ta={false} headerText="Room Chat">
      <div className="relative h-full z-10">
        {messageHistory.length ? (
          <div className="w-full h-full overflow-hidden">
            <div
              style={{
                boxShadow: "0px 0px 10px 20px #1e293bcc",
                zIndex: 100,
                position: "relative",
              }}
            />
            <div
              className={
                "overflow-y-scroll max-h-80 box-content w-full h-full z-10 relative flex flex-col-reverse " +
                (visible ? "pr-5" : "")
              }
            >
              {loading && (
                <div className="flex justify-center items-center mt-2">
                  <Loader color={PRIMARY_COLOR[500]} />
                </div>
              )}
              {messageHistory.map((m, i) => (
                <div key={m.sender + " " + i} className="my-2">
                  <div
                    className={`${
                      m.sender === "TA"
                        ? "inline-block from-emerald-500 to-indigo-500 bg-gradient-to-r bg-clip-text text-transparent"
                        : "text-emerald-500"
                    } font-normal text-xs`}
                  >
                    {m.sender === "TA" ? "Zazu (TA)" : m.sender + " (You)"}
                  </div>
                  <div className={`font-normal text-sm text-slate-400`}>
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-24 flex-grow">
            <h1 className="text-xl inline-block from-emerald-500 to-indigo-500 bg-gradient-to-r bg-clip-text text-transparent font-bold">
              How can I help?
            </h1>
            <p className="text-slate-500 font-normal flex flex-col text-sm ">
              Ideas:
              <span>can you explain ____ more?</span>
              <span>can you give an example of ____?</span>
            </p>
          </div>
        )}
        <TextBox
          value={studentQuery}
          setValue={setStudentQuery}
          onEnter={enter}
        />
      </div>
    </PanelTemplate>
  );
}
