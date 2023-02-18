import { LeaveConferenceButton } from "@dolbyio/comms-uikit-react";
import React, { useContext } from "react";
import { PanelContext } from "../contexts/panel";
import ToggleAudioButton from "./buttons/ToggleAudioButton";
import ToggleChatButton from "./buttons/ToggleChatButton";
import ToggleScreenShareButton from "./buttons/ToggleScreenShareButton";
import ToggleTAButton from "./buttons/ToggleTAButton";
import ToggleVideoButton from "./buttons/ToggleVideoButton";

export default function MenuBar({ setConferenceId }) {
  const { panel, setPanel } = useContext(PanelContext);
  const leaveTooltipText = "Leave meeting";

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="flex-grow">
        <LeaveConferenceButton
          tooltipText={leaveTooltipText}
          onSuccess={() => setConferenceId(null)}
        />
      </div>
      <div className="flex flex-row items-center space-x-2 flex-grow">
        <ToggleAudioButton />
        <ToggleVideoButton />
        <ToggleScreenShareButton />

        {/* Code from previous examples has been removed for brevity */}
      </div>
      <div className="flex flex-row items-center space-x-2">
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
            if (panel === "ta") setPanel("");
            else setPanel("ta");
          }}
        />
      </div>
    </div>
  );
}
