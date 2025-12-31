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
  Snowflake,
  Sun,
  Plug,
  ShieldCheck,
  Lock,
  Accessibility,
  Camera,
} from "lucide-react";

export const AMENITIES_MAP = {
  WIFI: { name: "Wi-Fi", icon: Wifi },
  COFFEE: { name: "Café", icon: Coffee },
  PARKING: { name: "Estacionamento", icon: Car },
  PRINTER: { name: "Impressora", icon: Printer },
  MONITOR: { name: "Monitor Externo", icon: Monitor },
  PHONE: { name: "Telefone", icon: Phone },

  MEETING_ROOM: { name: "Sala de Reunião", icon: Users },
  PRIVATE_ROOM: { name: "Sala Privativa", icon: Home },
  OPEN_SPACE: { name: "Espaço Compartilhado", icon: Square },
  INDIVIDUAL_DESK: { name: "Mesa Individual", icon: User },

  FLEX_HOURS: { name: "Horário Flexível", icon: Clock },
  AIR_CONDITIONING: { name: "Ar-condicionado", icon: Snowflake },
  NATURAL_LIGHT: { name: "Iluminação Natural", icon: Sun },

  POWER_OUTLETS: { name: "Tomadas Individuais", icon: Plug },
  SECURITY: { name: "Segurança", icon: ShieldCheck },
  CAMERAS: { name: "Câmeras de Segurança", icon: Camera },
  LOCKERS: { name: "Armários", icon: Lock },

  ACCESSIBILITY: { name: "Acessibilidade", icon: Accessibility },
};
