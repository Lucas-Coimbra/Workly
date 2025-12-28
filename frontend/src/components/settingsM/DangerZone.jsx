import { Card, Button } from "@/components/ui";
import { AlertCircle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DangerZone({ onDelete }) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 border-red-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-gray-900">{t("dangerZone.title")}</h2>
          <p className="text-sm text-gray-600">{t("dangerZone.subtitle")}</p>
        </div>
      </div>

      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-gray-900 mb-2">{t("dangerZone.deleteTitle")}</h3>

        <p className="text-sm text-gray-700 mb-4">
          {t("dangerZone.deleteWarning")}
        </p>

        <Button
          variant="outline"
          className="bg-white border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t("dangerZone.deleteButton")}
        </Button>
      </div>
    </Card>
  );
}
