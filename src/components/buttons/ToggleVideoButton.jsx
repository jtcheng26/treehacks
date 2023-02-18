import { LocalToggleVideoButton } from "@dolbyio/comms-uikit-react";
import React from "react";
import { PRIMARY_COLOR } from "../../constants/colors";

export default function ToggleVideoButton() {
  return (
    <LocalToggleVideoButton
      style={{ borderRadius: "10px" }}
      defaultBackgroundColor="#1e293b"
      activeBackgroundColor="#f1f5f9"
      activeIconColor={PRIMARY_COLOR[500]}
      defaultIconColor={PRIMARY_COLOR[500]}
    />
  );
}
