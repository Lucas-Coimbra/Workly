import { Card, Label, Button } from "@/components/ui";
import { Bell, Mail, Smartphone } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch";

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
  const notifications = [
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: "Notificações por E-mail",
      description: "Receba atualizações por e-mail",
      value: emailNotifications,
      setter: setEmailNotifications,
    },
    {
      icon: <Smartphone className="w-4 h-4 text-gray-500" />,
      label: "Notificações por SMS",
      description: "Receba alertas por mensagem de texto",
      value: smsNotifications,
      setter: setSmsNotifications,
    },
    {
      icon: <Bell className="w-4 h-4 text-gray-500" />,
      label: "Lembretes de Reserva",
      description: "Receba lembretes antes das suas reservas",
      value: reservationReminders,
      setter: setReservationReminders,
    },
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: "E-mails Promocionais",
      description: "Receba ofertas e novidades",
      value: promotionalEmails,
      setter: setPromotionalEmails,
    },
    {
      icon: <Mail className="w-4 h-4 text-gray-500" />,
      label: "Relatório Semanal",
      description: "Resumo semanal de suas atividades",
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
          <h2 className="text-gray-900">Notificações</h2>
          <p className="text-sm text-gray-600">
            Configure como deseja receber notificações
          </p>
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
              <div className="border-t border-gray-200 my-2"></div>
            )}
          </div>
        ))}
      </div>

      <Button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        onClick={handleSaveNotifications}
      >
        Salvar Preferências de Notificação
      </Button>
    </Card>
  );
}
