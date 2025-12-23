import { Card, Button, Input, Label } from "../../ui";
import { Plus, X } from "lucide-react";

export default function AddCreditsModal({
  open,
  onClose,
  creditAmount,
  setCreditAmount,
  onAdd,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-gray-900">Adicionar Créditos</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <Label>Valor a Adicionar (R$)</Label>
            <Input
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={onAdd}
              disabled={!creditAmount || parseFloat(creditAmount) <= 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Créditos
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
