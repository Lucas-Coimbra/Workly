import { Card, Button } from "../ui";
import { CheckCircle, Crown, Clock } from "lucide-react";

export default function PlanCard({ currentPlan, onChangePlan, disabled }) {
  return (
    <Card className="p-6 border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {/* Coroa */}
          <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5 text-yellow-900" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {currentPlan.name}
            </h3>
            <p className="text-gray-600">
              R$ {currentPlan.price} / {currentPlan.period}
            </p>
          </div>
        </div>

        {/* Botão alterar plano */}
        <Button
          onClick={onChangePlan}
          disabled={disabled}
          className={`
            border border-yellow-400 bg-white text-gray-900
            hover:bg-yellow-100
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Alterar plano
        </Button>
      </div>

      {/* Benefícios */}
      <ul className="mt-6 space-y-2">
        {currentPlan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Linha dourada (sem Separator) */}
      <div className="mt-6 h-px bg-yellow-300 opacity-70" />

      {/* Próxima renovação */}
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>
          Próxima renovação: <strong>15/04/2025</strong>
        </span>
      </div>
    </Card>
  );
}
