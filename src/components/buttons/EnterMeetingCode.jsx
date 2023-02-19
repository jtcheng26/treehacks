import React, { useState } from "react";
import CustomMeetingButton from "./CustomMeetingButton";

export default function EnterMeetingCode() {
    return (
        <div style={{float: 'left'}}>
            <form label=''>
                <input 
                className="font-sans"
                style={{fontSize: '2vh', display: 'inline-flex', justifyContent: "center", width: '23vw', height: '7vh', marginLeft: '3vw', border: 'double .7vh transparent', backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #10B981, #6366F1)', backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box', textAlign: 'left', textIndent: '2vw', borderRadius: '50px', marginTop: '2vh'}}
                placeholder='enter a meeting code'
                >
                </input>
                <CustomMeetingButton/>
            </form>
        </div>
    );
}

