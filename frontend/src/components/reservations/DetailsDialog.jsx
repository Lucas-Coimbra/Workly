import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Users, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import { AMENITIES_MAP } from "../../../utils/amenities";
import { useTranslation } from "react-i18next";

export function DetailsDialog({ space, onClose, onReserve }) {
  const { t } = useTranslation();
  const [mode, setMode] = useState(null);
  if (!space) return null;

  const amenities = Array.isArray(space.amenities) ? space.amenities : [];

  const fullAddress = [
    space.street,
    space.number && `nº ${space.number}`,
    space.neighborhood,
    space.city && `${space.city}${space.state ? "/" + space.state : ""}`,
  ]
    .filter(Boolean)
    .join(", ");

  const reservationModes = [
    space.pricePerHour && {
      key: "HOURLY",
      label: t("detailsDialog.byHour"),
      price: space.pricePerHour,
      unit: "/hora",
    },
    space.pricePerDay && {
      key: "DAILY",
      label: t("detailsDialog.byDay"),
      price: space.pricePerDay,
      unit: "/dia",
    },
    space.pricePerMonth && {
      key: "MONTHLY",
      label: t("detailsDialog.monthly"),
      price: space.pricePerMonth,
      unit: "/mês",
    },
  ].filter(Boolean);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh] p-0 bg-white rounded-xl shadow-xl flex flex-col">
        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-xl">{space.name}</DialogTitle>
          <DialogDescription>
            {t("detailsDialog.chooseReservationMode")}
          </DialogDescription>
        </DialogHeader>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Imagem */}
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <MapPin className="w-24 h-24 text-blue-500" />
          </div>

          {/* Endereço */}
          {fullAddress && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {fullAddress}
            </div>
          )}

          {/* Informações básicas */}
          <div className="grid grid-cols-2 gap-4">
            {space.capacity && (
              <div>
                <Label>{t("detailsDialog.capacity")}</Label>
                <p className="text-sm flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4" />
                  {space.capacity}{" "}
                  {space.capacity === 1
                    ? t("detailsDialog.room")
                    : t("detailsDialog.rooms")}
                </p>
              </div>
            )}

            {space.spaceType && (
              <div>
                <Label>{t("detailsDialog.type")}</Label>
                <p className="text-sm flex items-center gap-2 text-gray-700">
                  <Building2 className="w-4 h-4" />
                  {space.spaceType}
                </p>
              </div>
            )}

            {space.totalRooms && (
              <div>
                <Label>{t("detailsDialog.totalRooms")}</Label>
                <p className="text-sm flex items-center gap-2 text-gray-700">
                  {space.totalRooms}{" "}
                  {space.totalRooms === 1
                    ? t("detailsDialog.room")
                    : t("detailsDialog.rooms")}
                </p>
              </div>
            )}
          </div>

          {/* MODOS DE RESERVA */}
          <div>
            <Label className="mb-3 block">
              {t("detailsDialog.reservationMode")}
            </Label>

            <div className="grid grid-cols-3 gap-3">
              {reservationModes.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMode(m.key)}
                  className={`
                    border rounded-lg p-4 text-left transition
                    ${
                      mode === m.key
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-400"
                    }
                  `}
                >
                  <p className="text-sm font-medium text-gray-800">{m.label}</p>

                  <p className="text-lg font-semibold text-blue-600 mt-1">
                    R$ {m.price}
                    <span className="text-sm font-normal text-gray-600">
                      {m.unit}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Comodidades */}
          {amenities.length > 0 && (
            <div>
              <Label className="mb-3 block">
                {t("detailsDialog.amenities")}
              </Label>

              <div className="max-h-56 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((id) => {
                    const amenity = AMENITIES_MAP[id];
                    if (!amenity) return null;

                    const Icon = amenity.icon;

                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Icon size={16} className="text-blue-600" />
                        {amenity.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t shrink-0 bg-white">
          <Button
            disabled={!mode}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            onClick={() => onReserve(mode)}
          >
            {t("detailsDialog.continueReservation")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
