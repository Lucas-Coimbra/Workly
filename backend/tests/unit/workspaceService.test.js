jest.mock("../../src/config/prisma");

const prisma = require("../../src/config/prisma");
const workspaceService = require("../../src/services/workspaceService");

describe("WorkspaceService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("createWorkspace", async () => {
    prisma.workspace.create.mockResolvedValue({ id: 1 });

    const result = await workspaceService.createWorkspace(1, "Meu Espaço");

    expect(result.id).toBe(1);
  });

  test("listWorkspaces", async () => {
    prisma.workspace.findMany.mockResolvedValue([{ id: 1 }]);

    const result = await workspaceService.listWorkspaces(1);

    expect(result.length).toBe(1);
  });
});
