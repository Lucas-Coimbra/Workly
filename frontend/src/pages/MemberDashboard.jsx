import { Button, Card, Badge } from "@/components/ui";
import { Calendar, Clock, MapPin, LayoutDashboard } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { useMemberDashboard } from "../hooks/useMemberDashboard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading } = useMemberDashboard();
  const { t } = useTranslation();

  const formatDateTime = (reservation) => {
    const date = new Date(reservation.date);
    const start = new Date(reservation.startTime);
    const end = new Date(reservation.endTime);

    return `${date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })} ${start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {loading && (
          <div className="flex justify-center py-20 text-gray-500">
            {t("loadingSettings")}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header interno */}
          <Card className="p-4 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">
                  {t("dashboard.greeting", { name: user?.name })}
                </h2>
                <p className="text-sm text-gray-500">
                  {data?.userPlan?.name ?? "—"} • Ativo
                </p>
              </div>
            </div>
          </Card>

          {/* Estatísticas */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  {t("dashboard.activeReservations")}
                </p>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-gray-900 mb-1">
                {data?.activeReservations ?? 0}
              </h3>
              <p className="text-xs text-green-600">
                +{data?.upcomingReservations?.length ?? 0}{" "}
                {t("dashboard.thisMonth")}
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  {t("dashboard.usedHours")}
                </p>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-gray-900 mb-1">{data?.usedHours ?? 0}h</h3>
              <p className="text-xs text-gray-500">
                {t("dashboard.thisMonth")}
              </p>
            </Card>
          </div>

          {/* Próximas Reservas */}
          <Card className="p-6 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">
                {t("dashboard.upcomingReservations")}
              </h3>
              <Button
                onClick={() => navigate("/my-reservations")}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                {t("dashboard.viewAll")}
              </Button>
            </div>

            <div className="space-y-4">
              {data?.upcomingReservations?.length ? (
                data.upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <h4 className="text-gray-900">
                            {reservation.workspace.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          {formatDateTime(reservation)}
                        </div>
                        <Badge
                          className={
                            reservation.paid
                              ? "bg-green-100 text-green-700"
                              : reservation.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {reservation.paid
                            ? t("dashboard.reservationStatus.paid")
                            : reservation.status === "PENDING"
                            ? t("dashboard.reservationStatus.pending")
                            : t("dashboard.reservationStatus.canceled")}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/my-reservations/${reservation.id}`)
                        }
                      >
                        {t("dashboard.viewAll")}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  {t("dashboard.noUpcomingReservations")}
                </p>
              )}
            </div>
          </Card>

          {/* Plano & Chamados */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <h3 className="text-gray-900 mb-4">{t("dashboard.myPlan")}</h3>
              {data?.userPlan ? (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 mb-4">
                  <h4 className="text-blue-900 font-semibold text-lg">
                    {data.userPlan.name}
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    {data.userPlan.monthlyHours
                      ? t("dashboard.hoursMonthly", {
                          hours: data.userPlan.monthlyHours,
                        })
                      : "Horas não definidas"}
                  </p>
                  <p className="text-sm text-blue-600">
                    {t("dashboard.renewal", {
                      date: data.userPlan.renewalDate ?? "—",
                    })}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  {t("dashboard.planNotFound")}
                </p>
              )}
              <Button
                onClick={() => navigate("/member-profile")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t("dashboard.managePlan")}
              </Button>
            </Card>

            {/* Chamados */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">{t("dashboard.tickets")}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => navigate("/support")}
                >
                  {t("dashboard.viewAllTickets")}
                </Button>
              </div>

              <div className="space-y-3">
                {data?.recentTickets?.length ? (
                  data.recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-900">{ticket.title}</p>
                        <Badge
                          variant={
                            ticket.status === "resolved"
                              ? "ticketResolved"
                              : ticket.status === "progress"
                              ? "ticketProgress"
                              : "ticketOpen"
                          }
                        >
                          {ticket.status === "open"
                            ? t("dashboard.ticketStatus.open")
                            : ticket.status === "progress"
                            ? t("dashboard.ticketStatus.progress")
                            : t("dashboard.ticketStatus.resolved")}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t("dashboard.updatedRecently")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    {t("dashboard.planNotFound")}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
