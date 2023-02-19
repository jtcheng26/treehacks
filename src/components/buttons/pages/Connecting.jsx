import React, { useState } from "react";
import {
  Session,
  Conference,
  Space,
  VideoLocalView,
} from "@dolbyio/comms-uikit-react";
import Logo from "../Logo";
import ToggleAudioButton from "../ToggleAudioButton";
import ToggleVideoButton from "../ToggleVideoButton";
import { PRIMARY_COLOR } from "../../../constants/colors";
import Classroom from "./Classroom";
import JoinClassroomButton from "../JoinClassroomButton";

export default function Connecting({ conferenceId, setConferenceId }) {
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const [joined, setJoined] = useState(false);
  

  function onJoin() {
    setJoined(true);
  }

  const [name, setName] = useState('');

  const submitName = (event) => {
    event.preventDefault();
    setName(event.target[0].value);
  };


  console.log("connecting", conferenceId);
  console.log("NAME", name);

  if (joined && conferenceId && name) {
    return (
        <Classroom conferenceId={conferenceId} setConferenceId={setConferenceId} />
    );
  } else if (conferenceId && name) {
        return (
            <div>
                <div
                className="min-h-screen flex"
                style={{
                    backgroundColor: "#DFE0FC",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                }}
                >
                <Session participantInfo={{name: name}}>
                    <Conference id={conferenceId}>
                    <div
                        className="flex-row min-w-screen"
                    >
                        <div style={{ marginLeft: "3vw" }}>
                            <Logo />
                        </div>
                        <div
                        className="flex flex-col"
                        style={{
                            marginLeft: "50vmin",
                            marginTop: '5vmin',
                            height: '400',
                            width: '50vw',
                            alignSelf: "center",
                            justifyContent: "center",
                        }}
                        >
                            <h1 
                            className="font-sans font-bold"
                            style={{
                                fontSize: '4vmin',
                                alignText: 'center',
                                margin: 'auto',
                                marginBottom: '2vmin'
                            }}
                            >
                                Click Join when you're ready!
                            </h1>
                        <Space
                            className="flex"
                            style={{ height: '400', width: '50vw', justifyContent: "center" }}
                        >
                            <VideoLocalView isMicrophonePermission={true} />
                        </Space>
                        <div
                            className="flex flex-row space-x-5"
                            style={{ justifyContent: "center" , marginTop: '2vh'}}
                        >
                            <ToggleAudioButton />
                            {/* <button
                                type="submit"
                                className="font-sans font-bold hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
                                style={{
                                    fontSize: '2vh',
                                    background: PRIMARY_COLOR[500],
                                    borderRadius: 10,
                                    width: '10vmin',
                                    height: '44',
                                    color: "#1e293b",
                                }}
                                onClick={setJoined}
                            >
                                Join
                            </button> */}
                            <JoinClassroomButton
                                meetingName={"Test"}
                                onSuccess={(id) => {setConferenceId(id); onJoin();}}
                                className="content-evenly"/>
                            <ToggleVideoButton />
                        </div>
                        </div>
                    </div>
                    </Conference>
                </Session>
                <div
                    style={{
                    borderRadius: "50%",
                    width: "90vh",
                    height: "90vh",
                    background: "#8284F3",
                    position: "absolute",
                    left: "-25vw",
                    top: "58vh",
                    opacity: "0.4",
                    }}
                ></div>
                <div
                    style={{
                    borderRadius: "50%",
                    width: "96vh",
                    height: "96vh",
                    background: "#A1A3F6",
                    position: "absolute",
                    left: "7vw",
                    top: "80vh",
                    opacity: "0.6",
                    }}
                ></div>
                </div>
            </div>
        );
  } 
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#DFE0FC",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
         <div style={{ marginLeft: "3vw" }}>
            <Logo />
        </div>
        <div
        className="flex flex-col"
        style={{ alignItems: "center", justifyContent: "center", margin: 'auto', marginTop: '30vmin'}}
        >
            <p
            className="font-sans font-bold"
            style={{ marginBottom: '4vmin', fontSize: '5vh', textAlign: 'center' }}
            >
            Enter your name to get ready to join your lecture!
            </p>
            <form className="flex flex-row" onSubmit={submitName}>
                <input
                    type="text"
                    className="font-sans"
                    style={{
                        fontSize: '2.3vh',
                        width: "30vw",
                        height: "7vh",
                        border: "0.4vh black solid",
                        outline: 'none',
                        textAlign: "center",
                        borderRadius: 20,
                        marginRight: '2vw',
                    }}
                    placeholder="enter your name here"
                />
                <button
                    type="submit"
                    className="font-sans hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
                    style={{
                        fontSize: '2.5vh',
                        background: "#1e293b",
                        borderRadius: 20,
                        width: '10vw',
                        height: '7vh',
                        color: PRIMARY_COLOR[500],
                    }}
                >
                    Get Ready
                </button>
            </form>
        </div>
    <div
        style={{
          borderRadius: "50%",
          width: "90vh",
          height: "90vh",
          background: "#8284F3",
          position: "absolute",
          left: "-25vw",
          top: "58vh",
          opacity: "0.5",
        }}
      ></div>
      <div
        style={{
          borderRadius: "50%",
          width: "96vh",
          height: "96vh",
          background: "#A1A3F6",
          position: "absolute",
          left: "7vw",
          top: "80vh",
          opacity: "0.5",
        }}
      ></div>

    </div>

  );

//   return joined && conferenceId ? (
//     <Classroom conferenceId={conferenceId} setConferenceId={setConferenceId} />
//   ) : (
//     <div
//       className="min-h-screen flex"
//       style={{
//         backgroundColor: "#DFE0FC",
//         height: "100%",
//         width: "100%",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Session participantInfo={{ name: makeid(6) }}>
//         <Conference id={conferenceId}>
//           <div
//             className="flex flex-row min-w-screen"
//           >
//             <div style={{ paddingLeft: "3vw" }}>
//                 <Logo />
//             </div>
//             <div
//               className="flex flex-col"
//               style={{ alignItems: "center", justifyContent: "center", marginLeft: '5vw'}}
//             >
//               <p
//                 className="font-sans font-bold"
//                 style={{ marginBottom: '3vh', fontSize: '3vh' }}
//               >
//                 Get ready to join your lecture!
//               </p>
//               <div className="flex flex-row">
//                 <input
//                   className="font-sans"
//                   style={{
//                     fontSize: '2vh',
//                     width: "16vw",
//                     height: "5.7vh",
//                     border: "0.4vh black solid",
//                     outline: 'none',
//                     textAlign: "center",
//                     borderRadius: 20,
//                     marginRight: '2vw',
//                   }}
//                   placeholder="enter your name here"
//                 />
//                 <button
//                   className="font-sans hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
//                   style={{
//                     fontSize: '2vh',
//                     background: "#1e293b",
//                     borderRadius: 20,
//                     width: '6vw',
//                     height: '5.7vh',
//                     color: PRIMARY_COLOR[500],
//                   }}
//                   onClick={onJoin}
//                 >
//                   Join
//                 </button>
//               </div>
//             </div>
//             <div
//               className="flex flex-col"
//               style={{
//                 marginLeft: "7vw",
//                 height: '400',
//                 width: '50vw',
//                 alignSelf: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Space
//                 className="flex"
//                 style={{ height: '400', width: '50vw', justifyContent: "center" }}
//               >
//                 <VideoLocalView isMicrophonePermission={true} />
//               </Space>
//               <div
//                 className="flex flex-row space-x-20"
//                 style={{ justifyContent: "center" , marginTop: '1.4vh'}}
//               >
//                 <ToggleAudioButton />
//                 <ToggleVideoButton />
//               </div>
//             </div>
//           </div>
//         </Conference>
//       </Session>
//       <div
//         style={{
//           borderRadius: "50%",
//           width: "90vh",
//           height: "90vh",
//           background: "#8284F3",
//           position: "absolute",
//           left: "-25vw",
//           top: "58vh",
//           opacity: "0.5",
//         }}
//       ></div>
//       <div
//         style={{
//           borderRadius: "50%",
//           width: "96vh",
//           height: "96vh",
//           background: "#A1A3F6",
//           position: "absolute",
//           left: "7vw",
//           top: "80vh",
//           opacity: "0.5",
//         }}
//       ></div>
//     </div>
//   );
}
