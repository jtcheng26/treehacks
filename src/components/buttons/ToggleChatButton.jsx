import React from "react";
import MenuButtonTemplate from "./MenuButtonTemplate";

export default function ToggleChatButton({ active, onClick }) {
  return (
    <MenuButtonTemplate active={active} onClick={onClick}>
      Chat
    </MenuButtonTemplate>
  );
}
