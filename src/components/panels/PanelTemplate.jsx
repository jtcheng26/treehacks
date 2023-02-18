import React, { useEffect, useRef, useState } from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
import ZazuHeader from "./ZazuHeader";

import { Transition } from "react-transition-group";

const duration = 300;

const transitionStyles = {
  entering: { width: 400, opacity: 1, padding: 16 },
  entered: { width: 400, opacity: 1, padding: 16 },
  exiting: { width: 0, opacity: 0, padding: 0 },
  exited: { width: 0, opacity: 0, padding: 0 },
};

export default function PanelTemplate({
  headerText,
  borderColor = PRIMARY_COLOR[500],
  fontColor = PRIMARY_COLOR[500],
  children,
  visible = false,
}) {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={duration} appear>
      {(state) => (
        <div
          className={
            "transition-all duration-700 bg-slate-800 rounded-xl font-bold min-h-full "
          }
          style={{
            borderWidth: "3px",
            borderColor: borderColor,
            color: fontColor,
            ...transitionStyles[state],
          }}
        >
          <ZazuHeader text={headerText} />
          <div className="flex flex-col h-full">{children}</div>
        </div>
      )}
    </Transition>
  );
}
