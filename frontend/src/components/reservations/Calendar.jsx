import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { daysOfWeek, monthNames } from "../../mocks/reservations/calendarMock";

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [calendarDays, setCalendarDays] = useState([]);

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

    setCalendarDays(daysArray);
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    return (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const handleSelect = (day) => {
    if (!day || isPastDate(day)) return;
    onSelectDate && onSelectDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold capitalize">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const dateValue = new Date(currentYear, currentMonth, day);
          const isSelected =
            isValidDate(selectedDate) &&
            day &&
            dateValue.toDateString() === selectedDate.toDateString();

          const disabled = isPastDate(day);

          return (
            <button
              key={index}
              onClick={() => handleSelect(day)}
              disabled={disabled || !day}
              className={`
                h-10 flex items-center justify-center rounded-md transition
                ${!day ? "bg-transparent cursor-default" : ""}
                ${
                  disabled ? "text-gray-300 bg-gray-100 cursor-not-allowed" : ""
                }
                ${isSelected ? "bg-blue-600 text-white font-medium" : ""}
                ${!disabled && !isSelected && day ? "hover:bg-blue-100" : ""}
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
