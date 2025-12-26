module.exports = (data) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">
    
    <h1 style="color:#16a34a; margin-bottom:8px;">Workly</h1>
    <h2 style="color:#14532d;">Espaço aprovado!</h2>

    <p>Olá <strong>${data.ownerName}</strong>,</p>

    <p>
      Temos uma ótima notícia! Seu espaço
      <strong>${data.spaceName}</strong> foi <strong>aprovado</strong>
      e já está disponível na plataforma <strong>Workly</strong>.
    </p>

    <p>
      A partir de agora, usuários poderão visualizar seu espaço
      e realizar reservas conforme disponibilidade.
    </p>

    <hr style="margin:24px 0;" />

    <p style="font-size:12px; color:#6b7280;">
      ⚠️ Este e-mail foi enviado automaticamente pelo sistema Workly
      para fins de <strong>demonstração acadêmica</strong>.
    </p>
  </div>
</body>
</html>
`;
