import { useConference } from "@dolbyio/comms-uikit-react";
import React from "react";
import EnterMeetingCode from "./EnterMeetingCode";

const joinOptions = {
  constraints: {
    audio: true,
    video: true,
  },
};

export default function JoinClassroomButton({ onSuccess, meetingName }) {
  const { joinConference, createConference } = useConference();

  const conferenceOptions = {
    alias: meetingName,
    params: {
      dolbyVoice: true,
    },
  };

  async function startClassroom() {
    const newConference = await createConference(conferenceOptions);
    await joinConference(newConference, joinOptions);
    onSuccess(newConference.id);
  }

  return (
    <div
      className="text-white font-bold bg-gradient-to-r from-emerald-500 to-indigo-500 py-3 px-12 rounded-full hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
      onClick={startClassroom}
      style={{
        width: "17vw",
        height: "7vh",
        marginLeft: "3vw",
        marginTop: '2vh',
        float: "left",
        textAlign: "center",
        fontSize: "1.9vh",
        paddingTop: "2vh",
      }}
    >
      new classroom
    </div>
  );
}
