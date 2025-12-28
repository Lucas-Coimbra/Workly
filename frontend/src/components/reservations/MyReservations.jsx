import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card, Button, Input, Select, Badge } from "@/components/ui";
import AmenitiesGrid from "../SpaceRequest/AmenitiesGrid";
import { useMyReservations } from "../../hooks/useMyReservations";
import {
  markReservationPaid,
  cancelReservation,
} from "../../services/reservation.service";

export default function MyReservations() {
  const navigate = useNavigate();
  const { reservations, loading, error, refresh } = useMyReservations();
  //selectedReservation embaixo
  const [setSelectedReservation] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterPayment, setFilterPayment] = useState("all");

  if (loading) return <p className="p-8">Carregando reservas...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const filtered = reservations.filter((res) => {
    if (filterPayment !== "all" && res.paymentType !== filterPayment)
      return false;

    if (filterDate && format(new Date(res.date), "yyyy-MM-dd") !== filterDate)
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate("/reservations")}
              className="text-sm text-blue-600 hover:underline mb-2"
            >
              ← Voltar para reservas
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
              Minhas Reservas
            </h1>
            <p className="text-gray-500">Acompanhe e gerencie suas reservas</p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            {filtered.length} reserva(s)
          </div>
        </div>

        {/* filtros */}
        <Card className="p-4 bg-white border border-gray-200 flex flex-wrap gap-4">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="max-w-xs"
          />

          <Select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="max-w-xs"
          >
            <option value="all">Todos os tipos</option>
            <option value="HOURLY">Por hora</option>
            <option value="DAILY">Diária</option>
            <option value="MONTHLY">Mensal</option>
          </Select>

          <Button
            onClick={refresh}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Atualizar
          </Button>
        </Card>

        {/* cards */}
        <div className="space-y-5">
          {filtered.map((res) => {
            const paidColor = res.paid
              ? "border-green-500"
              : "border-yellow-400";

            return (
              <Card
                key={res.id}
                className={`p-6 bg-white border-l-8 ${paidColor} shadow-sm hover:shadow-md transition`}
              >
                <div className="grid md:grid-cols-[1fr_260px] gap-6">
                  {/* infos */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {res.workspace.name}
                      </h3>

                      <Badge
                        className={`${
                          res.paid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {res.paid ? "Pago" : "Pendente"}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500">
                      {res.workspace.address}
                    </p>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                        {res.paymentType}
                      </span>
                      <span className="text-gray-600">
                        {format(new Date(res.date), "dd/MM/yyyy")}
                      </span>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      R$ {res.total.toFixed(2)}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {res.workspace.amenities.slice(0, 6).map((a, i) => (
                        <AmenitiesGrid.Item key={i} label={a} />
                      ))}
                    </div>
                  </div>

                  {/* imagem + ações */}
                  <div className="flex flex-col gap-3 items-end">
                    {res.workspace.images?.length > 0 ? (
                      <img
                        src={res.workspace.images[0]}
                        alt="workspace"
                        className="w-56 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-56 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        Sem imagem
                      </div>
                    )}

                    <div className="flex gap-2 w-full">
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setSelectedReservation(res)}
                      >
                        Detalhes
                      </Button>

                      {!res.paid && (
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() =>
                            markReservationPaid(res.id).then(refresh)
                          }
                        >
                          Pagar
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => cancelReservation(res.id).then(refresh)}
                    >
                      Cancelar reserva
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
