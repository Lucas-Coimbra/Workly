import { Building2 } from "lucide-react";
import { spaceTypes, brazilStates } from "../../mocks/mockData";

export default function StepSpace({
  formData,
  onChange,
  errors,
  onZipCodeChange = {},
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
          Informações do Espaço
        </h2>
        <p className="text-[15px] text-[#6b7280] mt-[6px]">
          Descreva o espaço que você deseja cadastrar
        </p>
      </div>

      {/* Nome do espaço */}
      <div className="mb-[24px]">
        <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
          Nome do Espaço <span className="text-[#dc2626]">*</span>
        </label>

        <div className="relative">
          <Building2
            size={18}
            className="absolute left-[14px] top-[50%] -translate-y-[50%] text-[#9ca3af]"
          />
          <input
            value={formData.spaceName}
            onChange={(e) => onChange("spaceName", e.target.value)}
            className={`${baseInput} pl-[44px] ${
              errors.spaceName ? error : normal
            }`}
          />
        </div>

        {errors.spaceName && (
          <p className="mt-[6px] text-[13px] text-[#dc2626]">
            {errors.spaceName}
          </p>
        )}
      </div>

      {/* Tipo de espaço */}
      <div className="mb-[24px]">
        <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
          Tipo de Espaço <span className="text-[#dc2626]">*</span>
        </label>

        <select
          value={formData.spaceType}
          onChange={(e) => onChange("spaceType", e.target.value)}
          className={`${baseInput} bg-white ${
            errors.spaceType ? error : normal
          }`}
        >
          <option value="" disabled>
            Selecione o tipo
          </option>
          {spaceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {errors.spaceType && (
          <p className="mt-[6px] text-[13px] text-[#dc2626]">
            {errors.spaceType}
          </p>
        )}
      </div>

      {/* Descrição */}
      <div className="mb-[32px]">
        <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
          Descrição do Espaço <span className="text-[#dc2626]">*</span>
        </label>

        <textarea
          rows={5}
          value={formData.spaceDescription}
          onChange={(e) => onChange("spaceDescription", e.target.value)}
          placeholder="Descreva seu espaço..."
          className={`w-full px-[14px] py-[12px] rounded-[10px] border text-[14px] resize-none focus:outline-none focus:ring-2 ${
            errors.spaceDescription ? error : normal
          }`}
        />

        {errors.spaceDescription && (
          <p className="mt-[6px] text-[13px] text-[#dc2626]">
            {errors.spaceDescription}
          </p>
        )}
      </div>

      {/* Endereço */}
      <div className="pt-[32px] border-t border-[#e5e7eb]">
        <h3 className="text-[18px] font-[600] text-[#111827] mb-[20px]">
          Endereço
        </h3>

        {/* CEP / Rua */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              CEP <span className="text-[#dc2626]">*</span>
            </label>
            <input
              value={formData.zipCode}
              onChange={(e) => onZipCodeChange(e.target.value)}
              placeholder="00000-000"
              className={`${baseInput} ${errors.zipCode ? error : normal}`}
            />

            {errors.zipCode && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.zipCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              Rua / Avenida <span className="text-[#dc2626]">*</span>
            </label>
            <input
              value={formData.street}
              onChange={(e) => onChange("street", e.target.value)}
              className={`${baseInput} ${errors.street ? error : normal}`}
            />
            {errors.street && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.street}
              </p>
            )}
          </div>
        </div>

        {/* Número / Complemento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              Número <span className="text-[#dc2626]">*</span>
            </label>
            <input
              value={formData.number}
              onChange={(e) => onChange("number", e.target.value)}
              className={`${baseInput} ${errors.number ? error : normal}`}
            />
            {errors.number && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.number}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              Complemento
            </label>
            <input
              value={formData.complement}
              onChange={(e) => onChange("complement", e.target.value)}
              className={`${baseInput} ${normal}`}
            />
          </div>
        </div>

        {/* Bairro / Cidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[20px]">
          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              Bairro <span className="text-[#dc2626]">*</span>
            </label>
            <input
              value={formData.neighborhood}
              onChange={(e) => onChange("neighborhood", e.target.value)}
              className={`${baseInput} ${errors.neighborhood ? error : normal}`}
            />
            {errors.neighborhood && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.neighborhood}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-[500] mb-[6px]">
              Cidade <span className="text-[#dc2626]">*</span>
            </label>
            <input
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              className={`${baseInput} ${errors.city ? error : normal}`}
            />
            {errors.city && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-[14px] font-[500] mb-[6px]">
            Estado <span className="text-[#dc2626]">*</span>
          </label>
          <select
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            className={`${baseInput} bg-white ${errors.state ? error : normal}`}
          >
            <option value="" disabled>
              Selecione
            </option>
            {brazilStates.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>

          {errors.state && (
            <p className="mt-[6px] text-[13px] text-[#dc2626]">
              {errors.state}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
