const { z } = require("zod");

const spaceRequestSchema = z.object({
  // ===== Proprietário =====
  ownerType: z.enum(["individual", "company"]),
  ownerName: z.string().min(3, "Nome obrigatório"),
  ownerDocument: z.string().min(11, "Documento inválido"),
  ownerEmail: z.string().email("E-mail inválido"),
  ownerPhone: z.string().min(8, "Telefone inválido"),

  // ===== Espaço =====
  spaceName: z.string().min(3, "Nome do espaço obrigatório"),
  spaceType: z.string().min(3, "Tipo obrigatório"),
  spaceDescription: z.string().min(10, "Descrição obrigatória"),

  // ===== Endereço =====
  zipCode: z.string().min(8),
  street: z.string().min(3),
  number: z.string().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().min(2),
  city: z.string().min(2),
  state: z.string().length(2),

  // ===== Detalhes =====
  totalArea: z.number().int().positive().optional(),
  capacity: z.number().int().positive().optional(),
  rooms: z.number().int().positive().optional(),

  // ===== Preços =====
  pricePerHour: z.number().positive().optional(),
  pricePerDay: z.number().positive().optional(),
  pricePerMonth: z.number().positive().optional(),
  minimumBooking: z.number().int().positive().optional(),
  additionalInfo: z.string().optional(),

  // ===== Extras =====
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

module.exports = { spaceRequestSchema };
