import {
  Wifi,
  Coffee,
  Car,
  Printer,
  Monitor,
  Phone,
  Home,
  Users,
  Square,
  User,
  Clock,
  Check,
} from "lucide-react";
import { amenitiesList as AMENITIES } from "../../mocks/mockData";

const ICON_MAP = {
  Wifi,
  Coffee,
  Car,
  Printer,
  Monitor,
  Phone,
  Home,
  Users,
  Square,
  User,
  Clock,
};

export default function AmenitiesGrid({ selected, toggle }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {AMENITIES.map((a) => {
        const active = selected.includes(a.id);
        const Icon = ICON_MAP[a.icon] || Wifi;

        return (
          <button
            key={a.id}
            type="button"
            onClick={() => toggle(a.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left
              ${
                active
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center
                ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-emerald-600"
                }`}
            >
              <Icon size={18} />
            </div>

            <span className="text-sm font-medium text-gray-700">{a.name}</span>

            {active && <Check size={16} className="ml-auto text-emerald-600" />}
          </button>
        );
      })}
    </div>
  );
}
