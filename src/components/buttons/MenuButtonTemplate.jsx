import React from "react";

export default function MenuButtonTemplate({
  active = false,
  onClick,
  children,
}) {
  return (
    <div
      className={`h-12 w-12 hover:bg-slate-100 hover:cursor-pointer ${
        !active ? "bg-slate-800" : "bg-slate-100"
      } rounded-lg text-emerald-500 flex justify-center items-center transition-all duration-200`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
