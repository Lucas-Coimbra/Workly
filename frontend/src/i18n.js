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
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR", // idioma padrão
  fallbackLng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
