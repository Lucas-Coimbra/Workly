import { Card, Switch, Label, Separator, Button } from "../ui";
import { Bell, Mail, Smartphone } from "lucide-react";

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <Label className="text-gray-900">Notificações por E-mail</Label>
              <p className="text-sm text-gray-600">
                Receba atualizações por e-mail
              </p>
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-gray-500" />
            <div>
              <Label className="text-gray-900">Notificações por SMS</Label>
              <p className="text-sm text-gray-600">
                Receba alertas por mensagem de texto
              </p>
            </div>
          </div>
          <Switch
            checked={smsNotifications}
            onCheckedChange={setSmsNotifications}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-500" />
            <div>
              <Label className="text-gray-900">Lembretes de Reserva</Label>
              <p className="text-sm text-gray-600">
                Receba lembretes antes das suas reservas
              </p>
            </div>
          </div>
          <Switch
            checked={reservationReminders}
            onCheckedChange={setReservationReminders}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <Label className="text-gray-900">E-mails Promocionais</Label>
              <p className="text-sm text-gray-600">
                Receba ofertas e novidades
              </p>
            </div>
          </div>
          <Switch
            checked={promotionalEmails}
            onCheckedChange={setPromotionalEmails}
          />
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <Label className="text-gray-900">Relatório Semanal</Label>
              <p className="text-sm text-gray-600">
                Resumo semanal de suas atividades
              </p>
            </div>
          </div>
          <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
        </div>
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
