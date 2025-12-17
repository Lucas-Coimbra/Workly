import { Card, Button } from "@/components/ui";
import { AlertCircle, Trash2 } from "lucide-react";

export default function DangerZone({ handleDeleteAccount }) {
  return (
    <Card className="p-6 border-red-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-gray-900">Zona de Perigo</h2>
          <p className="text-sm text-gray-600">Ações irreversíveis</p>
        </div>
      </div>

      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-gray-900 mb-2">Excluir Conta</h3>
        <p className="text-sm text-gray-700 mb-4">
          Uma vez que você excluir sua conta, não há como voltar atrás. Por
          favor, tenha certeza.
        </p>
        <Button
          variant="outline"
          className="bg-white border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleDeleteAccount}
        >
          <Trash2 className="w-4 h-4 mr-2" /> Excluir Minha Conta
        </Button>
      </div>
    </Card>
  );
}
