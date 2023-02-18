import React from "react";

export default function QuizOption({
  children,
  value,
  setSelected = () => {},
  isCorrect = false,
  isSelected = false,
  isResults = false,
}) {
  return (
    <button
      disabled={isResults}
      className={`w-full flex flex-row items-center space-x-3 font-normal text-xs rounded-xl ${
        isCorrect || isSelected || !isResults
          ? "text-indigo-50"
          : "text-slate-400"
      } ${
        isCorrect && isResults
          ? "bg-emerald-500 hover:bg-emerald-600"
          : isSelected && isResults
          ? "bg-red-400 hover:bg-red-500"
          : isResults
          ? "bg-slate-600 hover:bg-slate-600"
          : "bg-indigo-500 hover:bg-indigo-600"
      } p-3  hover:scale-105 hover:cursor-pointer transition-all duration-300`}
      style={{
        boxShadow: `0px 5px 0px 0px ${
          isCorrect && isResults
            ? "rgb(4 120 87 / var(--tw-text-opacity))"
            : isSelected && isResults
            ? "#dc2626"
            : isResults
            ? "rgb(51 65 85 / var(--tw-bg-opacity))"
            : "rgb(67 56 202 / var(--tw-text-opacity))"
        }`,
      }}
      onClick={() => setSelected(value)}
      type="button"
    >
      <span
        className={`text-lg font-bold ${
          isCorrect && isResults
            ? "text-emerald-700"
            : isResults
            ? "rgb(51 65 85 / var(--tw-bg-opacity))"
            : "text-indigo-700"
        }`}
      >
        {isCorrect && isResults ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgb(16 185 129 / var(--tw-bg-opacity))"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
              stroke="rgb(4 120 87 / var(--tw-text-opacity))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : isSelected && isResults ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgb(248 113 113 / var(--tw-bg-opacity))"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          value
        )}
      </span>
      <span>{children}</span>
    </button>
  );
}
