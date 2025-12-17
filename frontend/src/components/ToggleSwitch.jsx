export default function ToggleSwitch({ isChecked, onChange }) {
  return (
    <label className="relative inline-block w-12 h-6 cursor-pointer">
      {/* Checkbox oculto */}
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {/* Fundo do switch */}
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 ease-in-out ${
          isChecked
            ? "bg-black border-black"
            : "bg-gray-300 border border-gray-400"
        }`}
      ></span>

      {/* Círculo (thumb) */}
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
          isChecked ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </label>
  );
}
