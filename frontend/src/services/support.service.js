import { api } from "./api";

/**
 * =========================
 * MEMBER & SUPPORT
 * =========================
 */

/**
 * Lista tickets
 * - MEMBER: só os próprios
 * - SUPPORT: todos
 */
export async function getTickets() {
  const { data } = await api.get("/support/tickets");
  return data;
}

/**
 * Busca ticket por ID
 */
export async function getTicketById(id) {
  const { data } = await api.get(`/support/tickets/${id}`);
  return data;
}

/**
 * Cria ticket (MEMBER)
 */
export async function createTicket(payload) {
  const { data } = await api.post("/support/tickets", payload);
  return data;
}

/**
 * Envia mensagem (MEMBER ou SUPPORT)
 */
export async function addTicketMessage(ticketId, message) {
  const { data } = await api.post(`/support/tickets/${ticketId}/messages`, {
    message,
  });
  return data;
}

/**
 * =========================
 * SUPPORT ONLY
 * =========================
 */

/**
 * Atualiza status do ticket
 * status: "open" | "progress" | "resolved"
 */
export async function updateTicketStatus(ticketId, status) {
  const { data } = await api.patch(`/support/tickets/${ticketId}/status`, {
    status,
  });
  return data;
}

/**
 * =========================
 * METRICS (MEMBER VIEW)
 * =========================
 */

/**
 * Tempo médio de resolução (em minutos)
 */
export async function getAverageResolutionTime() {
  const { data } = await api.get("/support/metrics");
  return data;
}
