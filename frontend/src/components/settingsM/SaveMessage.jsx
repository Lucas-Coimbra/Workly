import { Card } from "@/components/ui";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function SaveMessage({ success, error }) {
  if (!success && !error) return null;

  const bgClass = success
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";
  const textClass = success ? "text-green-700" : "text-red-700";
  const Icon = success ? CheckCircle : AlertCircle;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <Card className={`p-4 ${bgClass} shadow-lg`}>
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${textClass}`} />
          <p className={textClass}>
            {success ? "Configurações salvas com sucesso!" : error}
          </p>
        </div>
      </Card>
    </div>
  );
}
