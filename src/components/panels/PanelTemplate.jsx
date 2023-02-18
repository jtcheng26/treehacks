import React, { useEffect, useRef, useState } from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
import ZazuHeader from "./ZazuHeader";

import { Transition } from "react-transition-group";

const duration = 300;

const transitionStyles = {
  entering: { width: 400, opacity: 1, padding: 16, borderWidth: 3 },
  entered: { width: 400, opacity: 1, padding: 16, borderWidth: 3 },
  exiting: { width: 0, opacity: 0, padding: 0, borderWidth: 0 },
  exited: { width: 0, opacity: 0, padding: 0, borderWidth: 0 },
};

export default function PanelTemplate({
  headerText,
  borderColor = PRIMARY_COLOR[500],
  fontColor = PRIMARY_COLOR[500],
  children,
  visible = false,
}) {
  const nodeRef = useRef(null);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (!visible) setTimeout(() => setHide(true), 500);
    else setHide(false);
  }, [visible]);
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={duration} appear>
      {(state) => (
        <div
          className={
            "transition-all duration-700 bg-slate-800 rounded-xl font-bold min-h-full "
          }
          style={{
            borderColor: borderColor,
            color: fontColor,
            ...transitionStyles[state],
          }}
        >
          {!hide && (
            <>
              <ZazuHeader text={headerText} />
              <div className="flex flex-col h-full">{children}</div>
            </>
          )}
        </div>
      )}
    </Transition>
  );
}
