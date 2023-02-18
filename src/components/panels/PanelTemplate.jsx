import React from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
import ZazuHeader from "./ZazuHeader";

export default function PanelTemplate({
  borderColor = PRIMARY_COLOR[500],
  children,
}) {
  return (
    <div
      className="transition-all duration-200 w-96 bg-slate-800 rounded-xl font-bold text-emerald-500 p-4 min-h-full"
      style={{
        borderWidth: "3px",
        borderColor: borderColor,
      }}
    >
      <ZazuHeader />
      <div className="flex flex-col h-full">{children}</div>
    </div>
  );
}
