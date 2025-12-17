const plansData = [
  {
    name: "Basic",
    price: "Free",
    period: "/mês",
    description: "Ideal para começar",
    features: [
      "Até 30 membros",
      "10 espaços",
      "Suporte por email",
      "Relatórios básicos",
    ],
  },
  {
    name: "Gold",
    price: "R$ 199",
    period: "/mês",
    description: "Para negócios em crescimento",
    features: [
      "Até 100 membros",
      "Espaços ilimitados",
      "Suporte prioritário",
      "Análises avançadas",
      "API de integração",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "Customizado",
    period: "",
    description: "Soluções personalizadas",
    features: [
      "Membros ilimitados",
      "Tudo do Professional",
      "Suporte dedicado 24/7",
      "Treinamento personalizado",
      "SLA garantido",
    ],
  },
];

import { useNavigate } from "react-router-dom";

export default function Plans() {
  const navigate = useNavigate();
  return (
    <section id="plans" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Planos para todos os tamanhos
          </h2>
          <p className="text-gray-600 text-lg">
            Escolha o plano perfeito para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plansData.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-xl border-2 ${
                plan.popular
                  ? "border-blue-600 scale-105 shadow-lg"
                  : "border-gray-200 hover:shadow-md"
              } transition-transform duration-200`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-md tracking-wide">
                  Mais Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-extrabold text-blue-600 mb-2">
                {plan.price}{" "}
                <span className="text-base text-gray-600">{plan.period}</span>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-gray-800 text-sm"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/register")}
                className={`${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-gray-100 text-gray-800"
                } w-full py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200`}
              >
                Começar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
