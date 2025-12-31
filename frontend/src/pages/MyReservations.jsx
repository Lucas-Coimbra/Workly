import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { CalendarX } from "lucide-react";

import Header from "../components/Header";
import ReservationCard from "../components/reservations/ReservationCard";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

import { useMyReservations } from "../hooks/useMyReservations";
import { cancelReservation } from "../services/reservation.service";
import { useTranslation } from "react-i18next";

export default function MyReservations() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reservations, loading, error, refresh } = useMyReservations();

  const [filterDate, setFilterDate] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  if (loading) return <p className="p-8">{t("myReservations.loading")}</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const filtered = reservations.filter((res) => {
    if (filterMode !== "all" && res.mode !== filterMode) return false;
    if (filterStatus !== "all" && res.status !== filterStatus) return false;
    if (filterDate && format(new Date(res.date), "yyyy-MM-dd") !== filterDate)
      return false;
    return true;
  });

  async function handleCancel(id) {
    try {
      await cancelReservation(id);
      toast.success(t("myReservations.canceledSuccess"));
      refresh();
    } catch (err) {
      toast.error(
        err.response?.data?.message || t("myReservations.canceledError")
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* HEADER LOCAL */}
        <div className="flex items-center justify-between mb-6">
          {/* Botão de voltar */}
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            ← {t("myReservations.back")}
          </Button>

          {/* Título centralizado */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("myReservations.title")}
            </h1>
            <p className="text-gray-500 text-sm">
              {t("myReservations.subtitle")}
            </p>
          </div>

          {/* Contador de reservas */}
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            {t("myReservations.reservationCount", { count: filtered.length })}
          </div>
        </div>

        {/* FILTROS */}
        <Card className="p-4 bg-white border border-gray-200 flex flex-row flex-wrap items-center gap-3 justify-between mb-8">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-sm flex-1 min-w-[150px]"
            placeholder={t("myReservations.filterDate")}
          />

          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="border rounded-md p-2 text-sm flex-1 min-w-[140px]"
          >
            <option value="all">{t("myReservations.allTypes")}</option>
            <option value="HOURLY">{t("myReservations.byHour")}</option>
            <option value="DAILY">{t("myReservations.daily")}</option>
            <option value="MONTHLY">{t("myReservations.monthly")}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md p-2 text-sm flex-1 min-w-[140px]"
          >
            <option value="all">{t("myReservations.allStatus")}</option>
            <option value="PENDING">{t("myReservations.pending")}</option>
            <option value="CONFIRMED">{t("myReservations.confirmed")}</option>
            <option value="CANCELED">{t("myReservations.canceled")}</option>
          </select>

          <Button
            variant="secondary"
            onClick={refresh}
            className="ml-2 flex-1 min-w-[100px] text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("myReservations.refresh")}
          </Button>
        </Card>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <Card className="p-12 flex flex-col items-center text-center gap-4">
            <div className="bg-blue-100 text-blue-700 p-4 rounded-full">
              <CalendarX className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-semibold">
              {t("myReservations.noReservations")}
            </h2>

            <p className="text-gray-500 max-w-md">
              {t("myReservations.noReservationsDescription")}
            </p>

            <Button onClick={() => navigate("/reservations")}>
              {t("myReservations.viewAvailableSpaces")}
            </Button>
          </Card>
        )}

        {/* LISTA */}
        <div className="space-y-5">
          {filtered.map((res) => (
            <ReservationCard
              key={res.id}
              reservation={res}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
