import { useState, useEffect } from "react";
import { Card, Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaymentEmpty from "../components/payment/PaymentEmpty";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import PaymentMethodSelector from "../components/payment/PaymentMethodSelector";
import PaymentSummary from "../components/payment/PaymentSummary";
import { useNavigate, useParams } from "react-router-dom";

import {
  getReservationById,
  markReservationPaidByUser,
} from "../services/reservation.service";

export default function Payment({ onLogout }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    async function fetchReservation() {
      if (!id) {
        setLoading(false); // Não há id, não precisa carregar reserva
        return;
      }

      try {
        const data = await getReservationById(id);
        setReservationData({
          ...data,
          spaceName: data.workspace.name,
          spaceType: data.mode,
          workspaceAddress: data.workspace.address,
          date: new Date(data.date).toLocaleDateString("pt-BR"),
          startTime: data.startTime
            ? new Date(data.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          endTime: data.endTime
            ? new Date(data.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          capacity: data.workspace.capacity || 1,
          pricePerHour: data.workspace.pricePerHour || data.total,
          duration: data.duration || 1,
          total: data.total,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [id]);

  if (loading) return <p className="p-8">Carregando...</p>;

  // safeReservation calculado antes de qualquer uso
  const computedTotal = (() => {
    const price = Number(reservationData?.pricePerHour) || 0;
    if (typeof reservationData?.duration === "number")
      return price * reservationData.duration;

    const startStr = reservationData?.startTime || "09:00";
    const endStr = reservationData?.endTime || "10:00";
    const [sh] = startStr.split(":").map((n) => parseInt(n, 10) || 0);
    const [eh] = endStr.split(":").map((n) => parseInt(n, 10) || 0);
    const hours = Math.max(0.5, eh - sh || 1);
    return price * hours;
  })();

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

  if (!reservationData && !paymentSuccess)
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
        <PaymentSuccess safeReservation={safeReservation} />
        <Footer />
      </div>
    );

  const handlePayment = async () => {
    const needsCard = paymentMethod !== "pix";

    if (
      needsCard &&
      (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)
    ) {
      return;
    }

    setIsProcessing(true);

    try {
      await markReservationPaidByUser(safeReservation.id);
      setPaymentSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar o pagamento.");
    } finally {
      setIsProcessing(false);
    }
  };

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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
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
