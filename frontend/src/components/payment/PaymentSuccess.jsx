import { useNavigate } from "react-router-dom";
import { Card, Button, Separator, Badge } from "@/components/ui";
import {
  CheckCircle,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Users,
} from "lucide-react";

export default function PaymentSuccess({ safeReservation }) {
  const navigate = useNavigate();

  const getModeLabel = (mode) => {
    switch (mode) {
      case "HOURLY":
        return "Por hora";
      case "DAILY":
        return "Diária";
      case "MONTHLY":
        return "Mensal";
      default:
        return mode || "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-12">
        <Card className="p-8 max-w-2xl mx-4 text-center">
          {/* Ícone de sucesso */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Mensagem */}
          <h2 className="text-gray-900 mb-2">Pagamento Confirmado!</h2>
          <p className="text-gray-600 mb-8">
            Sua reserva foi confirmada com sucesso. Você receberá um e-mail com
            os detalhes.
          </p>

          {/* Detalhes da Reserva */}
          {safeReservation && (
            <Card className="p-6 bg-blue-50 border-blue-200 mb-6 text-left">
              <h3 className="text-gray-900 mb-4">Detalhes da Reserva</h3>

              <div className="space-y-3">
                {/* Nome do espaço + tipo */}
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">
                    {safeReservation.spaceName}
                  </span>
                  {safeReservation.mode && (
                    <Badge className="ml-2 bg-blue-100 text-blue-700">
                      {getModeLabel(safeReservation.mode)}
                    </Badge>
                  )}
                </div>

                {/* Endereço do espaço */}
                {safeReservation.workspaceAddress && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {safeReservation.workspaceAddress}
                    </span>
                  </div>
                )}

                {/* Data */}
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{safeReservation.date}</span>
                </div>

                {/* Horário */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {safeReservation.startTime} - {safeReservation.endTime}
                  </span>
                </div>

                {/* Capacidade */}
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Capacidade: {safeReservation.capacity} pessoas
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Total pago */}
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">Total Pago</span>
                <span className="text-blue-600 text-xl font-bold">
                  R$ {Number(safeReservation.total).toFixed(2)}
                </span>
              </div>
            </Card>
          )}

          {/* Botões */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/reservations")}
            >
              Nova Reserva
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/history")}
            >
              Ver Histórico
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
