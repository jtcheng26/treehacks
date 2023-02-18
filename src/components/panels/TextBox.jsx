import React from "react";

export default function TextBox({
  placeholder = "Start typing here...",
  value = "",
  setValue,
  onEnter,
}) {
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onEnter();
    }
  };
  return (
    <textarea
      className="absolute bottom-20 w-full font-normal text-sm text-slate-300 bg-slate-700 rounded-xl p-3 outline-none resize-none h-24 focus:h-36 overflow-auto focus:shadow-2xl transition-all duration-200"
      placeholder={placeholder}
      onKeyDown={onEnterPress}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
