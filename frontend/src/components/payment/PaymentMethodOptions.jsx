import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, QrCode, Wallet } from "lucide-react";

export default function PaymentMethodOptions({
  paymentMethod,
  setPaymentMethod,
  secondaryMethod,
  setSecondaryMethod,
  accountBalance,
  total,
}) {
  const accountCovers = accountBalance >= total;

  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
      <h3 className="text-gray-900 mb-4 font-medium text-lg">
        Método de Pagamento
      </h3>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(v) => {
          if (v !== "account") setSecondaryMethod(null);
          setPaymentMethod(v);
        }}
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

          {/* Créditos */}
          <label
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "account"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="account" id="account" />
            <Wallet className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-gray-900">Créditos da Conta</div>
              <div className="text-sm text-gray-500">
                Disponível: R$ {accountBalance.toFixed(2)}
              </div>
            </div>
          </label>
        </div>
      </RadioGroup>

      {/* MÉTODO SECUNDÁRIO */}
      {paymentMethod === "account" && !accountCovers && (
        <div className="mt-5">
          <p className="text-sm text-gray-700 mb-2">
            Seus créditos serão usados parcialmente. Escolha como pagar o
            restante:
          </p>

          <div className="flex gap-2">
            {["credit", "debit", "pix"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSecondaryMethod(m)}
                className={`px-3 py-1.5 rounded-md border text-sm ${
                  secondaryMethod === m
                    ? "bg-blue-50 border-blue-600 text-gray-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {m === "credit" ? "Crédito" : m === "debit" ? "Débito" : "PIX"}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-3">
            Créditos: -R${accountBalance.toFixed(2)} — Restante: R$
            {(total - accountBalance).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
