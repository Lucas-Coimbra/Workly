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
  ShieldCheck,
  Lock,
  Plug,
  Snowflake,
  Sun,
  Accessibility,
  Camera,
} from "lucide-react";

function AmenitiesGrid({ selected, toggle }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {AmenitiesGrid.AMENITIES.map((a) => {
        const active = selected.includes(a.id);
        const Icon = a.icon;

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

/* propriedade estática */
AmenitiesGrid.AMENITIES = [
  { id: "WIFI", name: "Wi-Fi", icon: Wifi },
  { id: "COFFEE", name: "Café", icon: Coffee },
  { id: "PARKING", name: "Estacionamento", icon: Car },
  { id: "PRINTER", name: "Impressora", icon: Printer },
  { id: "MONITOR", name: "Monitor Externo", icon: Monitor },
  { id: "PHONE", name: "Telefone", icon: Phone },

  { id: "MEETING_ROOM", name: "Sala de Reunião", icon: Users },
  { id: "PRIVATE_ROOM", name: "Sala Privativa", icon: Home },
  { id: "OPEN_SPACE", name: "Espaço Compartilhado", icon: Square },
  { id: "INDIVIDUAL_DESK", name: "Mesa Individual", icon: User },

  { id: "FLEX_HOURS", name: "Horário Flexível", icon: Clock },
  { id: "AIR_CONDITIONING", name: "Ar-condicionado", icon: Snowflake },
  { id: "NATURAL_LIGHT", name: "Iluminação Natural", icon: Sun },

  { id: "POWER_OUTLETS", name: "Tomadas Individuais", icon: Plug },
  { id: "SECURITY", name: "Segurança", icon: ShieldCheck },
  { id: "CAMERAS", name: "Câmeras de Segurança", icon: Camera },
  { id: "LOCKERS", name: "Armários", icon: Lock },

  { id: "ACCESSIBILITY", name: "Acessibilidade", icon: Accessibility },
];

export default AmenitiesGrid;
