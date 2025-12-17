import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StatsCards from "../components/history/StatsCards";
import Filters from "../components/history/Filters";
import ReservationsTable from "../components/history/ReservationsTable";
import ReservationDetailsModal from "../components/history/ReservationDetailsModal";
import { historyMock } from "../mocks/historyMock";
import { useNavigate } from "react-router-dom";

export default function History({ onLogout }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Filters
  const filteredReservations = historyMock.filter((r) => {
    const matchesSearch =
      r.spaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalSpent = historyMock
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.total, 0);

  const stats = {
    totalReservations: historyMock.length,
    completed: historyMock.filter((r) => r.status === "completed").length,
    cancelled: historyMock.filter((r) => r.status === "cancelled").length,
    totalSpent,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        navigate={navigate}
        onLogout={onLogout}
        currentPage="history"
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-gray-900 text-2xl font-semibold">
              Histórico e Faturas
            </h1>

            <p className="text-gray-600 mt-1">
              Visualize todo o histórico de transações e baixe suas faturas
            </p>
          </div>

          <StatsCards stats={stats} />

          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <ReservationsTable
            reservations={filteredReservations}
            onOpenDetails={setSelectedReservation}
          />

          {selectedReservation && (
            <ReservationDetailsModal
              reservation={selectedReservation}
              onClose={() => setSelectedReservation(null)}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
