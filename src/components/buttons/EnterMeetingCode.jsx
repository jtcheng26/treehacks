import React, { useState } from "react";
import CustomMeetingButton from "./CustomMeetingButton";

export default function EnterMeetingCode() {
    return (
        <div style={{float: 'left'}}>
            <input 
            className="font-sans"
            style={{fontSize: '18px', display: 'inline-flex', position:'absolute', width: '420px', height: '70px', marginLeft: '60px', border: 'double 7px transparent', backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #10B981, #6366F1)', backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box', textAlign: 'left', textIndent: '35px', borderRadius: '50px'}}
            placeholder='enter a meeting code'
            >
            </input>
            <CustomMeetingButton/>
        </div>
    );
}

