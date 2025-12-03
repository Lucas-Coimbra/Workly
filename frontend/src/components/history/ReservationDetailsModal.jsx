import { Card, Button, Label, Separator } from "@/components/ui";
import StatusBadge from "@/components/ui/StatusBadge.jsx";
import { XCircle, Calendar, Clock, Download } from "lucide-react";

export default function ReservationDetailsModal({ reservation, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Detalhes da Reserva
              </h2>
              <p className="text-gray-600 mt-1">{reservation.id}</p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Status</Label>
              <div className="mt-2">
                <StatusBadge status={reservation.status} />
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <Label>Espaço</Label>
              <p className="text-gray-900 mt-2">{reservation.spaceName}</p>
              <p className="text-sm text-gray-600">{reservation.spaceType}</p>
            </div>

            <Separator className="bg-gray-200" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{reservation.date}</span>
                </div>
              </div>

              <div>
                <Label>Horário</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Duração</Label>
                <p className="text-gray-900 mt-2">
                  {reservation.duration} horas
                </p>
              </div>

              <div>
                <Label>Método de Pagamento</Label>
                <p className="text-gray-900 mt-2">
                  {reservation.paymentMethod}
                </p>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <Label>Número da Fatura</Label>
              <p className="text-gray-900 mt-2">{reservation.invoiceNumber}</p>
            </div>

            <Separator className="bg-gray-200" />

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <span className="text-gray-900">Total Pago</span>
              <span className="text-blue-600 text-2xl">
                R$ {reservation.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            {reservation.status === "completed" && (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Baixar Fatura
              </Button>
            )}
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
