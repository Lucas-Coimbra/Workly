import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { calculateHours } from "../../../utils/reservationUtils";
import { api } from "../../services/api";
import { useTranslation } from "react-i18next";

export default function ReservationFlowDialog({
  space,
  selectedDate,
  initialMode,
  onClose,
  onConfirm,
}) {
  const { t } = useTranslation();
  const [availableModes, setAvailableModes] = useState([]);
  const [prices, setPrices] = useState({});
  const [mode, setMode] = useState(initialMode ?? null);
  const [time, setTime] = useState({ start: "", end: "" });
  const [months, setMonths] = useState(1);

  /* ===============================
     Fetch reservation modes
  =============================== */
  useEffect(() => {
    if (!space?.id) return;

    api
      .get(`/workspaces/${space.id}/reservation-modes`)
      .then((res) => {
        setAvailableModes(res.data.availableModes);
        setPrices(res.data.prices);
      })
      .catch(() => {
        setAvailableModes([]);
      });
  }, [space]);

  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  /* ===============================
     Total calculation
  =============================== */
  const total = useMemo(() => {
    if (!mode) return 0;

    if (mode === "HOURLY") {
      const hours = calculateHours(time.start, time.end);
      return hours > 0 ? hours * (prices.hourly ?? 0) : 0;
    }

    if (mode === "DAILY") return prices.daily ?? 0;
    if (mode === "MONTHLY") return months * (prices.monthly ?? 0);

    return 0;
  }, [mode, time, months, prices]);

  /* ===============================
     Confirm
  =============================== */
  const handleConfirm = () => {
    if (!mode || total <= 0) return;

    const payload = {
      workspaceId: space.id,
      mode,
      date: selectedDate.toISOString().split("T")[0],
      total,
    };

    if (mode === "HOURLY") {
      payload.startTime = time.start;
      payload.endTime = time.end;
    }

    if (mode === "MONTHLY") {
      payload.months = months;
    }

    onConfirm(payload);
  };

  if (!space) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh] p-0 bg-white rounded-xl shadow-xl flex flex-col">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>{t("reservationFlowDialog.reserveSpace")}</DialogTitle>
          <DialogDescription>
            {t("reservationFlowDialog.chooseTypeAndDetails")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Workspace summary */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-gray-900 mb-2">{space.name}</h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {space.capacity && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {space.capacity}{" "}
                  {space.capacity === 1
                    ? t("reservationFlowDialog.person")
                    : t("reservationFlowDialog.people")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {selectedDate.toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Mode selector */}
          <div>
            <Label className="mb-2 block">
              {t("reservationFlowDialog.reservationType")}
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {availableModes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`p-3 rounded-lg border text-sm transition
                    ${
                      mode === m
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {m === "HOURLY" && t("reservationFlowDialog.byHour")}
                  {m === "DAILY" && t("reservationFlowDialog.daily")}
                  {m === "MONTHLY" && t("reservationFlowDialog.monthly")}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly */}
          {mode === "HOURLY" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("reservationFlowDialog.start")}</Label>
                <Input
                  type="time"
                  value={time.start}
                  onChange={(e) =>
                    setTime((s) => ({ ...s, start: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>{t("reservationFlowDialog.end")}</Label>
                <Input
                  type="time"
                  value={time.end}
                  onChange={(e) =>
                    setTime((s) => ({ ...s, end: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {/* Monthly */}
          {mode === "MONTHLY" && (
            <div>
              <Label>{t("reservationFlowDialog.monthsQuantity")}</Label>
              <Input
                type="number"
                min={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex justify-between text-sm">
              <span>{t("reservationFlowDialog.total")}</span>
              <span className="text-blue-600 font-medium">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t shrink-0 bg-white">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!mode || total <= 0}
            onClick={handleConfirm}
          >
            {t("reservationFlowDialog.confirmReservation")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
