const prisma = require("../config/prisma");

async function createWorkspace(ownerId, name) {
  return prisma.workspace.create({ data: { name, ownerId } });
}

async function listWorkspaces(ownerId) {
  return prisma.workspace.findMany({ where: { ownerId } });
}

module.exports = { createWorkspace, listWorkspaces };
