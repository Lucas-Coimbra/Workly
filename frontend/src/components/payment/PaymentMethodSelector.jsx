import { useNavigate } from "react-router-dom";

import PaymentMethodOptions from "./PaymentMethodOptions";
import PaymentMethodForms from "./PaymentMethodForms";

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  cardData,
  setCardData,
  safeReservation,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* BLOCO SUPERIOR */}
      <PaymentMethodOptions
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        total={safeReservation?.total ?? 0}
      />

      {/* BLOCO INFERIOR */}
      <PaymentMethodForms
        paymentMethod={paymentMethod}
        cardData={cardData}
        setCardData={setCardData}
        safeReservation={safeReservation}
        navigate={navigate}
      />
    </div>
  );
}
