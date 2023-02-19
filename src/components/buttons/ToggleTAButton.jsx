import React from "react";
import MenuButtonTemplate from "./MenuButtonTemplate";



export default function ToggleTAButton({ active, onClick }) {
  return (
    <MenuButtonTemplate active={active} onClick={onClick}>
      TA
    </MenuButtonTemplate>
  );
}
