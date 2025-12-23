import { Wallet, Plus, Minus } from "lucide-react";
import { Card, Button } from "../ui";

export default function CreditCard({
  accountBalance,
  onAddClick,
  onWithdrawClick,
}) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
      <div className="flex items-center gap-2 mb-2">
        <Wallet className="w-5 h-5" />
        <h3 className="text-white">Créditos da Conta</h3>
      </div>
      <p className="text-3xl mb-4">R$ {accountBalance.toFixed(2)}</p>

      <div className="flex gap-2">
        <Button
          onClick={onAddClick}
          className="flex-1 bg-white text-blue-600 hover:bg-blue-50"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </Button>
        <Button
          onClick={onWithdrawClick}
          variant="outline"
          className="flex-1 border-white text-white hover:bg-white/10"
          size="sm"
        >
          <Minus className="w-4 h-4 mr-1" />
          Retirar
        </Button>
      </div>
    </Card>
  );
}
