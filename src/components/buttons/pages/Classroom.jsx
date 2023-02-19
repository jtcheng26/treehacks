// src/App.js
import { useState } from "react";
// 1. Import `CommsProvider` and `ThemeProvider` from the UI kit.
import {
  InfoBar,
  Session,
  Conference,
  // show participants
  ParticipantsGrid,
  // screen sharing
  ScreenSharingPresentationBox,
  ScreenSharingActionBar,
  useScreenSharing,
  ShareStatus,
  Space,
} from "@dolbyio/comms-uikit-react";
import MenuBar from "../../MenuBar";
import { PanelContext } from "../../../contexts/panel";
import TAPanel from "../../panels/TAPanel";
import SpeechToTextProcess from "../../SpeechToTextProcess";
import QuizPanel from "../../panels/QuizPanel";
import ChatPanel from "../../panels/ChatPanel";
import PollPanel, { AVAILABLE_POLLS } from "../../panels/PollPanel";

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

// const participantInfo = { name: "John Doe" };

const meetingName = "Math 61 Lecture 1";

const localText = "you"; // The local participant's name.
// 3. Create wrapper with `CommsProvider` and `ThemeProvider` for entire app. Pass the `token` and `refreshToken` properties.
const participantInfo = {
  name: "New student",
};
// 4. Create `Content` component. It will be main component of our app. Wrap it with previously created `AppBase`. We'll also add a fixed height to the content as we'll need this later in the guide.

export default function Classroom({ conferenceId, setConferenceId }) {
  const [generating, setGenerating] = useState(false);
  // 6. Define styles for the containers
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
    overflow: "hidden",
  };

  const { status, isLocalUserPresentationOwner, isPresentationModeActive } =
    useScreenSharing();
  const [panel, setPanel] = useState("");
  const value = { panel, setPanel };

  const isPresentationActive =
    status === ShareStatus.Active ||
    (isLocalUserPresentationOwner && isPresentationModeActive);

  const [quiz, setQuiz] = useState({});
  const [poll, setPoll] = useState(AVAILABLE_POLLS["speed"]);

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

          <Conference id={conferenceId}>
            <SpeechToTextProcess
              setQuiz={setQuiz}
              setPoll={setPoll}
              generating={generating}
              setGenerating={setGenerating}
            />

            <div className="h-full flex flex-row mb-b box-content mx-4">
              <div className="flex flex-col">
                {/* {isPresentationActive && (
  
                )} */}
                {isPresentationActive && (
                  <Space
                    style={{
                      maxHeight: isLocalUserPresentationOwner ? 400 : 640,
                      // maxWidth: "85%",
                    }}
                  >
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
                    <div className="h-4" />
                    <ScreenSharingPresentationBox
                      fallbackText={fallbackText}
                      fallbackButtonText={fallbackButtonText}
                      style={{
                        maxHeight: isLocalUserPresentationOwner ? 250 : 540,
                      }}
                    />
                    <div className="h-4" />
                  </Space>
                )}
                {isPresentationActive && isLocalUserPresentationOwner && (
                  <ParticipantsGrid
                    localText={localText}
                    testID="ParticipantsGrid"
                    additionalContainerStyle={{
                      height:
                        isPresentationActive && isLocalUserPresentationOwner
                          ? 250
                          : isPresentationActive
                          ? 120
                          : 640,
                      // width:
                      //   isPresentationActive && isLocalUserPresentationOwner
                      //     ? 700
                      //     : isPresentationActive
                      //     ? 0
                      //     : 640,
                    }}
                  />
                )}
              </div>
              {!isPresentationActive && (
                <ParticipantsGrid
                  localText={localText}
                  testID="ParticipantsGrid"
                  additionalContainerStyle={{
                    height:
                      isPresentationActive && isLocalUserPresentationOwner
                        ? 300
                        : isPresentationActive
                        ? 120
                        : 640,
                    // width:
                    //   isPresentationActive && isLocalUserPresentationOwner
                    //     ? 700
                    //     : isPresentationActive
                    //     ? 0
                    //     : 640,
                  }}
                />
              )}

              {/* {!isPresentationActive && ( */}

              {/* </div> */}
              {/* )} */}
              {/* {isPresentationActive && (
                <div className="">
                  <ParticipantsGrid
                    localText={localText}
                    testID="ParticipantsGrid"
                    additionalContainerStyle={{ height: 100 }}
                  />
                </div>
              )} */}
              <TAPanel visible={!generating && panel === "ta"} />
              <QuizPanel
                clearQuiz={() => {
                  setPanel("");
                  setGenerating(false);
                }}
                visible={panel === "quiz"}
                quiz={quiz}
                loading={Object.keys(quiz).length === 0}
              />
              <ChatPanel
                visible={!generating && panel === "chat"}
                user={"Student " + parseInt(Math.random() * 100 + 1)}
              />
              <PollPanel
                visible={panel === "poll"}
                quiz={poll}
                clearQuiz={() => {
                  setPanel("");
                  setGenerating(false);
                }}
              />
            </div>
            <MenuBar
              meetingName={meetingName}
              setConferenceId={setConferenceId}
            />
          </Conference>
        </Session>
      </div>
    </PanelContext.Provider>
  );
}
