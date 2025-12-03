import { Card, Label, Separator, Badge, Button } from "@/components/ui";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function PaymentSummary({
  safeReservation,
  paymentMethod,
  secondaryMethod,
  accountBalance,
  cardData,
  isProcessing,
  handlePayment,
}) {
  if (!safeReservation) return null;

  const total = Number(safeReservation.total) || 0;
  const accountCovers = accountBalance >= total;
  const remainingAfterCredits = Math.max(0, total - accountBalance);

  const totalToPay =
    paymentMethod === "account"
      ? accountCovers
        ? 0
        : remainingAfterCredits
      : total;

  const cardFieldsValid =
    !!cardData &&
    typeof cardData.number === "string" &&
    cardData.number.trim().length >= 12 &&
    !!cardData.name &&
    !!cardData.expiry &&
    !!cardData.cvv;

  const disabled =
    isProcessing ||
    (paymentMethod === "account" && !accountCovers && !secondaryMethod) ||
    (paymentMethod !== "pix" &&
      paymentMethod !== "account" &&
      !cardFieldsValid) ||
    (paymentMethod === "account" &&
      !accountCovers &&
      (secondaryMethod === "credit" || secondaryMethod === "debit") &&
      !cardFieldsValid);

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

        {/* Créditos usados */}
        {paymentMethod === "account" && !accountCovers && (
          <div className="space-y-2 p-3 bg-blue-50 border border-blue-200/60 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Créditos usados</span>
              <span className="text-blue-600 font-semibold">
                - R$ {accountBalance.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Valor restante</span>
              <span className="text-orange-600 font-semibold">
                R$ {remainingAfterCredits.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Método adicional */}
        {paymentMethod === "account" && !accountCovers && secondaryMethod && (
          <div className="text-sm text-gray-700 flex items-center gap-2">
            Método adicional:
            <Badge className="bg-gray-100 text-gray-800 border border-gray-300">
              {secondaryMethod.toUpperCase()}
            </Badge>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-900 font-semibold">Total a Pagar</span>
          <span className="text-blue-600 text-3xl font-bold tracking-tight">
            R${" "}
            {typeof totalToPay === "number"
              ? Number(totalToPay).toFixed(2)
              : totalToPay}
          </span>
        </div>

        {/* Aviso falta secundário */}
        {paymentMethod === "account" && !accountCovers && !secondaryMethod && (
          <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-300/60 rounded-lg">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed">
              Seus créditos serão usados parcialmente. Escolha um método
              adicional acima para pagar o restante.
            </p>
          </div>
        )}

        {/* Botão */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          onClick={handlePayment}
          disabled={disabled}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Confirmar Pagamento
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Ao confirmar, você concorda com os termos de uso.
        </p>
      </div>
    </Card>
  );
}
