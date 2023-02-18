import React, { useContext } from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
import { PanelContext } from "../../contexts/panel";
import ZazuHeader from "./ZazuHeader";

export default function PanelTemplate({
  borderColor = PRIMARY_COLOR[500],
  children,
}) {
  const { panel, setPanel } = useContext(PanelContext);
  return (
    <div
      className="w-96 bg-slate-800 rounded-xl font-bold text-emerald-500 p-4"
      style={{
        borderWidth: "3px",
        borderColor: borderColor,
      }}
    >
      <ZazuHeader />
      <div>{panel}</div>
    </div>
  );
}
