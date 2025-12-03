import { useState } from "react";
import { Input, Label, Button } from "@/components/ui";
import {
  QrCode,
  Shield,
  Wallet,
  Clock,
  CheckCircle,
  AlertCircle,
  Check,
} from "lucide-react";

export default function PaymentMethodForms({
  paymentMethod,
  secondaryMethod,
  cardData,
  setCardData,
  safeReservation,
  accountBalance,
  onNavigate,
}) {
  const total = safeReservation?.total ?? 0;
  const accountCovers = accountBalance >= total;

  const [copied, setCopied] = useState(false);

  //--- Form handlers --------------------------------------------------

  const handleCardNumber = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 16);
    const grouped = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardData((s) => ({ ...s, number: grouped }));
  };

  const handleExpiry = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      cleaned.length >= 3
        ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
        : cleaned;
    setCardData((s) => ({ ...s, expiry: formatted }));
  };

  const handleCvv = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardData((s) => ({ ...s, cvv: cleaned }));
  };

  const needsCardPanel =
    paymentMethod === "credit" ||
    paymentMethod === "debit" ||
    secondaryMethod === "credit" ||
    secondaryMethod === "debit";

  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm mt-6">
      {/*-------- CARTÃO --------*/}
      {needsCardPanel && (
        <div className="space-y-4">
          <div>
            <Label>Número do Cartão</Label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={handleCardNumber}
              className="mt-1"
              maxLength={19}
            />
          </div>

          <div>
            <Label>Nome no Cartão</Label>
            <Input
              type="text"
              placeholder="NOME COMPLETO"
              value={cardData.name}
              onChange={(e) =>
                setCardData((s) => ({
                  ...s,
                  name: e.target.value.toUpperCase(),
                }))
              }
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Validade</Label>
              <Input
                type="text"
                placeholder="MM/AA"
                value={cardData.expiry}
                onChange={handleExpiry}
                maxLength={5}
                className="mt-1"
              />
            </div>

            <div>
              <Label>CVV</Label>
              <Input
                type="text"
                placeholder="123"
                value={cardData.cvv}
                onChange={handleCvv}
                maxLength={4}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-gray-700">
              <strong>Pagamento seguro:</strong> Seus dados são protegidos com
              criptografia SSL de 256 bits.
            </p>
          </div>
        </div>
      )}

      {/*-------- PIX --------*/}
      {(paymentMethod === "pix" || secondaryMethod === "pix") && (
        <div className="text-center space-y-4">
          <div className="w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mt-2">
            <QrCode className="w-32 h-32 text-gray-400" />
          </div>

          <p className="text-sm text-gray-600">
            Escaneie o QR Code acima com o aplicativo do seu banco
          </p>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <Label className="text-gray-700">Ou use a chave PIX:</Label>

            <div className="flex items-center gap-2 mt-2">
              <Input readOnly value="pix@workly.com.br" className="bg-white" />

              <Button
                variant={copied ? "default" : "outline"}
                className={
                  copied ? "bg-green-600 text-white flex gap-1" : "flex gap-1"
                }
                onClick={() => {
                  navigator.clipboard.writeText("pix@workly.com.br");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied && <Check className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
            <p className="text-sm text-gray-700 text-left">
              Pagamento via PIX é instantâneo. Sua reserva será confirmada
              automaticamente.
            </p>
          </div>
        </div>
      )}

      {/*-------- CRÉDITOS --------*/}
      {paymentMethod === "account" && (
        <div className="mt-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900">Saldo Disponível</span>
              </div>
              <span className="text-2xl text-blue-600">
                R$ {accountBalance.toFixed(2)}
              </span>
            </div>
          </div>

          {!accountCovers ? (
            <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mt-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <p className="text-sm text-gray-700">
                <strong>Saldo insuficiente.</strong> Parte será paga por outro
                método.
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mt-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-sm text-gray-700">
                <strong>Saldo suficiente!</strong> A reserva será paga
                totalmente com créditos.
              </p>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => onNavigate?.("profile")}
          >
            Adicionar Créditos
          </Button>
        </div>
      )}
    </div>
  );
}
