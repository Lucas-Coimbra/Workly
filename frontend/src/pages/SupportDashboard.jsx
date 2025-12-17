import {
  Button,
  Card,
  Badge,
  Avatar,
  AvatarFallback,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Label,
  Textarea,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  Filter,
  Search,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function SupportDashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userType="support"
        navigate={navigate}
        onLogout={onLogout}
        currentPage="support-dashboard"
      />

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
          {/* Header */}
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Central de Suporte</h2>
                <p className="text-purple-100">
                  Gerencie todos os chamados em um só lugar
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros Avançados
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                label: "Chamados Abertos",
                value: "18",
                icon: AlertCircle,
                color: "bg-red-100 text-red-600",
              },
              {
                label: "Em Andamento",
                value: "12",
                icon: Clock,
                color: "bg-blue-100 text-blue-600",
              },
              {
                label: "Resolvidos Hoje",
                value: "8",
                icon: CheckCircle2,
                color: "bg-green-100 text-green-600",
              },
              {
                label: "Tempo Médio",
                value: "2.5h",
                icon: Clock,
                color: "bg-purple-100 text-purple-600",
              },
            ].map((stat, i) => (
              <Card key={i} className="border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-gray-900 text-xl font-semibold">
                  {stat.value}
                </h3>
                <p className="mt-1 text-xs text-gray-500">Atualizado agora</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <Card className="h-fit border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="text-gray-900 font-medium">Filtros</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="text-gray-700">Status</Label>
                  <Select>
                    <SelectTrigger className="mt-2 border-gray-200 bg-gray-50">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="open">Abertos</SelectItem>
                      <SelectItem value="progress">Em Andamento</SelectItem>
                      <SelectItem value="resolved">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-700">Categoria</Label>
                  <Select>
                    <SelectTrigger className="mt-2 border-gray-200 bg-gray-50">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="billing">Financeiro</SelectItem>
                      <SelectItem value="space">Espaço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block text-gray-700">Prioridade</Label>
                  <div className="space-y-3">
                    {["Alta", "Média", "Baixa"].map((priority, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`priority-${i}`} />
                        <label
                          htmlFor={`priority-${i}`}
                          className="text-sm text-gray-700"
                        >
                          {priority}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  Aplicar Filtros
                </Button>
              </div>
            </Card>

            {/* Tickets List */}
            <div className="space-y-4 lg:col-span-3">
              {/* Search */}
              <Card className="border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar chamados..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </Card>

              {/* Tabs */}
              <div className="flex gap-2">
                {["Todos", "Abertos", "Em Andamento", "Resolvidos"].map(
                  (tab, i) => (
                    <Button
                      key={i}
                      className={
                        i === 0
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    >
                      {tab}
                    </Button>
                  )
                )}
              </div>

              {/* Tickets */}
              <div className="space-y-3">
                {[
                  {
                    id: "#2847",
                    user: "João Silva",
                    title: "Internet instável na Sala A",
                    priority: "high",
                    status: "open",
                    time: "10 min atrás",
                    category: "Técnico",
                    description:
                      "A conexão está caindo constantemente durante reuniões...",
                  },
                  {
                    id: "#2846",
                    user: "Maria Santos",
                    title: "Dúvida sobre upgrade de plano",
                    priority: "medium",
                    status: "progress",
                    time: "1h atrás",
                    category: "Financeiro",
                    description:
                      "Gostaria de saber mais sobre os benefícios do plano premium...",
                  },
                  {
                    id: "#2845",
                    user: "Pedro Costa",
                    title: "Ar condicionado não está funcionando",
                    priority: "high",
                    status: "open",
                    time: "2h atrás",
                    category: "Espaço",
                    description:
                      "O ar condicionado da sala B3 está desligado...",
                  },
                  {
                    id: "#2844",
                    user: "Ana Oliveira",
                    title: "Solicitação de cancelamento",
                    priority: "medium",
                    status: "progress",
                    time: "3h atrás",
                    category: "Financeiro",
                    description:
                      "Preciso cancelar minha assinatura devido a mudança de cidade...",
                  },
                  {
                    id: "#2843",
                    user: "Carlos Souza",
                    title: "Sugestão de melhoria no sistema",
                    priority: "low",
                    status: "open",
                    time: "5h atrás",
                    category: "Geral",
                    description:
                      "Seria interessante ter um aplicativo mobile...",
                  },
                ].map((ticket, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <div>
                        <Card className="cursor-pointer border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-purple-300 hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 bg-gradient-to-br from-purple-100 to-purple-200">
                              <AvatarFallback className="bg-transparent text-purple-700">
                                {ticket.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="mb-2 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    className={
                                      ticket.priority === "high"
                                        ? "bg-red-100 text-red-700"
                                        : ticket.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                    }
                                  >
                                    {ticket.priority === "high"
                                      ? "Alta"
                                      : ticket.priority === "medium"
                                      ? "Média"
                                      : "Baixa"}
                                  </Badge>
                                  <h4 className="text-gray-900 font-medium">
                                    {ticket.title}
                                  </h4>
                                </div>
                                <Badge
                                  className={
                                    ticket.status === "open"
                                      ? "bg-blue-100 text-blue-700"
                                      : ticket.status === "progress"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-green-100 text-green-700"
                                  }
                                >
                                  {ticket.status === "open"
                                    ? "Aberto"
                                    : ticket.status === "progress"
                                    ? "Em Andamento"
                                    : "Resolvido"}
                                </Badge>
                              </div>

                              <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                {ticket.description}
                              </p>

                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>#{ticket.id}</span>
                                <span>•</span>
                                <span>{ticket.user}</span>
                                <span>•</span>
                                <span>{ticket.category}</span>
                                <span>•</span>
                                <span>{ticket.time}</span>
                              </div>
                            </div>

                            <Button className="bg-purple-600 text-white hover:bg-purple-700">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Responder
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          Chamado {ticket.id} - {ticket.title}
                        </DialogTitle>
                        <DialogDescription>
                          Aberto por {ticket.user} • {ticket.time}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <p className="text-sm text-gray-700">
                            {ticket.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Responder</Label>
                          <Textarea
                            placeholder="Digite sua resposta..."
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Alterar Status</Label>
                            <Select defaultValue={ticket.status}>
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Aberto</SelectItem>
                                <SelectItem value="progress">
                                  Em Andamento
                                </SelectItem>
                                <SelectItem value="resolved">
                                  Resolvido
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Prioridade</Label>
                            <Select defaultValue={ticket.priority}>
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">Alta</SelectItem>
                                <SelectItem value="medium">Média</SelectItem>
                                <SelectItem value="low">Baixa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-purple-600 text-white hover:bg-purple-700">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar Resposta
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-200 hover:bg-gray-50"
                          >
                            Fechar Chamado
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
