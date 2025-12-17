//Esses são os mocks da tela suporte do perfil do usuario
export const supportTickets = [
  {
    id: "#2847",
    title: "Internet instável na Sala A",
    category: "Técnico",
    priority: "high",
    status: "progress",
    createdAt: "03 Out 2025, 14:30",
    updatedAt: "1h atrás",
    description:
      "Estou enfrentando problemas de conexão intermitente durante reuniões importantes. A internet cai a cada 10-15 minutos.",
    responses: [
      {
        author: "João Silva",
        role: "Você",
        message:
          "Estou enfrentando problemas de conexão intermitente durante reuniões importantes. A internet cai a cada 10-15 minutos.",
        time: "03 Out, 14:30",
        isSupport: false,
      },
      {
        author: "Suporte Workly",
        role: "Equipe de Suporte",
        message:
          "Olá João! Obrigado por reportar o problema. Já encaminhei para nossa equipe técnica investigar a conexão na Sala A. Você poderia nos informar em qual período do dia isso aconteceu?",
        time: "03 Out, 15:15",
        isSupport: true,
      },
      {
        author: "João Silva",
        role: "Você",
        message:
          "Ocorreu principalmente entre 14h e 16h hoje. Tive que cancelar uma reunião com cliente por causa disso.",
        time: "03 Out, 15:45",
        isSupport: false,
      },
      {
        author: "Suporte Workly",
        role: "Equipe de Suporte",
        message:
          "Entendido. Nossa equipe técnica identificou um problema no roteador da Sala A e já está fazendo a substituição. Como compensação, vamos adicionar 5 horas extras no seu plano.",
        time: "03 Out, 17:20",
        isSupport: true,
      },
    ],
  },
  {
    id: "#2801",
    title: "Solicitação de upgrade de plano",
    category: "Financeiro",
    priority: "medium",
    status: "resolved",
    createdAt: "28 Set 2025, 10:15",
    updatedAt: "2 dias atrás",
    description:
      "Gostaria de fazer upgrade para o plano Premium e entender melhor os benefícios.",
    responses: [
      {
        author: "João Silva",
        role: "Você",
        message:
          "Gostaria de fazer upgrade para o plano Premium e entender melhor os benefícios.",
        time: "28 Set, 10:15",
        isSupport: false,
      },
      {
        author: "Suporte Workly",
        role: "Equipe de Suporte",
        message:
          "Olá João! Ficamos felizes com seu interesse no plano Premium. Os principais benefícios incluem: 100 horas mensais, acesso prioritário às salas, desconto de 20% em reservas extras, acesso a salas VIP e suporte prioritário.",
        time: "28 Set, 11:30",
        isSupport: true,
      },
      {
        author: "João Silva",
        role: "Você",
        message:
          "Sim, por favor! Gostaria de ver os valores e fazer a mudança ainda esta semana.",
        time: "28 Set, 12:00",
        isSupport: false,
      },
      {
        author: "Suporte Workly",
        role: "Equipe de Suporte",
        message:
          "Perfeito! Enviei a proposta por e-mail. O upgrade foi processado e seu plano Premium já está ativo. Aproveite os novos benefícios!",
        time: "28 Set, 14:45",
        isSupport: true,
      },
    ],
  },
  {
    id: "#2785",
    title: "Dúvida sobre cobrança",
    category: "Financeiro",
    priority: "low",
    status: "resolved",
    createdAt: "22 Set 2025, 16:20",
    updatedAt: "1 semana atrás",
    description:
      "Vi uma cobrança extra no meu cartão referente ao mês passado. Podem verificar?",
    responses: [
      {
        author: "João Silva",
        role: "Você",
        message:
          "Vi uma cobrança extra no meu cartão referente ao mês passado. Podem verificar?",
        time: "22 Set, 16:20",
        isSupport: false,
      },
      {
        author: "Suporte Workly",
        role: "Equipe de Suporte",
        message:
          "Claro! Essa cobrança se refere a 8 horas adicionais utilizadas além do seu plano no mês de agosto. Deseja o detalhamento?",
        time: "22 Set, 17:05",
        isSupport: true,
      },
      {
        author: "João Silva",
        role: "Você",
        message: "Ah sim, agora me lembrei! Está tudo certo então. Obrigado!",
        time: "22 Set, 17:15",
        isSupport: false,
      },
    ],
  },
];
