Sistema de Gestão de Coworkings e Espaços Compartilhados
Objetivo: Criar uma plataforma que permita que coworkings, hubs de inovação e espaços compartilhados administrem melhor sua estrutura física e serviços oferecidos, aumentando eficiência operacional e oferecendo uma experiência fluida para os usuários.

Funcionalidades:
Reserva de salas, mesas e equipamentos.
Controle de planos de assinatura (diário, mensal, corporativo).
Integração com pagamentos online.
Registro de utilização de recursos (internet, impressoras, coffee break).
Relatórios de ocupação e faturamento.

Perfis de acesso:
Usuário: reserva espaços e consulta histórico.
Administrador: controla planos, recursos e relatórios.
Equipe de suporte: atende chamados e gerencia infraestrutura.

## **Resumo do cenário e requisitos**

### **1️⃣ Filtros**

- **Tipo de espaço**: igual aos tipos usados no `SpaceRequest` → filtragem por `spaceType`.
- **Capacidade**: número de pessoas → `workspace.capacity`.
- **Recursos**: amenities → `workspace.amenities`.
- **Data**: calendário → escolher o dia da reserva.
- **Disponibilidade**: precisa considerar reservas já existentes (bloqueio parcial depende do tipo de pagamento).

---

### **2️⃣ Calendário e Disponibilidade**

- Deve mostrar apenas **workspaces com disponibilidade na data selecionada**.
- Tipo de pagamento influencia o bloqueio:

  - **Por hora** → bloqueia apenas aquele horário específico.
  - **Por dia** → bloqueia o dia inteiro.
  - **Por mês** → bloqueia do dia X até o dia Y.

- Consideração: se há **reserva por hora em um dia**, não impede reserva de outro horário ou outro tipo de pagamento no mesmo dia.
- Disponibilidade deve ser calculada dinamicamente usando as reservas já existentes no `Reservation`.

---

### **3️⃣ Detalhes do Workspace**

- Mostrar imagens (primeira imagem se não carregar).
- Informações:

  - Endereço completo (`street`, `number`, `complemento`, `city`, `state`, `zipCode`).
  - Proprietário (via `SpaceRequest` ou `approvedFromRequest`).
  - Capacidade e total de salas.
  - Preços: `pricePerHour`, `pricePerDay`, `pricePerMonth`.
  - Amenities.
  - Total de salas e distribuição (opcional).

---

### **4️⃣ Reserva**

- Usuário MEMBER escolhe:

  - Data inicial e final (se aplicável).
  - Tipo de pagamento: hora / diária / mensal.
  - Horário (para hora) ou datas para diária/mensal.

- Backend deve:

  - Validar disponibilidade de cada sala (`Room`) dentro do `Workspace`.
  - Criar `Reservation` vinculando `Workspace` e `Room` específica.
  - Retornar valor total calculado conforme tipo de pagamento.

---

### **5️⃣ Frontend**

- Mostrar **cards de workspaces disponíveis**:

  - Com imagens, nome, tipo, capacidade, preço, amenities.
  - Ao clicar → modal de detalhes.

- Modal de reserva:

  - Escolha do tipo de pagamento (interface muda de acordo com a escolha: hora / diária / mensal).
  - Escolha de data e horário (se hora) ou período (se diária/mensal).
  - Botão para confirmar → envia para backend.

- Após reserva, atualizar calendário e cards.

---

### **6️⃣ Pontos importantes que não podemos esquecer**

- **Bloqueio parcial por tipo de pagamento** (hora, dia, mês) — complexo, mas essencial.
- **Disponibilidade das salas** dentro do workspace.
- **Cálculo do valor total** corretamente no backend.
- **Imagens fallback** caso não carregue.
- **Proprietário do workspace** (via SpaceRequest aprovado).
- **Amenities e recursos filtráveis**.
