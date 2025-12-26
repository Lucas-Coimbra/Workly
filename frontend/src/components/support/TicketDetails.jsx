import { useRef } from "react";
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

export default function TicketDetails({
  ticket,
  newMessage,
  onChange,
  onSend,
  onCreateTicket,
  currentUser,
}) {
  const fileInputRef = useRef(null);

  /* ======================
     EMPTY STATE
  ====================== */
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

  /* ======================
     BADGES
  ====================== */
  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case SUPPORT_PRIORITY.HIGH:
        return (
          <Badge className="bg-red-100 text-red-700">Alta Prioridade</Badge>
        );
      case SUPPORT_PRIORITY.MEDIUM:
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            Média Prioridade
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700">Baixa Prioridade</Badge>
        );
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

  /* ======================
     RENDER
  ====================== */
  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-start justify-between pb-6 mb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {renderPriorityBadge(ticket.priority)}
            <Badge variant="outline">#{ticket.id}</Badge>
            <Badge variant="outline">{ticket.category}</Badge>
          </div>

          <h3 className="text-gray-900 mb-1">{ticket.title}</h3>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Criado em {formatDate(ticket.createdAt)}</span>
            <span>•</span>
            <span>Atualizado {formatDate(ticket.updatedAt)}</span>
          </div>
        </div>

        {renderStatusBadge(ticket.status)}
      </div>

      {/* CONVERSAÇÃO */}
      <div className="flex-1 mb-6">
        <h4 className="text-gray-900 mb-4">Conversação</h4>

        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {ticket.messages?.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">
              Nenhuma mensagem ainda
            </p>
          )}

          {ticket.messages?.map((message) => {
            const isSupport = message.isSupport;

            const senderName = isSupport
              ? message.senderName || "Suporte"
              : currentUser?.name || "Você";

            const initials = senderName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isSupport ? "" : "flex-row-reverse"}`}
              >
                {/* AVATAR */}
                <Avatar
                  className={`w-10 h-10 ${
                    isSupport
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  <AvatarFallback>{initials}</AvatarFallback>
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
                        {senderName}
                      </span>

                      {/* ROLE APENAS PARA SUPORTE */}
                      {isSupport && (
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-200 text-blue-600"
                        >
                          Suporte
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      {message.message}
                    </p>

                    <span className="text-xs text-gray-500">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RESPONDER */}
      {ticket.status !== SUPPORT_STATUS.RESOLVED ? (
        <div className="pt-6 border-t border-gray-200">
          <Label className="block mb-2">Adicionar Resposta</Label>

          <Textarea
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[90px]"
          />

          <div className="flex justify-between items-center mt-3">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
            />

            <Button
              variant="outline"
              size="sm"
              className="border-gray-200"
              onClick={() => fileInputRef.current?.click()}
            >
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
