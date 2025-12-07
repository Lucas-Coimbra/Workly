const { z } = require("zod");

exports.createReservation = z.object({
  date: z.string(), // ISO date or datetime string
  startTime: z.string(),
  endTime: z.string(),
  roomId: z.number().int(),
});
