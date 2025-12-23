import { Calendar, CheckCircle, Clock, Award } from "lucide-react";
import { Card, Separator } from "../ui";

export default function StatsCard({ stats }) {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-gray-900 mb-4">Estatísticas</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Membro desde</p>
            <p className="text-gray-900">{stats.memberSince}</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total de Reservas</p>
            <p className="text-gray-900">{stats.totalReservations}</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Horas Reservadas</p>
            <p className="text-gray-900">{stats.hoursBooked}h</p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pontos Acumulados</p>
            <p className="text-gray-900">{stats.points} pts</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
