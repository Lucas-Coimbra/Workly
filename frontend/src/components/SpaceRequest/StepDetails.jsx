import AmenitiesGrid from "./AmenitiesGrid";
import ImageUploader from "./ImageUploader";

export default function StepDetails({
  formData,
  onChange,
  selectedAmenities,
  toggleAmenity,
  uploadedImages,
  addImage,
  removeImage,
  errors = {},
}) {
  const baseInput =
    "w-full h-[48px] px-[14px] rounded-[10px] border text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2";

  const normal =
    "border-[#e5e7eb] focus:border-[#059669] focus:ring-[#059669]/20";

  const error =
    "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20";

  return (
    <div>
      {/* Header */}
      <div className="mb-[32px]">
        <h2 className="text-[24px] font-[700] text-[#111827]">
          Detalhes e Comodidades
        </h2>
        <p className="text-[15px] text-[#6b7280] mt-[6px]">
          Informe as características e recursos disponíveis no espaço
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            Área Total (m²)
          </label>
          <input
            type="number"
            value={formData.totalArea}
            onChange={(e) => onChange("totalArea", e.target.value)}
            className={`${baseInput} ${errors.totalArea ? error : normal}`}
          />
          {errors.totalArea && (
            <p className="mt-[6px] text-[13px] text-[#dc2626]">
              {errors.totalArea}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            Capacidade (pessoas)
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            className={`${baseInput} ${errors.capacity ? error : normal}`}
          />
          {errors.capacity && (
            <p className="mt-[6px] text-[13px] text-[#dc2626]">
              {errors.capacity}
            </p>
          )}
        </div>
      </div>

      <div className="mb-[32px]">
        <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
          Número de Salas / Ambientes
        </label>
        <input
          type="number"
          value={formData.rooms}
          onChange={(e) => onChange("rooms", e.target.value)}
          className={`${baseInput} ${errors.rooms ? error : normal}`}
        />
        {errors.rooms && (
          <p className="mt-[6px] text-[13px] text-[#dc2626]">{errors.rooms}</p>
        )}
      </div>

      {/* Comodidades */}
      <div className="mb-[40px]">
        <h3 className="text-[18px] font-[600] text-[#111827] mb-[6px]">
          Comodidades Disponíveis
        </h3>
        <p className="text-[14px] text-[#6b7280] mb-[16px]">
          Selecione todas as comodidades que o espaço oferece
        </p>

        <AmenitiesGrid selected={selectedAmenities} toggle={toggleAmenity} />
      </div>

      {/* Upload de imagens */}
      <div className="mb-[40px]">
        <h3 className="text-[18px] font-[600] text-[#111827] mb-[12px]">
          Fotos do Espaço
        </h3>

        <ImageUploader
          images={uploadedImages}
          addImage={addImage}
          removeImage={removeImage}
        />
      </div>

      {/* Preços */}
      <div className="pt-[32px] border-t border-[#e5e7eb]">
        <h3 className="text-[18px] font-[600] text-[#111827] mb-[20px]">
          Disponibilidade e Preços
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
              Preço por Hora (R$)
            </label>
            <input
              type="number"
              value={formData.pricePerHour}
              onChange={(e) => onChange("pricePerHour", e.target.value)}
              className={`${baseInput} ${errors.pricePerHour ? error : normal}`}
            />
            {errors.pricePerHour && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.pricePerHour}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
              Preço por Dia (R$)
            </label>
            <input
              type="number"
              value={formData.pricePerDay}
              onChange={(e) => onChange("pricePerDay", e.target.value)}
              className={`${baseInput} ${errors.pricePerDay ? error : normal}`}
            />
            {errors.pricePerDay && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.pricePerDay}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
              Preço Mensal (R$)
            </label>
            <input
              type="number"
              value={formData.pricePerMonth}
              onChange={(e) => onChange("pricePerMonth", e.target.value)}
              className={`${baseInput} ${
                errors.pricePerMonth ? error : normal
              }`}
            />
            {errors.pricePerMonth && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.pricePerMonth}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
              Reserva Mínima (horas)
            </label>
            <input
              type="number"
              value={formData.minimumBooking}
              onChange={(e) => onChange("minimumBooking", e.target.value)}
              className={`${baseInput} ${
                errors.minimumBooking ? error : normal
              }`}
            />
            {errors.minimumBooking && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.minimumBooking}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            Informações Adicionais
          </label>
          <textarea
            rows={3}
            value={formData.additionalInfo}
            onChange={(e) => onChange("additionalInfo", e.target.value)}
            className={`${baseInput} ${errors.additionalInfo ? error : normal}`}
          />
          {errors.additionalInfo && (
            <p className="mt-[6px] text-[13px] text-[#dc2626]">
              {errors.additionalInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
