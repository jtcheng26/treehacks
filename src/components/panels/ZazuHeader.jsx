import React from "react";

export default function ZazuHeader({ text = "Zazu (TA)", icon = true }) {
  return (
    <div className="flex space-between w-full text-lg h-20">
      {text}
      {icon && (
        <img alt="zazu" className="h-24 ml-auto -mt-4" src="/assets/zazu.png" />
      )}
    </div>
  );
}
