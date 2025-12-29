module.exports = ({ name, resetLink }) => `
<!DOCTYPE html>
<html lang="pt-BR">
<body style="font-family: Arial, sans-serif; background:#f5f7fa; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">

    <h1 style="color:#2563eb; margin-bottom:8px;">Workly</h1>
    <h2 style="color:#1f2937;">Redefinição de senha</h2>

    <p>Olá <strong>${name}</strong>,</p>

    <p>
      Recebemos uma solicitação para redefinir a senha da sua conta
      na plataforma <strong>Workly</strong>.
    </p>

    <p>
      Clique no botão abaixo para criar uma nova senha:
    </p>

    <p style="text-align:center; margin:32px 0;">
      <a href="${resetLink}"
         style="
           background:#2563eb;
           color:#ffffff;
           padding:12px 20px;
           border-radius:6px;
           text-decoration:none;
           font-weight:bold;
           display:inline-block;
         ">
        Redefinir senha
      </a>
    </p>

    <p>
      Este link é válido por <strong>1 hora</strong>.
      Após esse período, será necessário solicitar uma nova recuperação.
    </p>

    <p>
      Se você não solicitou a redefinição de senha,
      pode ignorar este e-mail com segurança.
    </p>

    <hr style="margin:24px 0;" />

    <p style="font-size:12px; color:#6b7280;">
      ⚠️ Este e-mail foi enviado automaticamente pelo sistema Workly.
      Por motivos de segurança, nunca compartilhe este link.
    </p>

  </div>
</body>
</html>
`;
