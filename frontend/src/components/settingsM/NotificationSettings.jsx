import { Card, Label, Button } from "@/components/ui";
import { Bell, Mail, Smartphone } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";
import { useTranslation } from "react-i18next";

export default function NotificationSettings({
  emailNotifications,
  setEmailNotifications,
  smsNotifications,
  setSmsNotifications,
  reservationReminders,
  setReservationReminders,
  promotionalEmails,
  setPromotionalEmails,
  weeklyReport,
  setWeeklyReport,
  handleSaveNotifications,
}) {
  const { t } = useTranslation();

  const notifications = [
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: t("notifications.email.label"),
      description: t("notifications.email.description"),
      value: emailNotifications,
      setter: setEmailNotifications,
    },
    {
      icon: <Smartphone className="w-4 h-4 text-gray-500" />,
      label: t("notifications.sms.label"),
      description: t("notifications.sms.description"),
      value: smsNotifications,
      setter: setSmsNotifications,
    },
    {
      icon: <Bell className="w-4 h-4 text-gray-500" />,
      label: t("notifications.reservation.label"),
      description: t("notifications.reservation.description"),
      value: reservationReminders,
      setter: setReservationReminders,
    },
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: t("notifications.promo.label"),
      description: t("notifications.promo.description"),
      value: promotionalEmails,
      setter: setPromotionalEmails,
    },
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: t("notifications.weekly.label"),
      description: t("notifications.weekly.description"),
      value: weeklyReport,
      setter: setWeeklyReport,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Bell className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-gray-900">{t("notifications.title")}</h2>
          <p className="text-sm text-gray-600">{t("notifications.subtitle")}</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((n, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {n.icon}
                <div>
                  <Label className="text-gray-900">{n.label}</Label>
                  <p className="text-sm text-gray-600">{n.description}</p>
                </div>
              </div>
              <ToggleSwitch isChecked={n.value} onChange={n.setter} />
            </div>

            {idx < notifications.length - 1 && (
              <div className="border-t border-gray-200 my-2" />
            )}
          </div>
        ))}
      </div>

      <Button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        onClick={handleSaveNotifications}
      >
        {t("notifications.save")}
      </Button>
    </Card>
  );
}
