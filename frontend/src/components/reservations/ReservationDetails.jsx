import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { ImageOff } from "lucide-react";

import Header from "../Header";

import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

import {
  getReservationById,
  cancelReservation,
} from "../../services/reservation.service";

import { AMENITIES_MAP } from "../../../utils/amenities";
import { useTranslation } from "react-i18next";

export default function ReservationDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getReservationById(id);
        setReservation(data);
      } catch (err) {
        toast.error(t("reservationShared.loadError"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, t]);

  const handleCancel = async () => {
    try {
      await cancelReservation(id);
      toast.success(t("reservationShared.canceledSuccess"));
      navigate("/my-reservations");
    } catch (err) {
      toast.error(
        err.response?.data?.message || t("reservationShared.canceledError")
      );
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <p className="p-10 text-center">{t("reservationShared.loading")}</p>
      </>
    );
  }

  if (!reservation) {
    return (
      <>
        <Header />
        <p className="p-10 text-center">{t("reservationShared.notFound")}</p>
      </>
    );
  }

  const isCanceled = reservation.status === "CANCELED";
  const isPaid = reservation.paid;
  const imageUrl = reservation.workspace.images?.[0];

  const MODE_LABEL = {
    HOURLY: t("reservationShared.byHour"),
    DAILY: t("reservationShared.daily"),
    MONTHLY: t("reservationShared.monthly"),
  };

  const STATUS_STYLE = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    CONFIRMED: "bg-green-100 text-green-700 border-green-300",
    CANCELED: "bg-red-100 text-red-700 border-red-300",
  };

  const STATUS_LABEL = {
    PENDING: t("reservationShared.pending"),
    CONFIRMED: t("reservationShared.confirmed"),
    CANCELED: t("reservationShared.canceled"),
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          {/* VOLTAR */}
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ← {t("reservationShared.back")}
          </Button>

          {/* HEADER DA RESERVA */}
          <Card className="overflow-hidden shadow-md">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={reservation.workspace.name}
                className="w-full h-64 object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col items-center justify-center text-indigo-500">
                <ImageOff className="w-10 h-10 mb-2" />
                <span className="text-sm">
                  {t("reservationShared.imageUnavailable")}
                </span>
              </div>
            )}

            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {reservation.workspace.name}
                </h1>
                <p className="text-gray-500">{reservation.workspace.address}</p>
              </div>

              <Badge className={`border ${STATUS_STYLE[reservation.status]}`}>
                {STATUS_LABEL[reservation.status]}
              </Badge>
            </div>
          </Card>

          {/* CONTEÚDO */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* INFO */}
            <Card className="p-6 space-y-6 md:col-span-2 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("reservationShared.reservationInfo")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>{t("reservationShared.date")}:</strong>{" "}
                  {format(new Date(reservation.date), "dd/MM/yyyy")}
                </p>

                <p>
                  <strong>{t("reservationShared.type")}:</strong>{" "}
                  {MODE_LABEL[reservation.mode]}
                </p>

                {reservation.startTime && (
                  <p>
                    <strong>{t("reservationShared.time")}:</strong>{" "}
                    {format(new Date(reservation.startTime), "HH:mm")} às{" "}
                    {format(new Date(reservation.endTime), "HH:mm")}
                  </p>
                )}
              </div>

              {/* AMENITIES */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">
                  {t("reservationShared.amenities")}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {reservation.workspace.amenities.map((a) => {
                    const amenity = AMENITIES_MAP[a];
                    if (!amenity) return null;
                    const Icon = amenity.icon;

                    return (
                      <div
                        key={a}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* VALOR / AÇÕES */}
            <Card className="p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("reservationShared.reservationValue")}
                </h2>

                <p className="text-4xl font-bold text-indigo-600 mb-1">
                  R$ {reservation.total.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  {MODE_LABEL[reservation.mode]}
                </p>

                {!isCanceled && !isPaid && (
                  <Badge className="bg-yellow-100 text-yellow-700">
                    {t("reservationShared.paymentPending")}
                  </Badge>
                )}

                {!isCanceled && isPaid && (
                  <Badge className="border border-gray-300 text-gray-700 bg-gray-50">
                    {t("reservationShared.reservationPaid")}
                  </Badge>
                )}

                {isCanceled && (
                  <Badge className="bg-red-100 text-red-700">
                    {t("reservationShared.reservationCanceled")}
                  </Badge>
                )}
              </div>

              <div className="space-y-3 mt-6">
                {!isPaid && !isCanceled && (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => navigate(`/payment/${reservation.id}`)}
                  >
                    {t("reservationShared.goToPayment")}
                  </Button>
                )}

                {!isCanceled && !isPaid && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleCancel}
                  >
                    {t("reservationShared.cancelReservation")}
                  </Button>
                )}

                {(isCanceled || isPaid) && (
                  <Button className="w-full" disabled>
                    {isCanceled
                      ? t("reservationShared.reservationCanceled")
                      : t("reservationShared.reservationPaid")}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
