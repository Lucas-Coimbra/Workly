import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Clock, MessageSquare, FileText } from "lucide-react";
import {
  SUPPORT_STATUS,
  SUPPORT_PRIORITY,
} from "../../constants/support.constants";

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TicketList({
  tickets = [],
  selectedTicketId,
  onSelect,
}) {
  const openTickets = tickets.filter(
    (t) =>
      t.status === SUPPORT_STATUS.OPEN || t.status === SUPPORT_STATUS.PROGRESS
  );

  const resolvedTickets = tickets.filter(
    (t) => t.status === SUPPORT_STATUS.RESOLVED
  );

  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case SUPPORT_PRIORITY.HIGH:
        return <Badge className="bg-red-100 text-red-700">Alta</Badge>;
      case SUPPORT_PRIORITY.MEDIUM:
        return <Badge className="bg-yellow-100 text-yellow-700">Média</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Baixa</Badge>;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case SUPPORT_STATUS.OPEN:
        return <Badge variant="ticketOpen">Aberto</Badge>;
      case SUPPORT_STATUS.PROGRESS:
        return <Badge variant="ticketProgress">Em andamento</Badge>;
      default:
        return <Badge variant="ticketResolved">Resolvido</Badge>;
    }
  };

  const renderList = (list) => {
    if (list.length === 0) {
      return (
        <Card className="p-8 text-center bg-white border-gray-200">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Nenhum chamado encontrado</p>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {list.map((ticket) => (
          <Card
            key={ticket.id}
            onClick={() => onSelect(ticket.id)}
            className={`p-5 bg-white border-gray-200 cursor-pointer transition-all hover:shadow-md ${
              selectedTicketId === ticket.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {/* Cabeçalho */}
                <div className="flex items-center gap-2 mb-2">
                  {renderPriorityBadge(ticket.priority)}

                  <span className="text-xs text-gray-500">#{ticket.id}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {ticket.category}
                  </span>
                </div>

                {/* Título */}
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {ticket.title}
                </h4>

                {/* Descrição */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                  {ticket.description}
                </p>

                {/* Rodapé */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(ticket.updatedAt)}
                  </span>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {ticket.messages?.length ?? 0}
                  </span>
                </div>
              </div>

              {/* Status */}
              {renderStatusBadge(ticket.status)}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm">
      <Tabs defaultValue="all">
        <TabsList className="w-full flex justify-between mb-4 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="all"
            className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Todos
          </TabsTrigger>

          <TabsTrigger
            value="open"
            className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Abertos
          </TabsTrigger>

          <TabsTrigger
            value="resolved"
            className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Resolvidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderList(tickets)}</TabsContent>
        <TabsContent value="open">{renderList(openTickets)}</TabsContent>
        <TabsContent value="resolved">
          {renderList(resolvedTickets)}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
