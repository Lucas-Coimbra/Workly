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

export default function MemberDashboard({ onNavigate, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="member-dashboard"
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <Card className="p-4 bg-white border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-gray-900">Olá, João Silva</h2>
                    <p className="text-sm text-gray-500">
                      Plano Premium - Ativo
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5 text-gray-600" />
                </Button>
                <Avatar className="w-10 h-10 bg-blue-100">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    JS
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="p-4 bg-white border-gray-200 shadow-sm h-fit">
              <nav className="space-y-2">
                <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
                </Button>
                <Button
                  onClick={() => onNavigate("reservations")}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Reservas
                </Button>
                <Button
                  onClick={() => onNavigate("history")}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Histórico
                </Button>
                <Button
                  onClick={() => onNavigate("payment")}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <CreditCard className="w-4 h-4 mr-3" />
                  Pagamentos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <HeadphonesIcon className="w-4 h-4 mr-3" />
                  Suporte
                </Button>
                <Button
                  onClick={() => onNavigate("profile")}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Configurações
                </Button>
              </nav>
            </Card>

            {/* Conteúdo principal */}
            <div className="lg:col-span-3 space-y-6">
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
                    onClick={() => onNavigate("reservations")}
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
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <h4 className="text-gray-900">
                              {reservation.space}
                            </h4>
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-700"
                        >
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
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-blue-900">Premium</h4>
                      <Badge className="bg-green-100 text-green-700">
                        Ativo
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      100 horas mensais
                    </p>
                    <p className="text-sm text-blue-600">
                      Renovação: 01/11/2025
                    </p>
                  </div>
                  <Button
                    onClick={() => onNavigate("profile")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Gerenciar Plano
                  </Button>
                </Card>

                <Card className="p-6 bg-white border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">Chamados</h3>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Abrir Novo
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Problema com internet",
                        status: "Em andamento",
                      },
                      {
                        title: "Solicitação de troca de sala",
                        status: "Resolvido",
                      },
                    ].map((ticket, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-gray-900">
                            {ticket.title}
                          </p>
                          <Badge
                            className={
                              ticket.status === "Resolvido"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Atualizado há 2 horas
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
