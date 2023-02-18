import React from "react";
// Panel is empty string, "ta", "chat", "quiz", or "survey"
export const PanelContext = React.createContext({
  panel: "",
  setPanel: () => {},
});
