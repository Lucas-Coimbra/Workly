import {
  Button,
  Card,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Plus,
  FileDown,
  Eye,
  Edit2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const revenueData = [
  { month: "Abr", value: 12000 },
  { month: "Mai", value: 19000 },
  { month: "Jun", value: 15000 },
  { month: "Jul", value: 22000 },
  { month: "Ago", value: 18000 },
  { month: "Set", value: 25000 },
  { month: "Out", value: 28000 },
];

const occupancyData = [
  { name: "Ocupado", value: 65, color: "#2563eb" },
  { name: "Disponível", value: 35, color: "#cbd5e1" },
];

export default function AdminDashboard({ onNavigate, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="admin"
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="admin-dashboard"
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2>Dashboard Administrativo</h2>
                <p className="text-blue-100">
                  Visão geral completa do seu coworking
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar Relatório
                </Button>
                <Button
                  onClick={() => onNavigate("space-management")}
                  className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-white/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Espaço
                </Button>
              </div>
            </div>
          </Card>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                label: "Receita Mensal",
                value: "R$ 28.450",
                change: "+12%",
                icon: DollarSign,
                color: "green",
              },
              {
                label: "Taxa de Ocupação",
                value: "65%",
                change: "+5%",
                icon: TrendingUp,
                color: "blue",
              },
              {
                label: "Usuários Ativos",
                value: "142",
                change: "+18",
                icon: Users,
                color: "purple",
              },
              {
                label: "Reservas Hoje",
                value: "23",
                change: "+3",
                icon: Calendar,
                color: "orange",
              },
            ].map((kpi, i) => (
              <Card
                key={i}
                className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <div
                    className={`w-10 h-10 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <kpi.icon className={`w-5 h-5 text-${kpi.color}-600`} />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-2">{kpi.value}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    {kpi.change}
                  </Badge>
                  <p className="text-xs text-gray-500">vs mês anterior</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">Receita Mensal</h3>
                  <p className="text-sm text-gray-500">Últimos 7 meses</p>
                </div>
                <Button className="bg-transparent text-blue-600 hover:bg-blue-50 border border-gray-200">
                  <FileDown className="w-4 h-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      `R$ ${value.toLocaleString()}`,
                      "Receita",
                    ]}
                  />
                  <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Occupancy Chart */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">Taxa de Ocupação</h3>
                  <p className="text-sm text-gray-500">Hoje</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {occupancyData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Reservations */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Reservas Recentes</h3>
                <Button className="bg-transparent text-blue-600 hover:bg-gray-100 border border-gray-200">
                  Ver Todas
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Espaço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      user: "João Silva",
                      space: "Sala A",
                      date: "Hoje 14:00",
                      status: "Confirmada",
                    },
                    {
                      user: "Maria Santos",
                      space: "Mesa #12",
                      date: "Hoje 15:00",
                      status: "Confirmada",
                    },
                    {
                      user: "Pedro Costa",
                      space: "Sala B",
                      date: "Amanhã 10:00",
                      status: "Pendente",
                    },
                    {
                      user: "Ana Oliveira",
                      space: "Sala C",
                      date: "Amanhã 14:00",
                      status: "Confirmada",
                    },
                    {
                      user: "Carlos Souza",
                      space: "Mesa #5",
                      date: "10 Out",
                      status: "Pendente",
                    },
                  ].map((reservation, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell className="text-gray-900">
                        {reservation.user}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {reservation.space}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {reservation.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            reservation.status === "Confirmada"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Space Management */}
            <Card className="p-6 bg-white border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Gestão de Espaços</h3>
                <Button
                  onClick={() => onNavigate("space-management")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Sala de Reunião A",
                    type: "Reunião",
                    capacity: "8 pessoas",
                    status: "Ativo",
                  },
                  {
                    name: "Mesa Compartilhada #12",
                    type: "Mesa",
                    capacity: "1 pessoa",
                    status: "Ativo",
                  },
                  {
                    name: "Sala Privativa 3",
                    type: "Privativo",
                    capacity: "4 pessoas",
                    status: "Ativo",
                  },
                  {
                    name: "Auditório Principal",
                    type: "Evento",
                    capacity: "50 pessoas",
                    status: "Manutenção",
                  },
                ].map((space, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{space.name}</h4>
                          <p className="text-sm text-gray-600">
                            {space.type} • {space.capacity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            space.status === "Ativo"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {space.status}
                        </Badge>
                        <Button className="bg-transparent text-gray-600 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button className="bg-transparent text-gray-600 hover:bg-gray-100">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
