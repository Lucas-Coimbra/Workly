import React from "react";

const featuresData = [
  {
    icon: "📅",
    title: "Reservas Inteligentes",
    description:
      "Sistema de reservas em tempo real com calendário integrado e notificações automáticas.",
  },
  {
    icon: "💳",
    title: "Pagamentos Seguros",
    description:
      "Múltiplos métodos de pagamento com processamento seguro e relatórios detalhados.",
  },
  {
    icon: "📊",
    title: "Análises Avançadas",
    description:
      "Dashboards completos com métricas de ocupação, receita e performance em tempo real.",
  },
  {
    icon: "🏢",
    title: "Gestão de Espaços",
    description:
      "Gerencie salas, mesas e recursos de forma visual e intuitiva.",
  },
  {
    icon: "👥",
    title: "Gestão de Membros",
    description:
      "Controle completo de usuários, planos e acessos em uma interface simples.",
  },
  {
    icon: "🎯",
    title: "Suporte 24/7",
    description:
      "Equipe dedicada pronta para ajudar você e seus membros a qualquer momento.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-gray-600 text-lg">
            Recursos poderosos para transformar a gestão do seu coworking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
