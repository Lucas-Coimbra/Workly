import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  Input,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
  loading,
  error,
}) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!open) {
      setPassword("");
      setShow(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />

      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle>{t("deleteAccount.title")}</DialogTitle>
          </div>

          <DialogDescription className="pt-2 text-sm text-gray-600">
            {t("deleteAccount.description")}
          </DialogDescription>
        </DialogHeader>

        {/* Senha */}
        <div className="relative mt-4">
          <Input
            type={show ? "text" : "password"}
            placeholder={t("deleteAccount.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <DialogFooter className="gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {t("common.cancel")}
          </Button>

          <Button
            variant="destructive"
            disabled={!password || loading}
            onClick={() => onConfirm(password)}
          >
            {loading ? t("deleteAccount.loading") : t("deleteAccount.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
