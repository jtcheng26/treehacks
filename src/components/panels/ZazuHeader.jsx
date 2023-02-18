import React from "react";

export default function ZazuHeader({ text = "Zazu (TA)" }) {
  return (
    <div className="flex space-between w-full text-lg">
      {text}
      <img alt="zazu" className="h-24 ml-auto -mt-4" src="/assets/zazu.png" />
    </div>
  );
}
