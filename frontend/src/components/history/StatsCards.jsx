import { Card } from "@/components/ui";
import { Calendar, CheckCircle, XCircle, CreditCard } from "lucide-react";

export default function StatsCards({ stats }) {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total de Reservas</p>
            <p className="text-2xl text-gray-900">{stats.totalReservations}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Concluídas</p>
            <p className="text-2xl text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Canceladas</p>
            <p className="text-2xl text-gray-900">{stats.cancelled}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Gasto</p>
            <p className="text-2xl text-gray-900">
              R$ {stats.totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
