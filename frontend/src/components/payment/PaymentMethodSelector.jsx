import { useNavigate } from "react-router-dom";

import PaymentMethodOptions from "./PaymentMethodOptions";
import PaymentMethodForms from "./PaymentMethodForms";

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  secondaryMethod,
  setSecondaryMethod,
  cardData,
  setCardData,
  accountBalance,
  safeReservation,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* BLOCO SUPERIOR */}
      <PaymentMethodOptions
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        secondaryMethod={secondaryMethod}
        setSecondaryMethod={setSecondaryMethod}
        accountBalance={accountBalance}
        total={safeReservation?.total ?? 0}
      />

      {/* BLOCO INFERIOR */}
      <PaymentMethodForms
        paymentMethod={paymentMethod}
        secondaryMethod={secondaryMethod}
        cardData={cardData}
        setCardData={setCardData}
        safeReservation={safeReservation}
        accountBalance={accountBalance}
        navigate={navigate}
      />
    </div>
  );
}
