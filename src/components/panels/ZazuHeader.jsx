import React from "react";

export default function ZazuHeader({
  text = "Zazu (TA)",
  icon = true,
  gradient = false,
}) {
  return (
    <div className="flex space-between w-full text-lg h-20">
      <span
        className={
          gradient
            ? "font-bold text-2xl inline-block from-emerald-500 to-indigo-500 bg-gradient-to-r bg-clip-text text-transparent"
            : ""
        }
      >
        {text}
      </span>
      {icon && (
        <img alt="zazu" className="h-24 ml-auto -mt-4" src="/assets/zazu.png" />
      )}
    </div>
  );
}
