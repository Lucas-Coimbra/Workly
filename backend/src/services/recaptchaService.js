const axios = require("axios");

async function verifyRecaptcha(token) {
  if (!token) {
    throw { status: 400, message: "reCAPTCHA token ausente" };
  }

  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    null,
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      },
    }
  );

  if (!response.data.success) {
    throw {
      status: 403,
      message: "Falha na verificação do reCAPTCHA",
    };
  }

  return true;
}

module.exports = { verifyRecaptcha };
