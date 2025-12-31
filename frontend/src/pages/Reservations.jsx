import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, Badge } from "@/components/ui";

import Filters from "../components/reservations/Filters";
import Calendar from "../components/reservations/Calendar";
import SpaceCard from "../components/reservations/SpaceCard";

import { useWorkspaces } from "../hooks/useWorkspaces";
import { useCreateReservation } from "../hooks/useReservation";

import { formatDisplayDate } from "../../utils/reservationUtils";

import { DetailsDialog } from "../components/reservations/DetailsDialog";
import ReservationFlowDialog from "../components/reservations/ReservationFlowDialog";

export default function Reservations({ onLogout }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const today = new Date();

  const { workspaces, loading, error } = useWorkspaces();
  const { submit, loading: reserving } = useCreateReservation();

  const [selectedDate, setSelectedDate] = useState(today);
  const [spaceType, setSpaceType] = useState("all");
  const [capacity, setCapacity] = useState("all");
  const [selectedResources, setSelectedResources] = useState([]);
  const [modal, setModal] = useState({
    type: null,
    space: null,
    initialMode: null,
    mode: null,
  });

  const handleResourceToggle = (resource) => {
    setSelectedResources((prev) =>
      prev.includes(resource)
        ? prev.filter((r) => r !== resource)
        : [...prev, resource]
    );
  };

  const resetFilters = () => {
    setSpaceType("all");
    setCapacity("all");
    setSelectedResources([]);
  };

  const availableAmenities = useMemo(() => {
    const set = new Set();
    workspaces.forEach((w) => w.amenities?.forEach((a) => set.add(a)));
    return Array.from(set);
  }, [workspaces]);

  const filteredSpaces = useMemo(() => {
    return workspaces.filter((w) => {
      if (spaceType !== "all" && w.spaceType !== spaceType) return false;
      if (capacity !== "all" && w.capacity > Number(capacity)) return false;
      if (
        selectedResources.length > 0 &&
        !selectedResources.every((r) => w.amenities?.includes(r))
      )
        return false;
      return true;
    });
  }, [workspaces, spaceType, capacity, selectedResources]);

  const handleConfirmReservation = async (payload) => {
    try {
      await submit(payload);
      setModal({ type: null, space: null });
      navigate("/my-reservations");
    } catch (err) {
      console.error(t("reservations.failedToReserve"), err);
    }
  };

  if (loading) return <p className="p-8">{t("reservations.loadingSpaces")}</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        navigate={navigate}
        onLogout={onLogout}
        currentPage="reservations"
      />

      <main className="bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* HEADER */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {t("reservations.bookSpace")}
                </h2>
                <p className="text-blue-100">
                  {t("reservations.chooseWorkspace")}
                </p>
              </div>
              <button
                onClick={() => navigate("/my-reservations")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm"
              >
                {t("reservations.myReservations")}
              </button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* FILTROS */}
            <Filters
              spaceType={spaceType}
              setSpaceType={setSpaceType}
              capacity={capacity}
              setCapacity={setCapacity}
              amenities={availableAmenities}
              selectedResources={selectedResources}
              handleResourceToggle={handleResourceToggle}
              totalFound={filteredSpaces.length}
              onClear={resetFilters}
            />

            {/* LISTAGEM */}
            <div className="lg:col-span-2 space-y-6">
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <div className="flex justify-between items-center">
                <h3>
                  {t("reservations.availableSpaces")} —{" "}
                  {formatDisplayDate(selectedDate)}
                </h3>
                <Badge className="bg-blue-100 text-blue-700">
                  {filteredSpaces.length}
                </Badge>
              </div>

              <div className="space-y-4">
                {filteredSpaces.length === 0 ? (
                  <Card className="p-12 text-center">
                    {t("reservations.noSpacesFound")}
                  </Card>
                ) : (
                  filteredSpaces.map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={space}
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

      {/* MODAIS */}
      {modal.type === "details" && (
        <DetailsDialog
          space={modal.space}
          onClose={() =>
            setModal({ type: null, space: null, initialMode: null, mode: null })
          }
          onReserve={(mode) =>
            setModal({
              type: "reserve",
              space: modal.space,
              mode,
              initialMode: mode,
            })
          }
        />
      )}

      {modal.type === "reserve" && (
        <ReservationFlowDialog
          space={modal.space}
          selectedDate={selectedDate}
          initialMode={modal.initialMode}
          onClose={() => setModal({ type: null, space: null })}
          onConfirm={handleConfirmReservation}
          loading={reserving}
        />
      )}

      <Footer />
    </div>
  );
}
