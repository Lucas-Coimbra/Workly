const roomService = require("../services/roomService");
const { z } = require("zod");

const roomSchema = z.object({
  workspaceId: z.number().int(),
  name: z.string(),
  type: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  capacity: z.number().int().min(1),
});

exports.createRoom = async (req, res, next) => {
  try {
    const data = roomSchema.parse(req.body);
    const room = await roomService.createRoom(data);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

exports.listRooms = async (req, res, next) => {
  try {
    const workspaceId = Number(req.query.workspaceId);
    const rooms = await roomService.listRooms(workspaceId);
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};
