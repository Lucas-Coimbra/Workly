const prisma = require("../config/prisma");

async function createRoom({ workspaceId, name, type, capacity }) {
  return prisma.room.create({ data: { workspaceId, name, type, capacity } });
}

async function listRooms(workspaceId) {
  return prisma.room.findMany({ where: { workspaceId } });
}

module.exports = { createRoom, listRooms };
