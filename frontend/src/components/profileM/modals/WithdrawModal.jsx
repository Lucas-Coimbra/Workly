import { Card, Button, Input, Label } from "../../ui";
import { Minus, X } from "lucide-react";

export default function WithdrawModal({
  open,
  onClose,
  withdrawAmount,
  setWithdrawAmount,
  accountBalance,
  onWithdraw,
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
            <h2 className="text-gray-900">Retirar Créditos</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <Label>Valor a Retirar (R$)</Label>
            <Input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="0"
              step="0.01"
              max={accountBalance}
            />
            <p className="text-sm text-gray-600">
              Saldo disponível: <strong>R$ {accountBalance.toFixed(2)}</strong>
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={onWithdraw}
              disabled={
                !withdrawAmount ||
                parseFloat(withdrawAmount) <= 0 ||
                parseFloat(withdrawAmount) > accountBalance
              }
            >
              <Minus className="w-4 h-4 mr-2" />
              Solicitar Saque
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
