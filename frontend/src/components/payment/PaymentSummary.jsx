import { Card, Label, Separator, Badge, Button } from "@/components/ui";
import { Calendar as CalendarIcon, Clock, Users, Lock } from "lucide-react";

export default function PaymentSummary({
  safeReservation,
  paymentMethod,
  cardData,
  isProcessing,
  handlePayment,
}) {
  if (!safeReservation) return null;

  const total = Number(safeReservation.total) || 0;

  const cardFieldsValid =
    !!cardData &&
    typeof cardData.number === "string" &&
    cardData.number.trim().length >= 12 &&
    !!cardData.name &&
    !!cardData.expiry &&
    !!cardData.cvv;

  const disabled =
    isProcessing || (paymentMethod !== "pix" && !cardFieldsValid);

  return (
    <Card className="p-6 sticky top-6 shadow-sm">
      <h3 className="text-gray-900 mb-4 text-lg font-semibold">
        Resumo da Reserva
      </h3>

      <div className="space-y-4">
        {/* Espaço */}
        <div>
          <Label className="text-gray-600 font-medium">Espaço</Label>
          <p className="text-gray-900 mt-1 font-semibold">
            {safeReservation.spaceName}
          </p>
          <Badge
            variant="outline"
            className="mt-2 border-gray-200 text-gray-700 bg-gray-50"
          >
            {safeReservation.spaceType}
          </Badge>
        </div>

        <Separator className="my-4 h-px bg-gray-300" />

        {/* Data e horário */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{safeReservation.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {safeReservation.startTime} - {safeReservation.endTime}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              Capacidade: {safeReservation.capacity} pessoas
            </span>
          </div>
        </div>

        <Separator className="my-4 h-px bg-gray-300" />

        {/* Valores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Duração</span>
            <span className="text-gray-900 font-medium">
              {Number(safeReservation.duration).toFixed(1)}h
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Valor por hora</span>
            <span className="text-gray-900 font-medium">
              R$ {Number(safeReservation.pricePerHour).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              R$ {Number(safeReservation.total).toFixed(2)}
            </span>
          </div>
        </div>

        <Separator className="my-4 h-px bg-gray-300" />

        {/* Total */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-900 font-semibold">Total a Pagar</span>
          <span className="text-blue-600 text-3xl font-bold tracking-tight">
            R$ {total.toFixed(2)}
          </span>
        </div>

        {/* Botão */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          onClick={handlePayment}
          disabled={disabled}
        >
          {isProcessing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
          {isProcessing ? "Processando..." : "Confirmar Pagamento"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Ao confirmar, você concorda com os termos de uso.
        </p>
      </div>
    </Card>
  );
}
