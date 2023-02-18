import { useConference } from "@dolbyio/comms-uikit-react";
import React from "react";

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
    >
      new classroom
    </div>
  );
}
