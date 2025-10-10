import { useState } from "react";

export default function ReCAPTCHA({ onVerify, theme = "light" }) {
  const [checked, setChecked] = useState(false);
  const isDark = theme === "dark";

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onVerify(newChecked);
  };

  return (
    <div
      className={`flex items-center justify-between w-full max-w-lg px-4 py-2 border rounded-[10px] shadow-sm transition-colors duration-200
        ${
          isDark
            ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }
      `}
    >
      {/* Checkbox + label */}
      <label
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={handleCheck}
      >
        <div
          className={`flex items-center justify-center w-5 h-5 border rounded-sm transition-colors duration-200
            ${
              checked
                ? "bg-blue-600 border-blue-600"
                : isDark
                ? "bg-gray-700 border-gray-500"
                : "bg-white border-gray-400"
            }
          `}
        >
          {checked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span
          className={`${
            isDark ? "text-white" : "text-gray-800"
          } text-sm font-medium`}
        >
          Não sou um robô
        </span>
      </label>

      {/* Logo reCAPTCHA */}
      <div className="flex items-center gap-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={isDark ? "rgba(255,255,255,0.3)" : "#cbd5e1"}
            strokeWidth="2"
          />
          <path
            d="M12 6v6l4 2"
            stroke={isDark ? "rgba(255,255,255,0.5)" : "#94a3b8"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`${isDark ? "text-white/50" : "text-gray-400"} text-xs`}
        >
          reCAPTCHA
        </span>
      </div>
    </div>
  );
}
