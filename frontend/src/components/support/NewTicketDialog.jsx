import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Send } from "lucide-react";
import { SUPPORT_PRIORITY } from "../../constants/support.constants";

export default function TicketDialog({ onSubmit, trigger, loading = false }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPriority("");
    setDescription("");
  };

  const handleSubmit = async () => {
    if (!title || !category || !priority || !description) return;
    if (loading) return;

    await onSubmit({ title, category, priority, description });
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>{t("ticketDialog.openTitle")}</DialogTitle>
          <DialogDescription>
            {t("ticketDialog.openDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Título */}
          <div>
            <Label>{t("ticketDialog.fields.title")}</Label>
            <Input
              placeholder={t("ticketDialog.fields.titlePlaceholder")}
              className="mt-2 bg-gray-100 border-gray-300 focus:bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Categoria & Prioridade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("ticketDialog.fields.category")}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2 bg-gray-100 border-gray-300 focus:bg-white">
                  <SelectValue
                    placeholder={t("ticketDialog.fields.categoryPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">
                    {t("ticketDialog.categories.technical")}
                  </SelectItem>
                  <SelectItem value="billing">
                    {t("ticketDialog.categories.billing")}
                  </SelectItem>
                  <SelectItem value="reservation">
                    {t("ticketDialog.categories.reservation")}
                  </SelectItem>
                  <SelectItem value="space">
                    {t("ticketDialog.categories.space")}
                  </SelectItem>
                  <SelectItem value="general">
                    {t("ticketDialog.categories.general")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t("ticketDialog.fields.priority")}</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-2 bg-gray-100 border-gray-300 focus:bg-white">
                  <SelectValue
                    placeholder={t("ticketDialog.fields.priority")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SUPPORT_PRIORITY.HIGH}>
                    {t("ticketDialog.priorities.high")}
                  </SelectItem>
                  <SelectItem value={SUPPORT_PRIORITY.MEDIUM}>
                    {t("ticketDialog.priorities.medium")}
                  </SelectItem>
                  <SelectItem value={SUPPORT_PRIORITY.LOW}>
                    {t("ticketDialog.priorities.low")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label>{t("ticketDialog.fields.description")}</Label>
            <Textarea
              placeholder={t("ticketDialog.fields.descriptionPlaceholder")}
              className="mt-2 min-h-[150px] bg-gray-100 border-gray-300 focus:bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end pt-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Send className="w-4 h-4 mr-2" />
              {loading
                ? t("ticketDialog.actions.sending")
                : t("ticketDialog.actions.sendTicket")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
