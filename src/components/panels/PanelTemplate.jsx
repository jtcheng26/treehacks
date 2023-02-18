import React, { useEffect, useRef, useState } from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
import ZazuHeader from "./ZazuHeader";

import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  width: 0,
  opacity: 0,
  padding: 0,
};

const transitionStyles = {
  entering: { width: 400, opacity: 1, padding: 16 },
  entered: { width: 400, opacity: 1, padding: 16 },
  exiting: { width: 0, opacity: 0, padding: 0 },
  exited: { width: 0, opacity: 0, padding: 0 },
};

export default function PanelTemplate({
  borderColor = PRIMARY_COLOR[500],
  children,
  visible = false,
}) {
  const nodeRef = useRef(null);
  // const [s, setS] = useState("w-2");
  // useEffect(() => {
  //   // setTimeout(() => {

  //   // }, 100);
  //   setS("w-96");
  // }, []);
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={duration} appear>
      {(state) => (
        <div
          className={
            "transition-all duration-700 bg-slate-800 rounded-xl font-bold text-emerald-500 min-h-full "
          }
          style={{
            borderWidth: "3px",
            borderColor: borderColor,
            ...transitionStyles[state],
          }}
        >
          <ZazuHeader />
          <div className="flex flex-col h-full">{children}</div>
        </div>
      )}
    </Transition>
  );
}
