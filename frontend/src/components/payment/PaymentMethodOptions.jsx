import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, QrCode } from "lucide-react";

export default function PaymentMethodOptions({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
      <h3 className="text-gray-900 mb-4 font-medium text-lg">
        Método de Pagamento
      </h3>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(v) => setPaymentMethod(v)}
      >
        <div className="space-y-3">
          {/* Crédito */}
          <label
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "credit"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="credit" id="credit" />
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-gray-900">Cartão de Crédito</div>
              <div className="text-sm text-gray-500">Visa, Mastercard, Elo</div>
            </div>
          </label>

          {/* Débito */}
          <label
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "debit"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="debit" id="debit" />
            <Building2 className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-gray-900">Cartão de Débito</div>
              <div className="text-sm text-gray-500">Débito em conta</div>
            </div>
          </label>

          {/* PIX */}
          <label
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "pix"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="pix" id="pix" />
            <QrCode className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-gray-900">PIX</div>
              <div className="text-sm text-gray-500">Pagamento instantâneo</div>
            </div>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
