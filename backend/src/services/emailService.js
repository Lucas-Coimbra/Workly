const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // Gmail usa TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

class EmailService {
  async sendMail({ to, subject, html }) {
    return transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    });
  }

  async sendSpaceRequestCreated(request) {
    return this.sendMail({
      to: request.ownerEmail,
      subject: "Recebemos sua solicitação de espaço – Workly",
      html: require("../templates/spaceRequestCreated")(request),
    });
  }

  async sendSpaceRequestApproved(request) {
    return this.sendMail({
      to: request.ownerEmail,
      subject: "Seu espaço foi aprovado 🎉 – Workly",
      html: require("../templates/spaceRequestApproved")(request),
    });
  }

  async sendSpaceRequestRejected(request) {
    return this.sendMail({
      to: request.ownerEmail,
      subject: "Atualização sobre sua solicitação – Workly",
      html: require("../templates/spaceRequestRejected")(request),
    });
  }
}

module.exports = new EmailService();
