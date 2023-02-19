import { LeaveConferenceButton } from "@dolbyio/comms-uikit-react";
import React, { useContext } from "react";
import { PanelContext } from "../contexts/panel";
import ToggleAudioButton from "./buttons/ToggleAudioButton";
import ToggleChatButton from "./buttons/ToggleChatButton";
import ToggleScreenShareButton from "./buttons/ToggleScreenShareButton";
import ToggleTAButton from "./buttons/ToggleTAButton";
import ToggleVideoButton from "./buttons/ToggleVideoButton";

export default function MenuBar({ setConferenceId, meetingName }) {
  const { panel, setPanel } = useContext(PanelContext);
  const leaveTooltipText = "Leave meeting";

  return (
    <div className="w-full flex flex-row space-x-2 justify-center items-center px-4 z-20 mt-auto">
      <div className="flex-grow flex flex-row items-center">
        <LeaveConferenceButton
          tooltipText={leaveTooltipText}
          onSuccess={() => setConferenceId(null)}
        />
        <div className="mx-4 text-white text-xl font-bold flex flex-col">
          <span>Classroom — {meetingName}</span>
          <span className="text-sm font-normal text-slate-500">{new Date().toDateString()}</span>
        </div>
      </div>
      {/* <div className="flex flex-row items-center space-x-2 flex-grow"> */}
      <ToggleAudioButton />
      <ToggleVideoButton />
      <ToggleScreenShareButton />

      {/* Code from previous examples has been removed for brevity */}
      {/* </div> */}
      {/* <div className="flex flex-row items-center space-x-2"> */}
      <ToggleChatButton
        active={panel === "chat"}
        onClick={() => {
          if (panel === "chat") setPanel("");
          else setPanel("chat");
        }}
      />
      <ToggleTAButton
        active={panel === "ta"}
        onClick={() => {
          console.log(panel);
          if (panel === "ta") setPanel("");
          else setPanel("ta");
        }}
      />
      {/* </div> */}
    </div>
  );
}
