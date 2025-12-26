const supportService = require("../services/supportService");

async function listTickets(req, res, next) {
  try {
    const data = await supportService.listTickets(req.userId, req.userRole);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getTicketById(req, res, next) {
  try {
    const data = await supportService.getTicketById(
      req.params.id,
      req.userId,
      req.userRole
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function createTicket(req, res, next) {
  try {
    const ticket = await supportService.createTicket(req.userId, req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}

async function addMessage(req, res, next) {
  try {
    const message = await supportService.addMessage(
      req.params.id,
      req.userId,
      req.userRole,
      req.body.message
    );
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const ticket = await supportService.updateStatus(
      req.params.id,
      req.userRole,
      req.body.status
    );
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

async function getMetrics(req, res, next) {
  try {
    const averageResolutionTime =
      await supportService.getAverageResolutionTime();

    res.json({
      averageResolutionTime, // em minutos ou null
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTickets,
  getTicketById,
  createTicket,
  addMessage,
  updateStatus,
  getMetrics,
};
