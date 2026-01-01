const prisma = require("../config/prisma");
const emailService = require("./emailService");
const { AMENITIES } = require("../constants/amenities");

class SpaceRequestService {
  async create(data) {
    // REGRA DE NEGÓCIO: pelo menos um preço
    const hasAnyPrice =
      (data.pricePerHour && data.pricePerHour > 0) ||
      (data.pricePerDay && data.pricePerDay > 0) ||
      (data.pricePerMonth && data.pricePerMonth > 0);

    if (!hasAnyPrice) {
      throw new Error(
        "Informe pelo menos um tipo de preço (hora, dia ou mensal)"
      );
    }

    if (!hasAnyPrice) {
      throw new Error(
        "Informe pelo menos um tipo de preço (hora, dia ou mensal)"
      );
    }

    const normalizedAmenities = data.amenities
      .map((a) => AMENITIES[a])
      .filter(Boolean);

    const request = await prisma.spaceRequest.create({
      data: {
        ownerType: data.ownerType,
        ownerName: data.ownerName,
        ownerDocument: data.ownerDocument,
        ownerEmail: data.ownerEmail,
        ownerPhone: data.ownerPhone,

        spaceName: data.spaceName,
        spaceType: data.spaceType,
        spaceDescription: data.spaceDescription,

        zipCode: data.zipCode,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,

        totalArea: data.totalArea,
        capacity: data.capacity,
        rooms: data.rooms,

        pricePerHour: data.pricePerHour,
        pricePerDay: data.pricePerDay,
        pricePerMonth: data.pricePerMonth,
        minimumBooking: data.minimumBooking,
        additionalInfo: data.additionalInfo,

        amenities: normalizedAmenities,
        images: data.images,
      },
    });

    // 📩 Email: solicitação criada
    await emailService.sendSpaceRequestCreated(request);

    return request;
  }

  async listPending() {
    return prisma.spaceRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id) {
    return prisma.spaceRequest.findUnique({
      where: { id },
    });
  }

  async approve(id, adminId) {
    let request;

    // transação só para banco
    await prisma.$transaction(async (tx) => {
      request = await tx.spaceRequest.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedById: adminId,
          reviewedAt: new Date(),
        },
      });

      const workspace = await tx.workspace.create({
        data: {
          name: request.spaceName,
          description: request.spaceDescription,
          spaceType: request.spaceType,
          email: request.ownerEmail,
          phone: request.ownerPhone,
          address: `${request.street}, ${request.number}, ${request.city}`,
          zipCode: request.zipCode,
          street: request.street,
          number: request.number,
          complement: request.complement,
          neighborhood: request.neighborhood,
          city: request.city,
          state: request.state,

          totalArea: request.totalArea,
          capacity: request.capacity,
          totalRooms: request.rooms,

          pricePerHour: request.pricePerHour,
          pricePerDay: request.pricePerDay,
          pricePerMonth: request.pricePerMonth,
          minimumBooking: request.minimumBooking,

          additionalInfo: request.additionalInfo,
          amenities: request.amenities,
          images: request.images,
          approvedFromRequestId: request.id,
        },
      });

      if (request.rooms && request.rooms > 0) {
        const roomsData = Array.from({ length: request.rooms }).map((_, i) => ({
          name: `Sala ${i + 1}`,
          capacity: Math.ceil(request.capacity / request.rooms || 1),
          workspaceId: workspace.id,
        }));
        await tx.room.createMany({ data: roomsData });
      }
    });

    // envia e-mail fora da transação
    await emailService.sendSpaceRequestApproved(request);

    return request;
  }

  async reject(id, adminId) {
    const request = await prisma.spaceRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewedById: adminId,
        reviewedAt: new Date(),
      },
    });

    // 📩 Email: rejeitado
    await emailService.sendSpaceRequestRejected(request);

    return request;
  }
}

module.exports = new SpaceRequestService();
