import React,{useState} from "react";
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
    VideoLocalView,
  } from "@dolbyio/comms-uikit-react";
import Logo from "../Logo";
import ToggleAudioButton from "../ToggleAudioButton";
import ToggleVideoButton from "../ToggleVideoButton";
import { PRIMARY_COLOR } from "../../../constants/colors";



export default function Connecting({conferenceId}){
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    console.log("connecting", conferenceId)
    return (
        <div className="min-h-screen flex" style={{backgroundColor: '#DFE0FC', height: '100%', width: '100%', position: 'relative', overflow: 'hidden'}}>
            <Session participantInfo={{name: makeid(6)}}>
                <Conference id={conferenceId}>
                    <div style={{paddingLeft:'45px'}}>
                        <Logo/>
                    </div>
                    <div className="flex flex-row min-w-screen" style={{ width: '100%', marginLeft: 45}}>
                        <div className="flex flex-col" style={{alignItems: 'center', justifyContent: 'center'}}>
                            <p className="font-sans font-bold" style={{marginBottom: 50, fontSize: 30}}>
                                Get ready to join your lecture!
                            </p>
                            <div className="flex flex-row">
                                <input
                                    className="font-sans"
                                    style={{fontSize: 18, width: '270px', height: '55px', border: '3px black solid', textAlign: 'center', borderRadius: 20, marginRight: 20}}
                                    placeholder="enter your name here"
                                />
                                <button
                                    className="font-sans hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
                                    style={{fontSize: 20, background: '#1e293b', borderRadius: 20, width: 100, height: 55, color: PRIMARY_COLOR[500]}}
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col" style={{ marginLeft: '10%', height: 500, width: 800, alignSelf:'center', justifyContent: "center"}}>
                            <Space className='flex' style={{ height: 500 , width: 800, justifyContent: 'center'}}>
                                <VideoLocalView isMicrophonePermission={true} />
                            </Space>
                            <div className="flex flex-row space-x-10" style={{justifyContent: 'center', paddingTop: 20}}>
                                <ToggleAudioButton/>
                                <ToggleVideoButton/>
                            </div>
                        </div>
                    </div>
                </Conference>
            </Session>
            <div style={{borderRadius: '50%', width: '837px', height: '837px', background: '#8284F3', position: 'absolute', left: '-25%', top: '58%', opacity: '0.5'}}></div>
            <div style={{borderRadius: '50%', width: '900px', height: '900px', background: '#A1A3F6', position: 'absolute', left: '7%', top:'80%', opacity: '0.5'}}></div>
        </div>
    );
}