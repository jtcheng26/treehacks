import EnterMeetingCode from "../EnterMeetingCode";
import JoinClassroomButton from "../JoinClassroomButton";
import Carousel from "../../Carousel";
import Logo from "../Logo";
import { useState } from "react";
import Connecting from "./Connecting";
import { Session } from "@dolbyio/comms-uikit-react";

export default function Landing() {
  const [conferenceId, setConferenceId] = useState();
  if (!conferenceId)
    return (
      <div
        className="main min-h-screen"
        style={{
          backgroundColor: "#e4f5ed",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          <div className="flex flex-col">
            <div style={{ marginLeft: "3vw" }}>
              <Logo />
            </div>
          </div>
          <div className="flex-row flex" style={{ height: "50vh" }}>
            <div
              style={{
                height: "50vh",
                width: "40vw",
                marginLeft: "3.5vw",
                marginTop: "4vh",
                marginBottom: "auto",
              }}
            >
              <h1 className="font-bold font-sans" style={{ fontSize: "6.7vh", width: "50vw", alignContent: "center"}}>
                Meet Zazu, your very own personal AI Teaching Assistant!
              </h1>
              <p
                className="font-sans"
                style={{ fontSize: "3.5vh", marginTop: "2vh"}}
              >
                You can create your own classroom or join an existing one
              </p>
            </div>
            <div
              className="flex"
              style={{
                marginLeft: "8vw",
                marginTop: "4vh",
                marginBottom: "auto",
              }}
            >
              <Carousel />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {/* <Session participantInfo={{ name: "New Student" }}> */}
            {/* <JoinClassroomButton
              meetingName={"Test"}
              onSuccess={(id) => setConferenceId(id)}
              className="content-evenly"
            />
            <EnterMeetingCode /> */}
          {/* </Session> */}
          <div
            className="text-white font-bold bg-gradient-to-r from-emerald-500 to-indigo-500 py-3 px-12 rounded-full hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
            onClick={(id) => setConferenceId(id)}
            style={{
                width: "25vw",
                height: "7vh",
                marginLeft: "3vw",
                marginTop: '2vh',
                float: "left",
                textAlign: "center",
                justifyContent: 'center',
                display: 'table',
                verticalAlign: 'middle',
                fontSize: "2.5vmin",
            }}
            >
            new classroom
            </div>
            <EnterMeetingCode/>
        </div>
        <div
          style={{
            borderRadius: "50%",
            width: "95vh",
            height: "95vh",
            background: "#6EE7B7",
            position: "absolute",
            right: "-40vw",
            top: "40vh",
            opacity: "0.7",
          }}
        ></div>
        <div
          style={{
            borderRadius: "50%",
            width: "150vh",
            height: "150vh",
            background: "#10B981",
            position: "absolute",
            right: "-22vw",
            top: "80vh",
            opacity: "0.6",
          }}
        ></div>
      </div>
    );
  else
    return (
      <Connecting
        conferenceId={conferenceId}
        setConferenceId={setConferenceId}
      />
    );
}
