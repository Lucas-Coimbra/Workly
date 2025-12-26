const service = require("../services/spaceRequestService");
const { spaceRequestSchema } = require("../validations/spaceRequestSchema");

class SpaceRequestController {
  async create(req, res) {
    try {
      // pega os paths das imagens
      const images = req.files.map((file) => file.path);

      // campos que devem ser números
      const numericFields = [
        "totalArea",
        "capacity",
        "rooms",
        "pricePerHour",
        "pricePerDay",
        "pricePerMonth",
        "minimumBooking",
      ];

      // clona o req.body e converte strings numéricas para number
      const bodyWithNumbers = { ...req.body };
      numericFields.forEach((field) => {
        if (bodyWithNumbers[field] !== undefined) {
          bodyWithNumbers[field] = Number(bodyWithNumbers[field]);
        }
      });

      // garante que amenities seja array (caso venha apenas 1 item)
      const amenities = Array.isArray(bodyWithNumbers.amenities)
        ? bodyWithNumbers.amenities
        : [bodyWithNumbers.amenities];

      // prepara o objeto final para validação
      const data = spaceRequestSchema.parse({
        ...bodyWithNumbers,
        amenities,
        images,
      });

      const request = await service.create(data);
      return res.status(201).json(request);
    } catch (err) {
      if (err.name === "ZodError") {
        return res.status(400).json({ errors: err.errors });
      }
      console.error(err);
      return res.status(500).json({ message: "Erro ao criar solicitação" });
    }
  }

  async list(req, res) {
    try {
      const requests = await service.listPending();
      return res.json(requests);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao listar solicitações" });
    }
  }

  async getById(req, res) {
    try {
      const id = Number(req.params.id);
      const request = await service.getById(id);

      if (!request) {
        return res.status(404).json({ message: "Solicitação não encontrada" });
      }

      return res.json(request);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar solicitação" });
    }
  }

  async approve(req, res) {
    try {
      const id = Number(req.params.id);
      const adminId = req.userId;

      const request = await service.approve(id, adminId);
      return res.json(request);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao aprovar solicitação" });
    }
  }

  async reject(req, res) {
    try {
      const id = Number(req.params.id);
      const adminId = req.userId;

      const request = await service.reject(id, adminId);
      return res.json(request);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao rejeitar solicitação" });
    }
  }
}

module.exports = new SpaceRequestController();
