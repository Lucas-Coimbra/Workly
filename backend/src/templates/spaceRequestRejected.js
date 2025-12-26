module.exports = (data) => `
<!DOCTYPE html>
<html>

<body style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">

    <h1 style="color:#dc2626; margin-bottom:8px;">Workly</h1>
    <h2 style="color:#7f1d1d;">Solicitação não aprovada</h2>

    <p>Olá <strong>${data.ownerName}</strong>,</p>

    <p>
      Após análise, sua solicitação para o espaço
      <strong>${data.spaceName}</strong> não foi aprovada neste momento.
    </p>

    <p>
      Você pode revisar as informações e enviar uma nova solicitação
      futuramente.
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