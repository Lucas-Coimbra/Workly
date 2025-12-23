import { ArrowDownRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { Card, Button } from "../ui";

export default function TransactionsHistory({ transactions, onViewAll }) {
  const getTransactionIcon = (type) => {
    switch (type) {
      case "add":
        return <ArrowDownRight className="w-4 h-4 text-green-600" />;
      case "withdraw":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "usage":
        return <Minus className="w-4 h-4 text-orange-600" />;
      case "refund":
        return <Plus className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "add":
        return "text-green-600";
      case "withdraw":
        return "text-red-600";
      case "usage":
        return "text-orange-600";
      case "refund":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">Histórico de Créditos</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                {getTransactionIcon(tx.type)}
              </div>
              <div>
                <p className="text-sm text-gray-900">{tx.description}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
            </div>
            <div className={`text-right ${getTransactionColor(tx.type)}`}>
              <p className="font-medium">
                {tx.amount > 0 ? "+" : ""}R$ {Math.abs(tx.amount).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">{tx.id}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-4" onClick={onViewAll}>
        Ver Histórico Completo
      </Button>
    </Card>
  );
}
