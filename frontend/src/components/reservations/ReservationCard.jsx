import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ImageOff } from "lucide-react";

import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

import { AMENITIES_MAP } from "../../../utils/amenities";
import { useTranslation } from "react-i18next";

export default function ReservationCard({ reservation, onCancel }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const isCanceled = reservation.status === "CANCELED";
  const isPaid = reservation.paid;

  const borderColor = isCanceled
    ? "border-red-500"
    : isPaid
    ? "border-green-500"
    : "border-yellow-400";

  const MODE_LABEL = {
    HOURLY: t("reservationCommon.byHour"),
    DAILY: t("reservationCommon.daily"),
    MONTHLY: t("reservationCommon.monthly"),
  };

  return (
    <Card className={`p-6 border-l-8 ${borderColor}`}>
      <div className="grid md:grid-cols-[1fr_260px] gap-6">
        {/* INFO */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">
              {reservation.workspace.name}
            </h3>

            <Badge
              className={
                isCanceled
                  ? "bg-red-100 text-red-700"
                  : isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {isCanceled
                ? t("reservationCommon.canceled")
                : isPaid
                ? t("reservationCommon.paid")
                : t("reservationCommon.pending")}
            </Badge>
          </div>

          <p className="text-sm text-gray-500">
            {reservation.workspace.address}
          </p>

          <div className="flex gap-3 text-sm">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
              {MODE_LABEL[reservation.mode]}
            </span>

            <span>{format(new Date(reservation.date), "dd/MM/yyyy")}</span>
          </div>

          <p className="text-lg font-bold">R$ {reservation.total.toFixed(2)}</p>

          <div className="flex flex-wrap gap-1">
            {reservation.workspace.amenities.slice(0, 6).map((a) => {
              const amenity = AMENITIES_MAP[a];
              if (!amenity) return null;
              const Icon = amenity.icon;
              return (
                <div
                  key={a}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span>{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex flex-col gap-3 items-end">
          {reservation.workspace.images?.[0] && !imageError ? (
            <img
              src={reservation.workspace.images[0]}
              alt={t("reservationCommon.imageUnavailable")}
              className="w-56 h-32 object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-56 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500">
              <ImageOff className="w-6 h-6 mb-1" />
              <span className="text-sm">
                {t("reservationCommon.imageUnavailable")}
              </span>
            </div>
          )}

          <div className="flex gap-2 w-full">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => navigate(`/my-reservations/${reservation.id}`)}
            >
              {t("reservationCommon.details")}
            </Button>

            {!isPaid && !isCanceled && (
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate(`/payment/${reservation.id}`)}
              >
                {t("reservationCommon.pay")}
              </Button>
            )}
          </div>

          {!isCanceled && !isPaid && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => onCancel(reservation.id)}
            >
              {t("reservationCommon.cancelReservation")}
            </Button>
          )}

          {isCanceled && (
            <Button variant="destructive" className="w-full" disabled>
              {t("reservationCommon.reservationCanceled")}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
