const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
