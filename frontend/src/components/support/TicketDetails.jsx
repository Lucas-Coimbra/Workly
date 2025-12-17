import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Label } from "../ui/Label";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import NewTicketDialog from "./NewTicketDialog";
import {
  Plus,
  MessageSquare,
  CheckCircle,
  Send,
  Paperclip,
} from "lucide-react";

export default function TicketDetails({
  ticket,
  newMessage,
  onChange,
  onSend,
  onCreateTicket,
}) {
  if (!ticket) {
    return (
      <Card className="p-12 bg-white border-gray-200 shadow-sm h-full flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-3">
          <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
          <h4 className="text-gray-900 mb-2">Selecione um Chamado</h4>
          <p className="text-sm text-gray-500 mb-6">
            Escolha um chamado ao lado para ver os detalhes
          </p>

          <NewTicketDialog
            onSubmit={onCreateTicket}
            trigger={
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Abrir Novo Chamado
              </Button>
            }
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 mb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-3">
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
                ? "Alta Prioridade"
                : ticket.priority === "medium"
                ? "Média Prioridade"
                : "Baixa Prioridade"}
            </Badge>

            <Badge variant="outline">{ticket.id}</Badge>

            <Badge variant="outline">{ticket.category}</Badge>
          </div>

          <h3 className="text-gray-900 mb-1">{ticket.title}</h3>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Criado em {ticket.createdAt}</span>
            <span>•</span>
            <span>Atualizado {ticket.updatedAt}</span>
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

      {/* Conversação */}
      <div className="mb-6">
        <h4 className="text-gray-900 mb-4">Conversação</h4>

        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {ticket.responses.map((response, index) => {
            const isSupport = response.isSupport;

            return (
              <div
                key={index}
                className={`flex gap-3 ${isSupport ? "" : "flex-row-reverse"}`}
              >
                <Avatar
                  className={`w-10 h-10 ${
                    isSupport ? "bg-blue-100" : "bg-green-100"
                  }`}
                >
                  <AvatarFallback
                    className={isSupport ? "text-blue-700" : "text-green-700"}
                  >
                    {response.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`flex-1 ${
                    isSupport ? "" : "flex flex-col items-end"
                  }`}
                >
                  <div
                    className={`p-4 rounded-lg max-w-[85%] border ${
                      isSupport
                        ? "bg-gray-50 border-gray-200"
                        : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-900">
                        {response.author}
                      </span>

                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          isSupport
                            ? "border-blue-200 text-blue-600"
                            : "border-green-200 text-green-600"
                        }`}
                      >
                        {response.role}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      {response.message}
                    </p>

                    <span className="text-xs text-gray-500">
                      {response.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responder */}
      {ticket.status !== "resolved" ? (
        <div className="pt-6 border-t border-gray-200">
          <Label className="block mb-2">Adicionar Resposta</Label>

          <Textarea
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[90px]"
          />

          <div className="flex justify-between items-center mt-3">
            <Button variant="outline" size="sm" className="border-gray-200">
              <Paperclip className="w-4 h-4 mr-2" />
              Anexar Arquivo
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onSend}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Resposta
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-6 border-t border-gray-200">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-800">Este chamado foi resolvido</p>
          </div>
        </div>
      )}
    </Card>
  );
}
