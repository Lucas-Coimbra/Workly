import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import TicketList from "../components/support/TicketList";
import TicketDetails from "../components/support/TicketDetails";
import NewTicketDialog from "../components/support/NewTicketDialog";

import { supportTickets } from "../mocks/supportTickets";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FileText, AlertCircle, CheckCircle, Clock, Plus } from "lucide-react";

export default function MemberSupport({ onLogout }) {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(supportTickets);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const selectedTicket =
    selectedTicketIndex !== null ? tickets[selectedTicketIndex] : null;

  /* ======================
     MÉTRICAS
  ====================== */
  const openTickets = tickets.filter(
    (t) => t.status === "open" || t.status === "progress"
  );

  const resolvedTickets = tickets.filter((t) => t.status === "resolved");

  /* ======================
     HANDLERS
  ====================== */
  const handleSendReply = () => {
    if (!newMessage.trim() || selectedTicketIndex === null) return;

    const updatedTickets = [...tickets];

    updatedTickets[selectedTicketIndex].responses.push({
      author: "João Silva",
      role: "Você",
      message: newMessage,
      time: "Agora",
      isSupport: false,
    });

    updatedTickets[selectedTicketIndex].status = "progress";
    updatedTickets[selectedTicketIndex].updatedAt = "Agora";

    setTickets(updatedTickets);
    setNewMessage("");
  };

  const handleCreateTicket = (data) => {
    const newTicket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      title: data.title,
      category: data.category,
      priority: data.priority,
      status: "open",
      createdAt: "Agora",
      updatedAt: "Agora",
      description: data.description,
      responses: [
        {
          author: "João Silva",
          role: "Você",
          message: data.description,
          time: "Agora",
          isSupport: false,
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicketIndex(0);
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        currentPage="member-support"
        navigate={navigate}
        onLogout={onLogout}
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* HEADER */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Central de Suporte</h2>
                <p className="text-blue-100 text-sm">
                  Gerencie seus chamados e tire suas dúvidas
                </p>
              </div>

              <NewTicketDialog
                onSubmit={handleCreateTicket}
                trigger={
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Chamado
                  </Button>
                }
              />
            </div>
          </Card>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Total de Chamados</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{tickets.length}</h3>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Em Andamento</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{openTickets.length}</h3>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Resolvidos</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">
                {resolvedTickets.length}
              </h3>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Tempo Médio</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-100">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">4h</h3>
            </Card>
          </div>

          {/* CONTEÚDO */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LISTA */}
            <div className="lg:col-span-1">
              <TicketList
                tickets={tickets}
                selectedTicket={selectedTicketIndex}
                onSelect={setSelectedTicketIndex}
              />
            </div>

            {/* DETALHES */}
            <div className="lg:col-span-2">
              <TicketDetails
                ticket={selectedTicket}
                newMessage={newMessage}
                onChange={setNewMessage}
                onSend={handleSendReply}
                onCreateTicket={handleCreateTicket}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
