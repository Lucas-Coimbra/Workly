import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Calendar({ selectedDate, onSelectDate }) {
  const { t, i18n } = useTranslation();
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );
  const [calendarDays, setCalendarDays] = useState([]);

  // Dias da semana via i18n
  const daysOfWeek = [
    t("calendar.sun"),
    t("calendar.mon"),
    t("calendar.tue"),
    t("calendar.wed"),
    t("calendar.thu"),
    t("calendar.fri"),
    t("calendar.sat"),
  ];

  useEffect(() => {
    if (!selectedDate) return;
    setCurrentYear(selectedDate.getFullYear());
    setCurrentMonth(selectedDate.getMonth());
  }, [selectedDate]);

  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

    setCalendarDays(daysArray);
  }, [currentMonth, currentYear]);

  const isPastDate = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    return (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const isPastMonth = () => {
    return (
      currentYear < today.getFullYear() ||
      (currentYear === today.getFullYear() && currentMonth < today.getMonth())
    );
  };

  const handleSelect = (day) => {
    if (!day || isPastDate(day)) return;
    onSelectDate?.(new Date(currentYear, currentMonth, day));
  };

  const monthLabel = new Date(currentYear, currentMonth).toLocaleDateString(
    i18n.language, // usa idioma atual
    { month: "long", year: "numeric" }
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          disabled={isPastMonth()}
          onClick={() =>
            currentMonth === 0
              ? (setCurrentMonth(11), setCurrentYear((y) => y - 1))
              : setCurrentMonth((m) => m - 1)
          }
          className={`p-1 rounded ${
            isPastMonth()
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeft />
        </button>

        <h2 className="text-lg font-semibold capitalize">{monthLabel}</h2>

        <button
          onClick={() =>
            currentMonth === 11
              ? (setCurrentMonth(0), setCurrentYear((y) => y + 1))
              : setCurrentMonth((m) => m + 1)
          }
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, i) => {
          const isSelected =
            day &&
            selectedDate &&
            new Date(currentYear, currentMonth, day).toDateString() ===
              selectedDate.toDateString();

          const disabled = isPastDate(day);

          return (
            <button
              key={i}
              disabled={!day || disabled}
              onClick={() => handleSelect(day)}
              className={`
                h-10 rounded-md text-sm
                ${!day ? "cursor-default" : ""}
                ${disabled ? "text-gray-300 bg-gray-100" : ""}
                ${isSelected ? "bg-blue-600 text-white" : ""}
                ${!disabled && day && !isSelected ? "hover:bg-blue-100" : ""}
              `}
            >
              {day || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
