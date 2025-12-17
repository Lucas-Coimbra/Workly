import { Card } from "../ui/Card";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function SaveMessage({ success, error }) {
  if (!success && !error) return null;

  return success ? (
    <Card className="p-4 bg-green-50 border-green-200 mb-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <p className="text-green-700">Configurações salvas com sucesso!</p>
      </div>
    </Card>
  ) : (
    <Card className="p-4 bg-red-50 border-red-200 mb-6">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <p className="text-red-700">{error}</p>
      </div>
    </Card>
  );
}
