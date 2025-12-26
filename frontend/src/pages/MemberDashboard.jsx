import { Button, Card, Badge, Avatar, AvatarFallback } from "@/components/ui";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  LayoutDashboard,
  FileText,
  HeadphonesIcon,
  Settings,
  Bell,
  Search,
  DollarSign,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { useMemberDashboard } from "../hooks/useMemberDashboard";
import { useNavigate } from "react-router-dom";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading } = useMemberDashboard();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        {loading && (
          <div className="flex justify-center py-20 text-gray-500">
            Carregando dashboard...
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header interno */}
          <Card className="p-4 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-gray-900">Olá, {user?.name}</h2>

                  <p className="text-sm text-gray-500">
                    Plano {user?.plan?.name ?? "—"} • Ativo
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Conteúdo principal */}
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Reservas Ativas</p>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">3</h3>
                <p className="text-xs text-green-600">+2 esta semana</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Horas Utilizadas</p>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">45h</h3>
                <p className="text-xs text-gray-500">Este mês</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Créditos</p>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">R$ 350</h3>
                <p className="text-xs text-gray-500">Disponível</p>
              </Card>
            </div>

            {/* Próximas Reservas */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Próximas Reservas</h3>
                <Button
                  onClick={() => navigate("/reservations")}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Ver Todas
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    space: "Sala de Reunião A",
                    date: "Hoje, 14:00 - 16:00",
                    status: "Confirmada",
                    color: "green",
                  },
                  {
                    space: "Mesa Compartilhada #12",
                    date: "Amanhã, 09:00 - 18:00",
                    status: "Confirmada",
                    color: "green",
                  },
                  {
                    space: "Sala Privativa 3",
                    date: "10 Out, 10:00 - 12:00",
                    status: "Pendente",
                    color: "yellow",
                  },
                ].map((reservation, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <h4 className="text-gray-900">{reservation.space}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          {reservation.date}
                        </div>
                        <Badge
                          className={
                            reservation.color === "green"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Plano & Chamados */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-gray-200 shadow-sm">
                <h3 className="text-gray-900 mb-4">Meu Plano</h3>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 mb-4">
                  <h4 className="text-blue-900">{user?.plan?.name ?? "—"}</h4>

                  <p className="text-sm text-blue-700 mb-2">
                    {user?.plan?.monthlyHours
                      ? `${user.plan.monthlyHours} horas mensais`
                      : "Horas não definidas"}
                  </p>

                  <p className="text-sm text-blue-600">Renovação: —</p>
                </div>
                <Button
                  onClick={() => navigate("/member-profile")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Gerenciar Plano
                </Button>
              </Card>
              {/* Chamados */}
              <Card className="p-6 bg-white border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Chamados</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600"
                    onClick={() => navigate("/support")}
                  >
                    Ver todos
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
                          <p className="text-sm text-gray-900">
                            {ticket.title}
                          </p>
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
                              ? "Aberto"
                              : ticket.status === "progress"
                              ? "Em andamento"
                              : "Resolvido"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Atualizado recentemente
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      Nenhum chamado encontrado
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
