import { Card, Button } from "@/components/ui";
import { CreditCard } from "lucide-react";

export default function PaymentMethods({ cards }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-gray-900">Métodos de Pagamento</h2>
          <p className="text-sm text-gray-600">
            Gerencie seus cartões e formas de pagamento
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((c, i) => (
          <div
            key={i}
            className="p-4 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-gray-900">
                  {c.brand} •••• {c.last4}
                </p>
                <p className="text-sm text-gray-600">Expira em {c.expiry}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 border-dashed">
        + Adicionar Novo Cartão
      </Button>
    </Card>
  );
}
