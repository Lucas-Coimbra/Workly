export default function WhyWorkly() {
  const items = [
    {
      icon: "💰",
      title: "Aumente sua Receita",
      description: "Monetize espaços ociosos e aumente seus ganhos",
    },
    {
      icon: "👥",
      title: "Alcance Mais Clientes",
      description: "Acesso a uma rede crescente de profissionais",
    },
    {
      icon: "📊",
      title: "Gestão Simplificada",
      description: "Plataforma completa para gerenciar reservas e pagamentos",
    },
    {
      icon: "🛡️",
      title: "Segurança Garantida",
      description: "Pagamentos seguros e suporte dedicado",
    },
  ];

  return (
    <section className="mt-[64px] mb-[80px]">
      <h2 className="text-[26px] font-[700] text-[#111827] text-center mb-[36px]">
        Por que cadastrar no Workly?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {items.map((item) => (
          <div
            key={item.title}
            className="
              bg-white
              rounded-[18px]
              px-[24px]
              py-[22px]
              text-center
              shadow-[0_6px_18px_rgba(0,0,0,0.06)]
              flex flex-col
              items-center
            "
          >
            <div className="text-[52px] mb-[14px]">{item.icon}</div>

            <h3 className="text-[20px] font-[700] text-[#111827] mb-[8px]">
              {item.title}
            </h3>

            <p className="text-[15px] text-[#4b5563] leading-[1.7] max-w-[260px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
