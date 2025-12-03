import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, Badge } from "@/components/ui";

import Filters from "../components/reservations/Filters";
import Calendar from "../components/reservations/Calendar";
import SpaceCard from "../components/reservations/SpaceCard";

import { allSpaces } from "../mocks/reservations/spacesMock";
import {
  formatDisplayDate,
  getResourceIcon,
} from "../../utils/reservationUtils";
import {
  DetailsDialog,
  ReserveDialog,
} from "../components/reservations/ReservationsDialogs";

export default function Reservations({ onNavigate, onLogout, onReserve }) {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [spaceType, setSpaceType] = useState("all");
  const [capacity, setCapacity] = useState("all");
  const [selectedResources, setSelectedResources] = useState([]);

  const [reservationTime, setReservationTime] = useState({
    start: "09:00",
    end: "10:00",
  });

  const [modal, setModal] = useState({ type: null, space: null });

  const handleResourceToggle = (r) =>
    setSelectedResources((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const resetFilters = () => {
    setSpaceType("all");
    setCapacity("all");
    setSelectedResources([]);
  };

  const filteredSpaces = useMemo(() => {
    return allSpaces.filter((s) => {
      if (spaceType !== "all" && s.type !== spaceType) return false;

      if (capacity !== "all") {
        if (capacity === "1" && s.capacity !== 1) return false;
        if (capacity === "2-5" && (s.capacity < 2 || s.capacity > 5))
          return false;
        if (capacity === "6-10" && (s.capacity < 6 || s.capacity > 10))
          return false;
        if (capacity === "10+" && s.capacity <= 10) return false;
      }

      if (selectedResources.length > 0) {
        const hasAll = selectedResources.every((r) =>
          s.resources.some((sr) => sr.toLowerCase().includes(r.toLowerCase()))
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [spaceType, capacity, selectedResources]);

  const handleConfirmReservation = () => {
    const space = modal.space;
    if (!space) return;

    // --- Cálculo correto da duração ---
    const [sh, sm] = reservationTime.start.split(":").map(Number);
    const [eh, em] = reservationTime.end.split(":").map(Number);

    const start = sh + sm / 60;
    const end = eh + em / 60;

    const duration = Math.max(0.5, end - start); // mínimo 0.5h
    const total = duration * space.pricePerHour;

    // --- Dados completos enviados para o pagamento ---
    const reservationData = {
      spaceName: space.name,
      spaceType: space.type,
      capacity: space.capacity,
      pricePerHour: space.pricePerHour,
      date: selectedDate.toLocaleDateString("pt-BR"),
      startTime: reservationTime.start,
      endTime: reservationTime.end,
      duration,
      total,
    };

    onReserve?.(reservationData);
    setModal({ type: null, space: null });
  };

  return (
    <div className="min-h-screen flex-col flex">
      <Header
        userType="member"
        onNavigate={onNavigate}
        onLogout={onLogout}
        currentPage="reservations"
      />

      <main className="bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Reservar Espaço</h2>
                <p className="text-blue-100">
                  Encontre e reserve o espaço perfeito para você
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-blue-100">
                  Créditos Disponíveis
                </div>
                <div className="text-xl font-semibold">R$ 350,00</div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <Filters
              spaceType={spaceType}
              setSpaceType={setSpaceType}
              capacity={capacity}
              setCapacity={setCapacity}
              selectedResources={selectedResources}
              handleResourceToggle={handleResourceToggle}
              totalFound={filteredSpaces.length}
              onClear={resetFilters}
              onSearch={() => {}}
            />

            <div className="lg:col-span-2 space-y-6">
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">
                  Espaços Disponíveis - {formatDisplayDate(selectedDate)}
                </h3>
                <Badge className="bg-blue-100 text-blue-700">
                  {filteredSpaces.length} espaço(s)
                </Badge>
              </div>

              <div className="space-y-4">
                {filteredSpaces.length === 0 ? (
                  <Card className="p-12 text-center bg-white">
                    Nenhum espaço encontrado
                  </Card>
                ) : (
                  filteredSpaces.map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={space}
                      getResourceIcon={getResourceIcon}
                      onShowDetails={(s) =>
                        setModal({ type: "details", space: s })
                      }
                      onSelectSpace={(s) =>
                        setModal({ type: "reserve", space: s })
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {modal.type === "details" && (
        <DetailsDialog
          space={modal.space}
          onClose={() => setModal({ type: null, space: null })}
          getResourceIcon={getResourceIcon}
          onReserve={() => setModal({ type: "reserve", space: modal.space })}
        />
      )}

      {modal.type === "reserve" && (
        <ReserveDialog
          space={modal.space}
          onClose={() => setModal({ type: null, space: null })}
          reservationTime={reservationTime}
          setReservationTime={setReservationTime}
          selectedDate={selectedDate}
          onConfirm={handleConfirmReservation}
        />
      )}

      <Footer />
    </div>
  );
}
