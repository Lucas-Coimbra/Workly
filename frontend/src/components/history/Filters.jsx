import {
  Card,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Filter, Search } from "lucide-react";

export default function Filters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) {
  return (
    <Card className="p-6 mb-6 shadow-none border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-gray-900">Filtros</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Buscar */}
        <div>
          <Label className="text-gray-900">Buscar</Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              className="pl-10 bg-gray-100 text-gray-900 placeholder:text-gray-600
             border-transparent focus:border-gray-300 focus:ring-2 focus:ring-gray-300
             focus:outline-none transition"
              placeholder="Buscar por espaço ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <Label className="text-gray-900">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="mt-2 bg-gray-100 text-gray-900 border-none shadow-none outline-none     ring-0 focus:ring-0 focus:border-0 focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:border-0">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>

            <SelectContent className="bg-white text-gray-900">
              <SelectItem
                value="all"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Todos os status
              </SelectItem>
              <SelectItem
                value="completed"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Concluídas
              </SelectItem>
              <SelectItem
                value="pending"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Pendentes
              </SelectItem>
              <SelectItem
                value="cancelled"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Canceladas
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Período */}
        <div>
          <Label className="text-gray-900">Período</Label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="mt-2 bg-gray-100 text-gray-900 border-none shadow-none outline-none     ring-0 focus:ring-0 focus:border-0 focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:border-0">
              <SelectValue placeholder="Todo o período" />
            </SelectTrigger>

            <SelectContent className="bg-white text-gray-900">
              <SelectItem
                value="all"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Todo o período
              </SelectItem>
              <SelectItem
                value="week"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Última semana
              </SelectItem>
              <SelectItem
                value="month"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Último mês
              </SelectItem>
              <SelectItem
                value="quarter"
                className="text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:!text-gray-900"
              >
                Últimos 3 meses
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
