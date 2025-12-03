import { Badge } from "./badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Concluída
        </Badge>
      );

    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Cancelada
        </Badge>
      );

    case "pending":
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pendente
        </Badge>
      );

    default:
      return null;
  }
}
