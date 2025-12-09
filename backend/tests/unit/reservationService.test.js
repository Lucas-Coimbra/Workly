jest.mock("../../src/config/prisma");

const prisma = require("../../src/config/prisma");
const reservationService = require("../../src/services/reservationService");

describe("ReservationService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createReservation - prevents overlapping", async () => {
    prisma.reservation.findFirst.mockResolvedValue({ id: 99 });

    await expect(
      reservationService.createReservation({
        userId: 1,
        roomId: 2,
        date: "2024-01-01",
        startTime: "10:00",
        endTime: "11:00",
      })
    ).rejects.toHaveProperty("status", 409);
  });

  test("createReservation - success", async () => {
    prisma.reservation.findFirst.mockResolvedValue(null);
    prisma.reservation.create.mockResolvedValue({ id: 1 });

    const result = await reservationService.createReservation({
      userId: 1,
      roomId: 2,
      date: "2024-01-01",
      startTime: "10:00",
      endTime: "11:00",
    });

    expect(result.id).toBe(1);
  });
});
