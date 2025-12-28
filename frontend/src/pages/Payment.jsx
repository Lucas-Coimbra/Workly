import { useState } from "react";
import { Card, Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentEmpty from "../components/payment/PaymentEmpty";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import PaymentMethodSelector from "../components/payment/PaymentMethodSelector";
import PaymentSummary from "../components/payment/PaymentSummary";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reservationData = location.state?.reservationData;

  const computedTotal = reservationData
    ? (() => {
        const price = Number(reservationData.pricePerHour) || 0;
        if (typeof reservationData.duration === "number")
          return price * reservationData.duration;
        const startStr = reservationData.startTime || "09:00";
        const endStr = reservationData.endTime || "10:00";
        const [sh] = startStr.split(":").map((n) => parseInt(n, 10) || 0);
        const [eh] = endStr.split(":").map((n) => parseInt(n, 10) || 0);
        const hours = Math.max(0.5, eh - sh || 1);
        return price * hours;
      })()
    : 0;

  const safeReservation = reservationData
    ? {
        ...reservationData,
        pricePerHour: Number(reservationData.pricePerHour) || 0,
        total:
          typeof reservationData.total === "number"
            ? reservationData.total
            : computedTotal,
        duration: reservationData.duration ?? 1,
      }
    : null;

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    const needsCard = paymentMethod !== "pix";

    if (
      needsCard &&
      (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)
    ) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  if (!safeReservation && !paymentSuccess)
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          userType="member"
          navigate={navigate}
          onLogout={onLogout}
          currentPage="payment"
        />
        <PaymentEmpty navigate={navigate} />
        <Footer />
      </div>
    );

  if (paymentSuccess)
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          userType="member"
          navigate={navigate}
          onLogout={onLogout}
          currentPage="payment"
        />
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        navigate={navigate}
        onLogout={onLogout}
        currentPage="payment"
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-6 flex items-center"
              onClick={() => navigate("/reservations")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Reservas
            </Button>
          </div>

          <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg mb-6">
            <h2 className="text-2xl font-semibold">Finalizar Pagamento</h2>
            <p className="text-blue-100">
              Complete os dados para confirmar sua reserva
            </p>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                cardData={cardData}
                setCardData={setCardData}
                safeReservation={safeReservation}
              />
            </div>

            <div>
              <PaymentSummary
                safeReservation={safeReservation}
                paymentMethod={paymentMethod}
                cardData={cardData}
                isProcessing={isProcessing}
                handlePayment={handlePayment}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
