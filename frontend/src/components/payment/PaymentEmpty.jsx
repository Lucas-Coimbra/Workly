import { useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { MapPin } from "lucide-react";

export default function PaymentEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-160px)] px-4">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-orange-600" />
        </div>

        <h2 className="text-gray-900 mb-2">Nenhuma Reserva Selecionada</h2>

        <p className="text-gray-600 mb-6">
          Para realizar um pagamento, você precisa primeiro fazer uma reserva.
        </p>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate?.("/reservations")}
        >
          Fazer uma Reserva
        </Button>
      </Card>
    </div>
  );
}
