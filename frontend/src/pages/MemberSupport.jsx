import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import TicketList from "../components/support/TicketList";
import TicketDetails from "../components/support/TicketDetails";
import NewTicketDialog from "../components/support/NewTicketDialog";

import { useAuth } from "../hooks/useAuth";
import { useSupportTickets } from "../hooks/useSupportTickets";
import { useSupportTicket } from "../hooks/useSupportTicket";
import { useCreateSupportTicket } from "../hooks/useCreateSupportTicket";
import { useSupportMetrics } from "../hooks/useSupportMetrics";

import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FileText, AlertCircle, CheckCircle, Clock, Plus } from "lucide-react";

import { SUPPORT_STATUS } from "../constants/support.constants";

export default function MemberSupport({ onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  /* ======================
     HOOKS
  ====================== */
  const { tickets, loading: loadingTickets, reload } = useSupportTickets();
  const { averageResolutionTime, loading: loadingMetrics } =
    useSupportMetrics();

  const {
    ticket: selectedTicket,
    loading: loadingTicket,
    sendMessage,
  } = useSupportTicket(selectedTicketId);

  const { submitTicket, loading: creatingTicket } = useCreateSupportTicket();

  /* ======================
     EFFECTS
  ====================== */
  // limpa mensagem ao trocar de chamado
  useEffect(() => {
    setNewMessage("");
  }, [selectedTicketId]);

  /* ======================
     MÉTRICAS
  ====================== */
  const openTickets = tickets.filter(
    (t) =>
      t.status === SUPPORT_STATUS.OPEN || t.status === SUPPORT_STATUS.PROGRESS
  );

  const resolvedTickets = tickets.filter(
    (t) => t.status === SUPPORT_STATUS.RESOLVED
  );

  /* ======================
     HANDLERS
  ====================== */
  async function handleSendReply() {
    if (!newMessage.trim() || !selectedTicketId) return;

    await sendMessage(newMessage);
    setNewMessage("");
  }

  async function handleCreateTicket(data) {
    const created = await submitTicket(data);

    // evita race condition
    setSelectedTicketId(created.id);
    await reload();
  }

  function formatMinutes(minutes) {
    if (!minutes || minutes <= 0) return "—";

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  }

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
                loading={creatingTicket}
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

              <h3 className="text-xl font-semibold">
                {loadingMetrics ? "—" : formatMinutes(averageResolutionTime)}
              </h3>
            </Card>
          </div>

          {/* CONTEÚDO */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LISTA */}
            <div className="lg:col-span-1">
              <TicketList
                tickets={tickets}
                selectedTicketId={selectedTicketId}
                onSelect={setSelectedTicketId}
                loading={loadingTickets}
              />
            </div>

            {/* DETALHES */}
            <div className="lg:col-span-2">
              <TicketDetails
                ticket={loadingTicket ? null : selectedTicket}
                newMessage={newMessage}
                onChange={setNewMessage}
                onSend={handleSendReply}
                onCreateTicket={handleCreateTicket}
                currentUser={user}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
