import { monthNames } from "../src/mocks/reservations/calendarMock";

export function calculateHours(start = "09:00", end = "10:00") {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  return Math.max(0, (endMinutes - startMinutes) / 60);
}

export function formatDisplayDate(d = new Date()) {
  return `${d.getDate()} de ${monthNames[d.getMonth()]}`;
}
