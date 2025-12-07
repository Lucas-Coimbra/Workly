const workspaceService = require("../services/workspaceService");

exports.createWorkspace = async (req, res, next) => {
  try {
    const ws = await workspaceService.createWorkspace(
      req.userId,
      req.body.name
    );
    res.status(201).json(ws);
  } catch (err) {
    next(err);
  }
};

exports.listWorkspaces = async (req, res, next) => {
  try {
    const list = await workspaceService.listWorkspaces(req.userId);
    res.json(list);
  } catch (err) {
    next(err);
  }
};
