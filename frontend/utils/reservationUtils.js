import React from "react";
import {
  Wifi,
  Projector,
  Tv,
  Wind,
  Monitor,
  Coffee,
  CheckCircle,
} from "lucide-react";
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

export function getResourceIcon(resource) {
  const lower = String(resource).toLowerCase();
  if (lower.includes("wi-fi") || lower.includes("wifi"))
    return React.createElement(Wifi, { className: "w-4 h-4" });
  if (lower.includes("projetor"))
    return React.createElement(Projector, { className: "w-4 h-4" });
  if (lower.includes("tv"))
    return React.createElement(Tv, { className: "w-4 h-4" });
  if (lower.includes("ar") || lower.includes("ac"))
    return React.createElement(Wind, { className: "w-4 h-4" });
  if (lower.includes("monitor"))
    return React.createElement(Monitor, { className: "w-4 h-4" });
  if (lower.includes("café") || lower.includes("coffee"))
    return React.createElement(Coffee, { className: "w-4 h-4" });
  return React.createElement(CheckCircle, { className: "w-4 h-4" });
}
