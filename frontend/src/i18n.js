import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "pt-BR": {
    translation: {
      preferences: "Preferências",
      preferencesDescription: "Personalize sua experiência",
      language: "Idioma",
      timezone: "Fuso Horário",
      currency: "Moeda",
      selectLanguage: "Selecione um idioma",
      selectTimezone: "Selecione um fuso horário",
      selectCurrency: "Selecione uma moeda",
      savePreferences: "Salvar Preferências",
      settings: "Configurações",
      settingsDescription:
        "Gerencie suas preferências e configurações da conta",
      loadingSettings: "Carregando configurações...",
      errorLoadSettings: "Erro ao carregar configurações",

      errors: {
        loadSettings: "Erro ao carregar configurações",
        saveNotification: "Erro ao salvar configurações de notificação",
        savePreferences: "Erro ao salvar preferências",
        passwordMismatch: "As senhas não coincidem",
        passwordEmpty: "Preencha todos os campos de senha",
        passwordTooShort: "A nova senha deve ter pelo menos 8 caracteres",
        securityUpdate: "Erro ao atualizar configurações de segurança",
        twoFAEnable: "Erro ao ativar 2FA",
        twoFADisable: "Erro ao solicitar código para desativar o 2FA",
        invalidCode: "Código inválido",
        incorrectPassword: "Senha incorreta",
      },

      dangerZone: {
        title: "Zona de Perigo",
        subtitle: "Ações irreversíveis",
        deleteTitle: "Excluir Conta",
        deleteWarning:
          "Uma vez que você excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.",
        deleteButton: "Excluir Minha Conta",
      },

      deleteAccount: {
        title: "Excluir conta",
        description:
          "Essa ação é irreversível. Para confirmar, digite sua senha.",
        passwordPlaceholder: "Senha atual",
        confirm: "Excluir conta",
        loading: "Excluindo...",
      },
      common: {
        cancel: "Cancelar",
        delete: "Excluir",
      },

      notifications: {
        title: "Notificações",
        subtitle: "Configure como deseja receber notificações",

        email: {
          label: "Notificações por E-mail",
          description: "Receba atualizações por e-mail",
        },
        sms: {
          label: "Notificações por SMS",
          description: "Receba alertas por mensagem de texto",
        },
        reservation: {
          label: "Lembretes de Reserva",
          description: "Receba lembretes antes das suas reservas",
        },
        promo: {
          label: "E-mails Promocionais",
          description: "Receba ofertas e novidades",
        },
        weekly: {
          label: "Relatório Semanal",
          description: "Resumo semanal de suas atividades",
        },

        save: "Salvar Preferências de Notificação",
      },

      saveMessage: {
        success: "Configurações salvas com sucesso!",
        error: "Ocorreu um erro ao salvar as configurações.",
      },

      security: {
        title: "Segurança",
        description: "Proteja sua conta",
        twoFactorAuth: {
          label: "Autenticação de Dois Fatores",
          description: "Adicione uma camada extra de segurança",
        },
        password: {
          currentLabel: "Senha Atual",
          newLabel: "Nova Senha",
          confirmLabel: "Confirmar Nova Senha",
          currentPlaceholder: "Digite sua senha atual",
          newPlaceholder: "Digite sua nova senha",
          confirmPlaceholder: "Confirme sua nova senha",
          note: "Mínimo de 8 caracteres",
          changeButton: "Alterar Senha",
        },
      },

      twoFAModal: {
        title: "Autenticação de Dois Fatores",
        description: "Insira o código enviado para o seu email para confirmar.",
        placeholder: "Código de verificação",
        cancel: "Cancelar",
        confirm: "Confirmar",
        loading: "Verificando...",
      },

      roles: {
        ADMIN: "Administrador",
        SUPPORT: "Suporte",
        MEMBER: "Membro",
      },
      plan: "Plano",
      nav: {
        Dashboard: "Dashboard",
        Espaços: "Espaços",
        Relatórios: "Relatórios",
        Tickets: "Tickets",
        Início: "Início",
        Reservas: "Reservas",
        Pagamentos: "Pagamentos",
        Histórico: "Histórico",
        Suporte: "Suporte",
      },
      headerNotifications: {
        title: "Notificações",
        markAll: "Marcar todas como lidas",
        none: "Nenhuma notificação",
        defaultTitle: "Notificação",
      },
      header: {
        profile: "Perfil",
        settings: "Configurações",
        logout: "Sair",
      },

      headerMobile: {
        closeMenu: "Fechar menu",
        logout: "Sair",
      },

      footer: {
        description:
          "Gestão de espaços de coworking de forma simples e eficiente.",
        links: {
          title: "Links",
          about: "Sobre Nós",
          plans: "Planos",
          contact: "Contato",
        },
        support: {
          title: "Suporte",
          faq: "FAQ",
          help: "Ajuda",
        },
        contact: {
          title: "Contato",
          email: "contato@workly.com.br",
          phone: "(11) 3000-0000",
        },
        rights: "© 2025 Workly. Todos os direitos reservados.",
        terms: "Termos",
        privacy: "Privacidade",
      },

      support: {
        title: "Central de Suporte",
        description: "Gerencie seus chamados e tire suas dúvidas",
        newTicket: "Novo Chamado",
        stats: {
          total: "Total de Chamados",
          inProgress: "Em Andamento",
          resolved: "Resolvidos",
          avgTime: "Tempo Médio",
        },

        ticketList: {
          tabs: {
            all: "Todos",
            open: "Abertos",
            resolved: "Resolvidos",
          },
          empty: "Nenhum chamado encontrado",
          priority: {
            high: "Alta",
            medium: "Média",
            low: "Baixa",
          },
          status: {
            open: "Aberto",
            inProgress: "Em andamento",
            resolved: "Resolvido",
          },
        },

        ticketDetails: {
          selectTicket: "Selecione um Chamado",
          selectTicketText: "Escolha um chamado ao lado para ver os detalhes",
          openNewTicket: "Abrir Novo Chamado",
          priority: {
            high: "Alta Prioridade",
            medium: "Média Prioridade",
            low: "Baixa Prioridade",
          },
          status: {
            open: "Aberto",
            inProgress: "Em andamento",
            resolved: "Resolvido",
          },
          createdAt: "Criado em",
          updatedAt: "Atualizado",
          conversation: "Conversação",
          noMessages: "Nenhuma mensagem ainda",
          support: "Suporte",
          you: "Você",
          addReply: "Adicionar Resposta",
          typeMessage: "Digite sua mensagem...",
          attachFile: "Anexar Arquivo",
          sendReply: "Enviar Resposta",
          ticketResolved: "Este chamado foi resolvido",
        },

        ticketDialog: {
          openTitle: "Abrir Novo Chamado",
          openDescription:
            "Descreva seu problema ou dúvida e nossa equipe responderá em breve",
          fields: {
            title: "Título do Chamado",
            titlePlaceholder: "Ex: Problema com reserva",
            category: "Categoria",
            categoryPlaceholder: "Selecione",
            priority: "Prioridade",
            priorityPlaceholder: "Selecione",
            description: "Descrição",
            descriptionPlaceholder:
              "Descreva com detalhes o que está acontecendo...",
          },
          categories: {
            technical: "Técnico",
            billing: "Financeiro",
            reservation: "Reservas",
            space: "Espaços",
            general: "Geral",
          },
          priorities: {
            high: "Alta (urgente)",
            medium: "Média",
            low: "Baixa",
          },
          actions: {
            sendTicket: "Enviar Chamado",
            sending: "Enviando...",
          },
        },
      },

      dashboard: {
        greeting: "Olá, {{name}}",
        activeReservations: "Reservas Ativas",
        usedHours: "Horas Utilizadas",
        thisMonth: "Este mês",
        upcomingReservations: "Próximas Reservas",
        viewAll: "Ver Todas",
        noUpcomingReservations: "Nenhuma reserva futura",
        myPlan: "Meu Plano",
        planNotFound: "Nenhum plano encontrado",
        managePlan: "Gerenciar Plano",
        tickets: "Chamados",
        viewAllTickets: "Ver todos",
        updatedRecently: "Atualizado recentemente",
        ticketStatus: {
          open: "Aberto",
          progress: "Em andamento",
          resolved: "Resolvido",
        },
        reservationStatus: {
          paid: "Pago",
          pending: "Pendente",
          canceled: "Cancelada",
        },
        hoursMonthly: "{{hours}} horas mensais",
        renewal: "Renovação: {{date}}",
      },

      reservations: {
        bookSpace: "Reservar Espaço",
        chooseWorkspace: "Escolha o workspace ideal para você",
        myReservations: "Minhas Reservas",
        availableSpaces: "Espaços disponíveis",
        noSpacesFound: "Nenhum espaço encontrado",
        loadingSpaces: "Carregando espaços…",
        failedToReserve: "Falha ao criar reserva",
      },

      calendar: {
        sun: "dom",
        mon: "seg",
        tue: "ter",
        wed: "qua",
        thu: "qui",
        fri: "sex",
        sat: "sáb",
      },

      filters: {
        title: "Filtros",
        spaceType: "Tipo de Espaço",
        capacity: "Capacidade (até)",
        amenities: "Comodidades",
        noAmenities: "Nenhuma comodidade disponível",
        spacesFound: "Espaços encontrados",
        clearFilters: "Limpar filtros",
        all: "Todos",
        any: "Qualquer",
        upTo: "Até {{count}} pessoas",
      },

      spaceCard: {
        available: "Disponível",
        person: "pessoa",
        people: "pessoas",
        priceOnRequest: "Preço sob consulta",
        viewDetails: "Ver Detalhes",
        reserve: "Reservar",
      },

      detailsDialog: {
        chooseReservationMode: "Escolha como deseja reservar este espaço",
        capacity: "Capacidade",
        type: "Tipo",
        totalRooms: "Salas",
        room: "sala",
        rooms: "salas",
        reservationMode: "Forma de Reserva",
        byHour: "Por Hora",
        byDay: "Por Dia",
        monthly: "Mensal",
        amenities: "Comodidades",
        continueReservation: "Continuar Reserva",
      },

      reservationFlowDialog: {
        reserveSpace: "Reservar Espaço",
        chooseTypeAndDetails: "Escolha o tipo de reserva e os detalhes",
        reservationType: "Tipo de Reserva",
        byHour: "Por Hora",
        daily: "Diária",
        monthly: "Mensal",
        start: "Início",
        end: "Término",
        monthsQuantity: "Quantidade de meses",
        total: "Total",
        confirmReservation: "Confirmar Reserva",
        person: "pessoa",
        people: "pessoas",
      },

      myReservations: {
        loading: "Carregando reservas...",
        back: "Voltar",
        title: "Minhas Reservas",
        subtitle: "Gerencie e acompanhe suas reservas",
        reservationCount: "{{count}} reserva(s)",
        filterDate: "Data",
        allTypes: "Todos os tipos",
        byHour: "Por hora",
        daily: "Diária",
        monthly: "Mensal",
        allStatus: "Todos os status",
        pending: "Pendentes",
        confirmed: "Confirmadas",
        canceled: "Canceladas",
        refresh: "Atualizar",
        noReservations: "Nenhuma reserva encontrada",
        noReservationsDescription:
          "Você ainda não possui reservas com os filtros selecionados.",
        viewAvailableSpaces: "Ver espaços disponíveis",
        canceledSuccess: "Reserva cancelada",
        canceledError: "Erro ao cancelar reserva",
      },

      reservationCommon: {
        paid: "Pago",
        pending: "Pendente",
        canceled: "Cancelada",
        details: "Detalhes",
        pay: "Pagar",
        cancelReservation: "Cancelar reserva",
        reservationCanceled: "Reserva cancelada",
        imageUnavailable: "Imagem indisponível",
        byHour: "Por hora",
        daily: "Diária",
        monthly: "Mensal",
      },

      reservationShared: {
        loading: "Carregando...",
        notFound: "Reserva não encontrada",
        back: "Voltar",
        byHour: "Por hora",
        daily: "Diária",
        monthly: "Mensal",
        pending: "Pendente",
        confirmed: "Confirmada",
        canceled: "Cancelada",
        paid: "Pago",
        details: "Detalhes",
        pay: "Pagar",
        cancelReservation: "Cancelar reserva",
        reservationCanceled: "Reserva cancelada",
        reservationPaid: "Reserva Paga",
        imageUnavailable: "Imagem indisponível",
        loadError: "Erro ao carregar reserva",
        canceledSuccess: "Reserva cancelada com sucesso",
        canceledError: "Não foi possível cancelar a reserva",
        reservationInfo: "Informações da reserva",
        date: "Data",
        type: "Tipo",
        time: "Horário",
        amenities: "Comodidades",
        reservationValue: "Valor da reserva",
        paymentPending: "Pagamento pendente",
        goToPayment: "Ir para pagamento",
      },

      PaymentEmpty: {
        noReservation: "Nenhuma Reserva Selecionada",
        noReservationDescription:
          "Para realizar um pagamento, você precisa primeiro fazer uma reserva.",
        makeReservation: "Fazer uma Reserva",
      },
    },
  },
  "en-US": {
    translation: {
      preferences: "Preferences",
      preferencesDescription: "Customize your experience",
      language: "Language",
      timezone: "Timezone",
      currency: "Currency",
      selectLanguage: "Select a language",
      selectTimezone: "Select a timezone",
      selectCurrency: "Select a currency",
      savePreferences: "Save Preferences",
      settings: "Settings",
      settingsDescription: "Manage your preferences and account settings",
      loadingSettings: "Loading settings...",
      errorLoadSettings: "Failed to load settings",

      errors: {
        loadSettings: "Failed to load settings",
        saveNotification: "Failed to save notification settings",
        savePreferences: "Failed to save preferences",
        passwordMismatch: "Passwords do not match",
        passwordEmpty: "Please fill in all password fields",
        passwordTooShort: "New password must be at least 8 characters",
        securityUpdate: "Failed to update security settings",
        twoFAEnable: "Failed to enable 2FA",
        twoFADisable: "Failed to request code to disable 2FA",
        invalidCode: "Invalid code",
        incorrectPassword: "Incorrect password",
      },

      dangerZone: {
        title: "Danger Zone",
        subtitle: "Irreversible actions",
        deleteTitle: "Delete Account",
        deleteWarning:
          "Once you delete your account, there is no way back. Please be sure.",
        deleteButton: "Delete My Account",
      },

      deleteAccount: {
        title: "Delete account",
        description:
          "This action is irreversible. To confirm, enter your password.",
        passwordPlaceholder: "Current password",
        confirm: "Delete account",
        loading: "Deleting...",
      },
      common: {
        cancel: "Cancel",
        delete: "Delete",
      },

      notifications: {
        title: "Notifications",
        subtitle: "Choose how you want to receive notifications",

        email: {
          label: "Email Notifications",
          description: "Receive updates via email",
        },
        sms: {
          label: "SMS Notifications",
          description: "Receive alerts via text message",
        },
        reservation: {
          label: "Reservation Reminders",
          description: "Get reminders before your reservations",
        },
        promo: {
          label: "Promotional Emails",
          description: "Receive offers and news",
        },
        weekly: {
          label: "Weekly Report",
          description: "Weekly summary of your activity",
        },

        save: "Save Notification Preferences",
      },

      saveMessage: {
        success: "Settings saved successfully!",
        error: "An error occurred while saving the settings.",
      },

      security: {
        title: "Security",
        description: "Protect your account",
        twoFactorAuth: {
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
        },
        password: {
          currentLabel: "Current Password",
          newLabel: "New Password",
          confirmLabel: "Confirm New Password",
          currentPlaceholder: "Enter your current password",
          newPlaceholder: "Enter your new password",
          confirmPlaceholder: "Confirm your new password",
          note: "Minimum 8 characters",
          changeButton: "Change Password",
        },
      },

      twoFAModal: {
        title: "Two-Factor Authentication",
        description: "Enter the code sent to your email to confirm.",
        placeholder: "Verification code",
        cancel: "Cancel",
        confirm: "Confirm",
        loading: "Verifying...",
      },

      roles: {
        ADMIN: "Administrator",
        SUPPORT: "Support",
        MEMBER: "Member",
      },
      plan: "Plan",
      nav: {
        Dashboard: "Dashboard",
        Espaços: "Spaces",
        Relatórios: "Reports",
        Tickets: "Tickets",
        Início: "Home",
        Reservas: "Reservations",
        Pagamentos: "Payments",
        Histórico: "History",
        Suporte: "Support",
      },
      headerNotifications: {
        title: "Notifications",
        markAll: "Mark all as read",
        none: "No notifications",
        defaultTitle: "Notification",
      },
      header: {
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
      },

      headerMobile: {
        closeMenu: "Close menu",
        logout: "Logout",
      },

      footer: {
        description: "Manage coworking spaces simply and efficiently.",
        links: {
          title: "Links",
          about: "About Us",
          plans: "Plans",
          contact: "Contact",
        },
        support: {
          title: "Support",
          faq: "FAQ",
          help: "Help",
        },
        contact: {
          title: "Contact",
          email: "contact@workly.com",
          phone: "+1 (11) 3000-0000",
        },
        rights: "© 2025 Workly. All rights reserved.",
        terms: "Terms",
        privacy: "Privacy",
      },

      support: {
        title: "Support Center",
        description: "Manage your tickets and get help",
        newTicket: "New Ticket",
        stats: {
          total: "Total Tickets",
          inProgress: "In Progress",
          resolved: "Resolved",
          avgTime: "Average Time",
        },

        ticketList: {
          tabs: {
            all: "All",
            open: "Open",
            resolved: "Resolved",
          },
          empty: "No tickets found",
          priority: {
            high: "High",
            medium: "Medium",
            low: "Low",
          },
          status: {
            open: "Open",
            inProgress: "In Progress",
            resolved: "Resolved",
          },
        },

        ticketDetails: {
          selectTicket: "Select a Ticket",
          selectTicketText: "Choose a ticket on the side to see the details",
          openNewTicket: "Open New Ticket",
          priority: {
            high: "High Priority",
            medium: "Medium Priority",
            low: "Low Priority",
          },
          status: {
            open: "Open",
            inProgress: "In Progress",
            resolved: "Resolved",
          },
          createdAt: "Created at",
          updatedAt: "Updated",
          conversation: "Conversation",
          noMessages: "No messages yet",
          support: "Support",
          you: "You",
          addReply: "Add Reply",
          typeMessage: "Type your message...",
          attachFile: "Attach File",
          sendReply: "Send Reply",
          ticketResolved: "This ticket has been resolved",
        },

        ticketDialog: {
          openTitle: "Open New Ticket",
          openDescription:
            "Describe your issue or question and our team will respond shortly",
          fields: {
            title: "Ticket Title",
            titlePlaceholder: "Ex: Problem with booking",
            category: "Category",
            categoryPlaceholder: "Select",
            priority: "Priority",
            priorityPlaceholder: "Select",
            description: "Description",
            descriptionPlaceholder: "Describe in detail what is happening...",
          },
          categories: {
            technical: "Technical",
            billing: "Billing",
            reservation: "Reservations",
            space: "Spaces",
            general: "General",
          },
          priorities: {
            high: "High (urgent)",
            medium: "Medium",
            low: "Low",
          },
          actions: {
            sendTicket: "Send Ticket",
            sending: "Sending...",
          },
        },
      },

      dashboard: {
        greeting: "Hello, {{name}}",
        activeReservations: "Active Reservations",
        usedHours: "Used Hours",
        thisMonth: "This month",
        upcomingReservations: "Upcoming Reservations",
        viewAll: "View All",
        noUpcomingReservations: "No upcoming reservations",
        myPlan: "My Plan",
        planNotFound: "No plan found",
        managePlan: "Manage Plan",
        tickets: "Tickets",
        viewAllTickets: "View All",
        updatedRecently: "Updated recently",
        ticketStatus: {
          open: "Open",
          progress: "In Progress",
          resolved: "Resolved",
        },
        reservationStatus: {
          paid: "Paid",
          pending: "Pending",
          canceled: "Canceled",
        },
        hoursMonthly: "{{hours}} monthly hours",
        renewal: "Renewal: {{date}}",
      },

      reservations: {
        bookSpace: "Book a Space",
        chooseWorkspace: "Choose the ideal workspace for you",
        myReservations: "My Reservations",
        availableSpaces: "Available Spaces",
        noSpacesFound: "No spaces found",
        loadingSpaces: "Loading spaces…",
        failedToReserve: "Failed to create reservation",
      },

      calendar: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
      },

      filters: {
        title: "Filters",
        spaceType: "Space Type",
        capacity: "Capacity (up to)",
        amenities: "Amenities",
        noAmenities: "No amenities available",
        spacesFound: "Spaces found",
        clearFilters: "Clear filters",
        all: "All",
        any: "Any",
        upTo: "Up to {{count}} people",
      },

      spaceCard: {
        available: "Available",
        person: "person",
        people: "people",
        priceOnRequest: "Price on request",
        viewDetails: "View Details",
        reserve: "Reserve",
      },

      detailsDialog: {
        chooseReservationMode: "Choose how you want to reserve this space",
        capacity: "Capacity",
        type: "Type",
        totalRooms: "Rooms",
        room: "room",
        rooms: "rooms",
        reservationMode: "Reservation Mode",
        byHour: "By Hour",
        byDay: "By Day",
        monthly: "Monthly",
        amenities: "Amenities",
        continueReservation: "Continue Reservation",
      },

      reservationFlowDialog: {
        reserveSpace: "Reserve Space",
        chooseTypeAndDetails: "Choose reservation type and details",
        reservationType: "Reservation Type",
        byHour: "By Hour",
        daily: "Daily",
        monthly: "Monthly",
        start: "Start",
        end: "End",
        monthsQuantity: "Months Quantity",
        total: "Total",
        confirmReservation: "Confirm Reservation",
        person: "person",
        people: "people",
      },

      myReservations: {
        loading: "Loading reservations...",
        back: "Back",
        title: "My Reservations",
        subtitle: "Manage and track your reservations",
        reservationCount: "{{count}} reservation(s)",
        filterDate: "Date",
        allTypes: "All types",
        byHour: "By hour",
        daily: "Daily",
        monthly: "Monthly",
        allStatus: "All statuses",
        pending: "Pending",
        confirmed: "Confirmed",
        canceled: "Canceled",
        refresh: "Refresh",
        noReservations: "No reservations found",
        noReservationsDescription:
          "You don't have any reservations with the selected filters.",
        viewAvailableSpaces: "View available spaces",
        canceledSuccess: "Reservation canceled",
        canceledError: "Error canceling reservation",
      },

      reservationCommon: {
        paid: "Paid",
        pending: "Pending",
        canceled: "Canceled",
        details: "Details",
        pay: "Pay",
        cancelReservation: "Cancel reservation",
        reservationCanceled: "Reservation canceled",
        imageUnavailable: "Image unavailable",
        byHour: "By hour",
        daily: "Daily",
        monthly: "Monthly",
      },

      reservationShared: {
        loading: "Loading...",
        notFound: "Reservation not found",
        back: "Back",
        byHour: "By hour",
        daily: "Daily",
        monthly: "Monthly",
        pending: "Pending",
        confirmed: "Confirmed",
        canceled: "Canceled",
        paid: "Paid",
        details: "Details",
        pay: "Pay",
        cancelReservation: "Cancel reservation",
        reservationCanceled: "Reservation canceled",
        reservationPaid: "Reservation paid",
        imageUnavailable: "Image unavailable",
        loadError: "Error loading reservation",
        canceledSuccess: "Reservation canceled successfully",
        canceledError: "Could not cancel reservation",
        reservationInfo: "Reservation information",
        date: "Date",
        type: "Type",
        time: "Time",
        amenities: "Amenities",
        reservationValue: "Reservation value",
        paymentPending: "Payment pending",
        goToPayment: "Go to payment",
      },

      PaymentEmpty: {
        noReservation: "No reservation selected",
        noReservationDescription:
          "To make a payment, you need to first make a reservation.",
        makeReservation: "Make a Reservation",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("language") || "pt-BR";

i18n.use(initReactI18next).init({
  resources, // seu objeto resources existente
  lng: savedLanguage,
  fallbackLng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
});

// Função para trocar idioma e salvar no localStorage
export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng);
};

export default i18n;
