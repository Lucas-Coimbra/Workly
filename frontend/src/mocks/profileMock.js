// =========================
// Perfil do MEMBRO
// =========================

export const profileDataMock = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "+55 11 98765-4321",
  company: "Tech Solutions Ltda",
  position: "Desenvolvedor Senior",
  address: "Av. Paulista, 1000",
  city: "São Paulo",
  state: "SP",
  zipCode: "01310-100",
  bio: "Desenvolvedor apaixonado por tecnologia e inovação. Trabalho com desenvolvimento web há mais de 5 anos e adoro espaços colaborativos.",
};

// =========================
// Transações de crédito
// =========================

export const creditTransactionsMock = [
  {
    id: "TRX-001",
    type: "add",
    amount: 500,
    date: "20/11/2024",
    description: "Adição de créditos",
  },
  {
    id: "TRX-002",
    type: "usage",
    amount: -150,
    date: "22/11/2024",
    description: "Reserva - Sala de Reunião Premium",
  },
  {
    id: "TRX-003",
    type: "refund",
    amount: 90,
    date: "25/11/2024",
    description: "Reembolso - Cancelamento de reserva",
  },
  {
    id: "TRX-004",
    type: "usage",
    amount: -90,
    date: "27/11/2024",
    description: "Reserva - Estação de Trabalho 5",
  },
];

// =========================
// Estatísticas do membro
// =========================

export const statsMock = {
  memberSince: "Janeiro 2024",
  totalReservations: 24,
  hoursBooked: 86,
  favoriteSpace: "Sala de Reunião Premium",
  membershipLevel: "Gold",
  points: 1250,
};

// =========================
// Plano atual
// =========================

export const currentPlanMock = {
  name: "Gold",
  price: 199.0,
  period: "mensal",
  renewDate: "15/12/2024",
  features: [
    "20 horas de uso incluídas",
    "Acesso a todos os espaços",
    "Desconto de 15% em reservas extras",
    "Prioridade em reservas",
    "Suporte prioritário",
  ],
};

// =========================
// Planos disponíveis (PROFILE)
// =========================

export const planData = [
  {
    name: "Basic",
    price: 0,
    period: "mensal",
    description: "Plano para uso ocasional",
    features: [
      "5 horas de uso incluídas",
      "Acesso limitado aos espaços",
      "Sem prioridade em reservas",
      "Suporte básico",
    ],
  },
  {
    name: "Gold",
    price: 199,
    period: "mensal",
    description: "Plano mais popular entre membros",
    features: [
      "20 horas de uso incluídas",
      "Acesso a todos os espaços",
      "15% de desconto em horas extras",
      "Prioridade em reservas",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 399,
    period: "mensal",
    description: "Plano para uso intensivo",
    features: [
      "Horas ilimitadas",
      "Acesso VIP aos espaços",
      "Sem taxa em horas extras",
      "Prioridade máxima",
      "Suporte dedicado",
    ],
  },
];
