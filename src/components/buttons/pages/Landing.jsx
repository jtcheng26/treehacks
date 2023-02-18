import EnterMeetingCode from "../EnterMeetingCode";
import JoinClassroomButton from "../JoinClassroomButton";
import Carousel from "../../Carousel";
import Logo from "../Logo";
import { useState } from "react";




export default function Landing() {
    const [conferenceId, setConferenceId] = useState();

    return (
        <div className="main min-h-screen" style={{backgroundColor: '#e4f5ed', height: '100%', width: '100%', position: 'relative', overflow: 'hidden'}}>
            <div>
            <div className="flex flex-col">
                <div style={{paddingLeft:'45px'}}>
                    <Logo/>
                </div>

                </div>
                    <div className='flex-row flex' style={{height: '550px'}}>
                        <div style={{height: '80%', width: '45%', marginLeft: '65px', marginTop: 'auto', marginBottom: 'auto'}}>
                            <h1 className="font-bold font-sans" style={{fontSize: '65px'}}>
                                Meet Zazu, your very own personal AI Teaching Assistant!
                            </h1>
                            <p className="font-sans" style={{fontSize: '30px', marginTop: '35px'}}>
                                You can create your own classroom or join an existing one
                            </p>
                        </div>
                        <div className='flex' style={{ marginLeft: '130px', marginTop: 'auto', marginBottom: 'auto'}}>
                            <Carousel/>
                        </div>
                    </div>
                </div>
            <div className="flex flex-row">
                 <JoinClassroomButton
                 meetingName={"Test"}
                 onSuccess={(id) => setConferenceId(id)}
                 />
                 <EnterMeetingCode/>
            </div>
            <div style={{borderRadius: '50%', width: '837px', height: '837px', background: '#6EE7B7', position: 'absolute', right: '-300px', top: '550px', opacity: '0.7'}}></div>
            <div style={{borderRadius: '50%', width: '900px', height: '900px', background: '#10B981', position: 'absolute', right: '100px', top:'773px', opacity: '0.6'}}></div>
        </div>
    );
}