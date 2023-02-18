// src/App.js
import { useState } from "react";
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import {
  CommsProvider,
  ThemeProvider,
  InfoBar,
  Session,
  Conference,
  // buttons
  JoinConferenceButton,
  LeaveConferenceButton,
  // show participants
  ParticipantsList,
  ParticipantsGrid,
  // options
  LocalToggleAudioButton,
  LocalToggleVideoButton,
  // screen sharing
  ScreenShareButton,
  ScreenSharingPresentationBox,
  ScreenSharingActionBar,
  useScreenSharing,
  ShareStatus,
  Space,
} from "@dolbyio/comms-uikit-react";
import JoinClassroomButton from "./components/buttons/JoinClassroomButton";
import ToggleVideoButton from "./components/buttons/ToggleVideoButton";
import ToggleAudioButton from "./components/buttons/ToggleAudioButton";
import ToggleScreenShareButton from "./components/buttons/ToggleScreenShareButton";
import PanelTemplate from "./components/panels/PanelTemplate";
import MenuBar from "./components/MenuBar";
import { PanelContext } from "./contexts/panel";
import TAPanel from "./components/panels/TAPanel";
import Landing from "./components/buttons/pages/Landing";
import Connecting from "./components/buttons/pages/Connecting";

// screen sharing shit
const ScreenSharingActionBarTexts = {
  status: {
    active: "Screen sharing active",
    error: "Screen sharing error",
    loading: "Screen sharing loading",
    other: "Screen sharing other status",
  },
  button: {
    label: "Stop presenting",
    tooltip: "Stop presenting",
  },
  guest: "Someone is presenting",
};

// screen sharing fallback
const fallbackText = "There is some problem with screen sharing";
const fallbackButtonText = "try again";

// 2. Define the `CommsProvider` configuration. We need two properties, a `token` and an async function that refreshes it.
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY3NjY4OTczOSwic3ViIjoiVENETEMtQmFKM1NRNkUyUXM4TG9Xdz09Iiwib2lkIjoiNzU5ZmM0MmYtMTQwMS00NGJlLTg4MjgtYzIyZTYxODI0ZTA3IiwiYmlkIjoiOGEzNjgwZGU4NjM2MjQwNDAxODY1MjMxY2Y1ODYzZTAiLCJhaWQiOiJjYmI5Y2YzNi1kMGJjLTQ4MTQtOGZiYy1iMmQ0M2MyMTM5NzIiLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIl0sInRhcmdldCI6InNlc3Npb24iLCJleHAiOjE2NzY3MzI5Mzl9.gE9s-6S1AuZNRHnjyM7FD3HQsdmrBeCnRAxdScbnd7aLHK99sSsR2Z0fg3zVdsYMdWwV4O8KR8n91A-z1Ew5vA";
const refreshToken = async () => token;

// const participantInfo = { name: "John Doe" };

const meetingName = "Math 61 Lecture 1";

const localText = "you"; // The local participant's name.
const muteText = "mute"; // Displayed in a tooltip when a participant is not muted.
const unmuteText = "unmute"; // Displayed in a tooltip when a participant is muted.
const soundOnText = "sound on"; // Displayed in a tooltip when a participant is speaking.
const soundOffText = "sound off"; // Displayed in a tooltip when a participant is not speaking.
// 3. Create wrapper with `CommsProvider` and `ThemeProvider` for entire app. Pass the `token` and `refreshToken` properties.
const participantInfo = {
  name: "New student",
};
const theme = {
  // colors: {
  //   grey: {
  //     600: 'cyan', // This will change background color of certain UI elements to cyan
  //   },
  // },
};

const AppBase = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CommsProvider token={token} refreshToken={refreshToken}>
        {children}
      </CommsProvider>
    </ThemeProvider>
  );
};

// 4. Create `Content` component. It will be main component of our app. Wrap it with previously created `AppBase`. We'll also add a fixed height to the content as we'll need this later in the guide.

function Content() {
  const [conferenceId, setConferenceId] = useState();

  // 6. Define styles for the containers
  const buttonContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  // 5. Define styles for the containers
  const contentContainerStyle = {
    minHeight: "100vh",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#14141A",
    padding: "20px 0",
    boxSizing: "border-box",
    overflow: "hidden"
  };

  const { status, isLocalUserPresentationOwner, isPresentationModeActive } =
    useScreenSharing();
  const [panel, setPanel] = useState("");
  const value = { panel, setPanel };

  const isPresentationActive =
    status === ShareStatus.Active ||
    (isLocalUserPresentationOwner && isPresentationModeActive);

  const displayedPanel = {
    ta: <TAPanel />,
    "": "",
  };

  return (
    <PanelContext.Provider value={value}>
      <div className="App" style={contentContainerStyle}>
        <InfoBar
          text="Voxeet Web SDK has been initialized."
          style={{ margin: "0 auto" }}
        />
        <Session participantInfo={participantInfo}>
          <InfoBar
            text="Session has been created."
            style={{ margin: "0 auto" }}
          />
          {!conferenceId ? (
            <div style={buttonContainerStyle}>
              <div className="flex flex-col">
                <div>
                  <JoinClassroomButton
                    meetingName={meetingName}
                    onSuccess={(id) => setConferenceId(id)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Conference id={conferenceId}>
              {isPresentationActive && (
                <ScreenSharingActionBar
                  statusLabels={{
                    active: ScreenSharingActionBarTexts.status.active,
                    error: ScreenSharingActionBarTexts.status.error,
                    loading: ScreenSharingActionBarTexts.status.loading,
                    other: ScreenSharingActionBarTexts.status.other,
                  }}
                  buttonLabels={{
                    tooltip: ScreenSharingActionBarTexts.button.tooltip,
                    label: ScreenSharingActionBarTexts.button.label,
                  }}
                  guestLabel={ScreenSharingActionBarTexts.guest}
                />
              )}
              {isPresentationActive && (
                <Space style={{ height: 400 }}>
                  <ScreenSharingPresentationBox
                    fallbackText={fallbackText}
                    fallbackButtonText={fallbackButtonText}
                  />
                </Space>
              )}
              <div className="h-full flex flex-row space-x-4 mx-4">
                <ParticipantsGrid
                  localText={localText}
                  testID="ParticipantsGrid"
                  additionalContainerStyle={{ height: 600 }}
                />
                <TAPanel visible={panel === "ta"} />

                {/* <PanelTemplate />/ */}
              </div>
              <MenuBar />
            </Conference>
          )}
        </Session>
      </div>
    </PanelContext.Provider>
  );
}

// 6. Connect `BaseApp` with `Content` component.

const App = () => {
  return (
    <AppBase>
      <Connecting />
    </AppBase>
  );
};

export default App;
