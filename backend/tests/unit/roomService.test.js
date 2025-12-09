jest.mock("../../src/config/prisma");

const prisma = require("../../src/config/prisma");
const roomService = require("../../src/services/roomService");

describe("RoomService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createRoom", async () => {
    prisma.room.create.mockResolvedValue({ id: 1 });

    const result = await roomService.createRoom({
      workspaceId: 1,
      name: "Sala",
      type: "Reunião",
      capacity: 10,
    });

    expect(result.id).toBe(1);
  });

  test("listRooms", async () => {
    prisma.room.findMany.mockResolvedValue([{ id: 1 }]);

    const result = await roomService.listRooms(1);

    expect(result.length).toBe(1);
  });
});
