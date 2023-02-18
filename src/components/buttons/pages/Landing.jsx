import EnterMeetingCode from "../EnterMeetingCode";
import JoinClassroomButton from "../JoinClassroomButton";
import Carousel from "../../Carousel";
import Logo from "../Logo";
import { useState } from "react";
import Connecting from "./Connecting";
import { Session } from "@dolbyio/comms-uikit-react";




export default function Landing() {
    const [conferenceId, setConferenceId] = useState();
    if (!conferenceId)
        return (
        <div className="main min-h-screen" style={{backgroundColor: '#e4f5ed', height: '100%', width: '100%', position: 'relative', overflow: 'hidden'}}>
            <div>
            <div className="flex flex-col">
                <div style={{paddingLeft:'3%'}}>
                    <Logo/>
                </div>

                </div>
                    <div className='flex-row flex' style={{height: '550px'}}>
                        <div style={{height: '80%', width: '45%', marginLeft: '3%', marginTop: 'auto', marginBottom: 'auto'}}>
                            <h1 className="font-bold font-sans" style={{fontSize: '65px'}}>
                                Meet Zazu, your very own personal AI Teaching Assistant!
                            </h1>
                            <p className="font-sans" style={{fontSize: '30px', marginTop: '2%'}}>
                                You can create your own classroom or join an existing one
                            </p>
                        </div>
                        <div className='flex' style={{ marginLeft: '7%', marginTop: 'auto', marginBottom: 'auto'}}>
                            <Carousel/>
                        </div>
                    </div>
                </div>
            <div className="flex flex-row">
                <Session participantInfo={{name: "new student"}}>
                 <JoinClassroomButton
                 meetingName={"Test"}
                 onSuccess={(id) => setConferenceId(id)}
                 />
                 <EnterMeetingCode/>
                 </Session>
            </div>
            <div style={{borderRadius: '50%', width: '837px', height: '837px', background: '#6EE7B7', position: 'absolute', right: '-18%', top: '62%', opacity: '0.7'}}></div>
            <div style={{borderRadius: '50%', width: '900px', height: '900px', background: '#10B981', position: 'absolute', right: '6%', top:'80%', opacity: '0.6'}}></div>
        </div>
    )
    
    else return (
        <Connecting
            conferenceId={conferenceId}
        />
    )
}