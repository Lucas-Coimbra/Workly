module.exports = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  reservation: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  room: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  workspace: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};
