module.exports = (data) => `
<!DOCTYPE html>
<html>

<body style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">

    <h1 style="color:#2563eb; margin-bottom:8px;">Workly</h1>
    <h2 style="color:#1f2937;">Solicitação recebida com sucesso</h2>

    <p>Olá <strong>${data.ownerName}</strong>,</p>

    <p>
      Recebemos sua solicitação para cadastrar o espaço
      <strong>${data.spaceName}</strong> na plataforma <strong>Workly</strong>.
    </p>

    <p>
      Nossa equipe irá analisar as informações enviadas.
      Você receberá um novo e-mail assim que a solicitação for
      <strong>aprovada ou rejeitada</strong>.
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