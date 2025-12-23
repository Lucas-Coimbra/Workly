import { Card, Button, Badge } from "../ui";
import { CheckCircle, Crown, Zap, Star } from "lucide-react";

export default function PlanSelector({ plans, currentPlanName, onSelectPlan }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isCurrent = plan.name === currentPlanName;

        /* Ícones */
        const iconWrapperClass =
          plan.name === "Basic"
            ? "bg-gray-100 text-gray-600"
            : plan.name === "Gold"
            ? "bg-yellow-200 text-yellow-700"
            : "bg-purple-100 text-purple-600";

        /* Card */
        const cardStyle = isCurrent
          ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100"
          : plan.name === "Basic"
          ? "border-gray-200 hover:border-blue-300"
          : "border-purple-300 hover:border-purple-500";

        return (
          <Card
            key={plan.name}
            className={`relative p-6 border-2 transition-colors ${cardStyle}`}
          >
            {/* Badge Atual — totalmente passivo */}
            {isCurrent && (
              <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 border border-yellow-600 pointer-events-none">
                Atual
              </Badge>
            )}

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              {/* Ícone */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${iconWrapperClass}`}
              >
                {plan.name === "Basic" && <Zap className="w-8 h-8" />}
                {plan.name === "Gold" && <Crown className="w-8 h-8" />}
                {plan.name === "Premium" && <Star className="w-8 h-8" />}
              </div>

              {/* Nome */}
              <h3 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>

              {/* Preço */}
              <div className="mt-2">
                <p className="text-3xl font-extrabold text-gray-900">
                  R$ {plan.price}
                </p>
                <p className="text-sm text-gray-600">/{plan.period}</p>
              </div>
            </div>

            {/* Benefícios */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Botões */}
            <div className="mt-6">
              {isCurrent ? (
                <Button
                  disabled
                  className="w-full bg-yellow-500 text-white opacity-80 cursor-default"
                >
                  Plano Atual
                </Button>
              ) : plan.name === "Premium" ? (
                <Button
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => onSelectPlan(plan.name)}
                >
                  Fazer Upgrade
                </Button>
              ) : (
                <Button
                  className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
                  onClick={() => onSelectPlan(plan.name)}
                >
                  Selecionar
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
