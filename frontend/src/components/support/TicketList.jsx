import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Clock, MessageSquare, FileText } from "lucide-react";

export default function TicketList({ tickets, selectedTicket, onSelect }) {
  const openTickets = tickets.filter(
    (t) => t.status === "open" || t.status === "progress"
  );

  const resolvedTickets = tickets.filter((t) => t.status === "resolved");

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
        {list.map((ticket, index) => (
          <Card
            key={ticket.id}
            onClick={() => onSelect(index)}
            className={`p-5 bg-white border-gray-200 cursor-pointer transition-all hover:shadow-md ${
              selectedTicket === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
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

                  <span className="text-xs text-gray-500">{ticket.id}</span>

                  <span className="text-xs text-gray-400">•</span>

                  <span className="text-xs text-gray-500">
                    {ticket.category}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {ticket.title}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                  {ticket.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ticket.updatedAt}
                  </span>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {ticket.responses.length}
                  </span>
                </div>
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
                  ? "Em andamento"
                  : "Resolvido"}
              </Badge>
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
