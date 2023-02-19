import { useConference } from "@dolbyio/comms-uikit-react";
import React from "react";
import EnterMeetingCode from "./EnterMeetingCode";
import { PRIMARY_COLOR } from "../../constants/colors";

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
    <div>
      <button
          type="submit"
          className="font-sans font-bold hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
          style={{
              fontSize: '2vh',
              background: PRIMARY_COLOR[500],
              borderRadius: 10,
              width: '10vmin',
              height: '50px',
              color: "#1e293b",
          }}
          onClick={startClassroom}
      >
          Join
      </button>
    </div>
  );
}
