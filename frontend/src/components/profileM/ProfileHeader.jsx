import { Camera, Zap, Crown, Star } from "lucide-react";
import { Card } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { useMemberDashboard } from "../../hooks/useMemberDashboard";

export default function ProfileHeader() {
  const { user } = useAuth();
  const { data } = useMemberDashboard();

  const name = user?.name || "Usuário";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const plan = data?.userPlan || user?.plan || { name: "Basic" };

  const planConfig = {
    Basic: {
      icon: <Zap className="w-3 h-3" />,
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-300",
    },
    Gold: {
      icon: <Crown className="w-3 h-3" />,
      bg: "bg-yellow-200",
      text: "text-yellow-700",
      border: "border-yellow-300",
    },
    Premium: {
      icon: <Star className="w-3 h-3" />,
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-300",
    },
  };

  const { icon, bg, text, border } = planConfig[plan.name] || planConfig.Basic;

  return (
    <Card className="p-4 flex flex-row items-center gap-4">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
          {initials}
        </div>

        <label className="absolute bottom-0 left-0 cursor-pointer">
          <input type="file" className="hidden" />
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow">
            <Camera className="w-3 h-3 text-white" />
          </div>
        </label>
      </div>

      {/* Informações */}
      <div className="flex flex-col justify-center">
        <h2 className="text-gray-900 font-semibold">{name}</h2>
        <div
          className={`mt-1 flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${border} ${bg} ${text} w-max`}
        >
          <div className="flex items-center justify-center">{icon}</div>
          <span>{plan.name} member</span>
        </div>
      </div>
    </Card>
  );
}
