const reservationService = require("../services/reservationService");
const { createReservation } = require("../validations/reservationSchema");

exports.create = async (req, res, next) => {
  try {
    const data = createReservation.parse(req.body);
    const resv = await reservationService.createReservation({
      userId: req.userId,
      roomId: data.roomId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    });
    // After creating, normally redirect to payment (here we return reservation + payment_url placeholder)
    res
      .status(201)
      .json({ reservation: resv, paymentUrl: `/payments/checkout/${resv.id}` });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const r = await reservationService.getReservation(id);
    if (!r) return res.status(404).json({ message: "Not found" });
    if (req.userRole === "MEMBER" && r.userId !== req.userId)
      return res.status(403).json({ message: "Forbidden" });
    res.json(r);
  } catch (err) {
    next(err);
  }
};

exports.listMine = async (req, res, next) => {
  try {
    const list = await reservationService.listReservationsForUser(req.userId);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const r = await reservationService.getReservation(id);
    if (!r) return res.status(404).json({ message: "Not found" });
    if (r.userId !== req.userId && req.userRole !== "ADMIN")
      return res.status(403).json({ message: "Forbidden" });
    await reservationService.cancelReservation(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
