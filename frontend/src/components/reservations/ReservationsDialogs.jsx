import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Users,
  DollarSign,
  Calendar as CalendarIcon,
  MapPin,
} from "lucide-react";
import { Input } from "../ui/input";
import { calculateHours } from "../../../utils/reservationUtils";
import { monthNames } from "../../mocks/reservations/calendarMock";

export function DetailsDialog({ space, onClose, getResourceIcon, onReserve }) {
  if (!space) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle>{space.name}</DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre o espaço
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="w-full h-48 bg-blue-200 rounded-lg flex items-center justify-center">
            <MapPin className="w-24 h-24 text-blue-500" />
          </div>

          <div>
            <Label className="text-gray-900">Descrição</Label>
            <p className="text-sm text-gray-600 mt-2">{space.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Capacidade</Label>
              <p className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4" /> {space.capacity} pessoas
              </p>
            </div>
            <div>
              <Label>Preço por Hora</Label>
              <p className="text-sm text-blue-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> R$ {space.pricePerHour}
              </p>
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Recursos Disponíveis</Label>
            <div className="grid grid-cols-2 gap-2">
              {space.resources.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {getResourceIcon(r)} {r}
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-blue-600"
            disabled={!space.available}
            onClick={onReserve}
          >
            Reservar Este Espaço
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ReserveDialog({
  space,
  onClose,
  reservationTime,
  setReservationTime,
  onConfirm,
  selectedDate,
}) {
  if (!space) return null;

  const totalHours = calculateHours(reservationTime.start, reservationTime.end);
  const total = totalHours * space.pricePerHour;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle>Confirmar Reserva</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da sua reserva
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-gray-900 mb-2">{space.name}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {selectedDate.getDate()} de{" "}
                {monthNames[selectedDate.getMonth()]}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {space.capacity} pessoas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Início</Label>
              <Input
                type="time"
                value={reservationTime.start}
                onChange={(e) =>
                  setReservationTime((s) => ({ ...s, start: e.target.value }))
                }
                className="mt-2"
              />
            </div>
            <div>
              <Label>Término</Label>
              <Input
                type="time"
                value={reservationTime.end}
                onChange={(e) =>
                  setReservationTime((s) => ({ ...s, end: e.target.value }))
                }
                className="mt-2"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Duração:</span>
              <span>{totalHours.toFixed(1)} horas</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Valor por hora:</span>
              <span>R$ {space.pricePerHour}</span>
            </div>

            <div className="pt-2 border-t flex items-center justify-between">
              <span>Total:</span>
              <span className="text-blue-600">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-blue-600" onClick={onConfirm}>
              Confirmar Reserva
            </Button>

            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
