import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  Input,
  Button,
} from "@/components/ui";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function TwoFAModal({
  open,
  onClose,
  onConfirm,
  loading,
  error,
}) {
  const [code, setCode] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) setCode("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle>{t("twoFAModal.title")}</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-sm text-gray-600">
            {t("twoFAModal.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            placeholder={t("twoFAModal.placeholder")}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <DialogFooter className="mt-4 gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {t("twoFAModal.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirm(code)}
            disabled={loading || !code}
          >
            {loading ? t("twoFAModal.loading") : t("twoFAModal.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
