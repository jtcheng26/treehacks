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



export default function Connecting(){
    return (
        <div className="min-h-screen" style={{backgroundColor: '#DFE0FC', height: '100%', width: '100%', position: 'relative', overflow: 'hidden'}}>
            <Session>
                <Conference id="connecting">
                    <div style={{paddingLeft:'45px'}}>
                        <Logo/>
                    </div>
                    <div className="flex flex-col" width='100%' style={{border: '2px red solid', marginLeft: 50}}>
                        <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        <Space style={{ height: 400 , width: 600, paddingTop: 20, paddingBottom: 40}}>
                            <VideoLocalView
                            isMicrophonePermission={true}
                            />
                        </Space>
                        </div>
                        <div className="flex flex-row">
                            <ToggleAudioButton/>
                            <ToggleVideoButton/>
                        </div>
                    </div>
                </Conference>
            </Session>
        </div>
    );
}