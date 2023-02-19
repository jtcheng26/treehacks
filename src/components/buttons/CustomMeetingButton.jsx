import React from "react"

export default function CustomMeetingButton() {
    return (
        <div>
            <button type='submit'>
                <img className="hover:scale-125 hover:cursor-pointer transition-all ease-in-out"
                src="assets/chevron-right.svg"
                style={{display: 'inline-flex', marginTop: '1.85vh'}}
                />
            </button>
        </div>
    );
}