import { AlertCircle } from "lucide-react";
import AmenitiesGrid from "./AmenitiesGrid";

export default function StepReview({
  formData,
  selectedAmenities,
  uploadedImages,
  agreedToTerms,
  setAgreedToTerms,
  errors,
}) {
  const Section = ({ title, children }) => (
    <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-[20px] mb-[20px]">
      <h3 className="text-[16px] font-[600] text-[#111827] mb-[12px]">
        {title}
      </h3>
      {children}
    </div>
  );

  const Item = ({ label, value }) => (
    <div>
      <div className="text-[13px] text-[#6b7280]">{label}</div>
      <div className="text-[14px] text-[#111827] font-[500]">
        {value || "-"}
      </div>
    </div>
  );

  const TextBlock = ({ label, value }) =>
    value ? (
      <div className="mt-[12px]">
        <div className="text-[13px] text-[#6b7280] mb-[4px]">{label}</div>
        <p className="text-[14px] text-[#374151] leading-relaxed whitespace-pre-line">
          {value}
        </p>
      </div>
    ) : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-[28px]">
        <h2 className="text-[24px] font-[700] text-[#111827]">
          Revisão dos Dados
        </h2>
        <p className="text-[15px] text-[#6b7280] mt-[6px]">
          Confira todas as informações antes de enviar sua solicitação
        </p>
      </div>

      {/* Proprietário */}
      <Section title="Proprietário">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <Item label="Nome" value={formData.ownerName} />
          <Item label="Documento" value={formData.ownerDocument} />
          <Item label="E-mail" value={formData.ownerEmail} />
          <Item label="Telefone" value={formData.ownerPhone} />
        </div>
      </Section>

      {/* Espaço */}
      <Section title="Espaço">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[12px]">
          <Item label="Nome" value={formData.spaceName} />
          <Item label="Tipo" value={formData.spaceType} />
          <Item
            label="Área"
            value={formData.totalArea && `${formData.totalArea} m²`}
          />
          <Item
            label="Capacidade"
            value={formData.capacity && `${formData.capacity} pessoas`}
          />
        </div>

        {/* Descrição do espaço (agora identificada) */}
        <TextBlock
          label="Descrição do Espaço"
          value={formData.spaceDescription}
        />

        {/* Informações adicionais (restaurado) */}
        <TextBlock
          label="Informações Adicionais"
          value={formData.additionalInfo}
        />
      </Section>

      {/* Endereço */}
      <Section title="Endereço">
        <p className="text-[14px] text-[#374151] leading-relaxed">
          {formData.street && `${formData.street}, ${formData.number}`}{" "}
          {formData.complement && `- ${formData.complement}`}
          <br />
          {formData.neighborhood && `${formData.neighborhood} - `}
          {formData.city && formData.city}
          {formData.state && ` / ${formData.state}`}
          <br />
          {formData.zipCode && `CEP: ${formData.zipCode}`}
        </p>
      </Section>

      {/* Preços */}
      <Section title="Preços">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          {formData.pricePerHour && (
            <Item label="Por Hora" value={`R$ ${formData.pricePerHour}`} />
          )}
          {formData.pricePerDay && (
            <Item label="Por Dia" value={`R$ ${formData.pricePerDay}`} />
          )}
          {formData.pricePerMonth && (
            <Item label="Mensal" value={`R$ ${formData.pricePerMonth}`} />
          )}
        </div>
      </Section>

      {/* Comodidades */}
      {selectedAmenities.length > 0 && (
        <Section title="Comodidades">
          <div className="flex flex-wrap gap-[10px]">
            {selectedAmenities.map((id) => {
              const amenity = AmenitiesGrid.AMENITIES.find((a) => a.id === id);
              const Icon = amenity?.icon;

              return (
                <div
                  key={id}
                  className="flex items-center gap-[8px]
                  px-[12px] py-[8px]
                  rounded-full
                  bg-emerald-50 text-emerald-700
                  text-[13px] font-[500]"
                >
                  {Icon && <Icon size={14} className="text-emerald-600" />}
                  <span>{amenity?.name || id}</span>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Fotos */}
      {uploadedImages.length > 0 && (
        <Section title="Fotos do Espaço">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
            {uploadedImages.map((file, i) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <img
                  key={i}
                  src={previewUrl}
                  alt={`foto-${i}`}
                  className="w-full h-[110px] object-cover rounded-[10px] border"
                  onLoad={() => URL.revokeObjectURL(previewUrl)} // libera memória
                />
              );
            })}
          </div>
        </Section>
      )}

      {/* Aviso */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-[14px] p-[18px] mb-[24px]">
        <div className="flex gap-[12px]">
          <AlertCircle className="text-yellow-600 mt-[2px]" size={20} />
          <div>
            <div className="text-[15px] font-[600] text-[#92400e]">
              Antes de enviar
            </div>
            <p className="text-[14px] text-[#92400e] mt-[4px]">
              Seu cadastro será analisado pela equipe Workly em até 48 horas.
              Você receberá um e-mail com os próximos passos.
            </p>
          </div>
        </div>
      </div>

      {/* Termos */}
      <div className="flex items-start gap-[12px]">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className={`mt-[3px] ${
            errors?.agreedToTerms ? "ring-2 ring-red-500 rounded" : ""
          }`}
        />
        <p className="text-[14px] text-[#374151]">
          Li e concordo com os{" "}
          <a href="#" className="text-emerald-600 font-[500] underline">
            Termos e Condições
          </a>{" "}
          e a{" "}
          <a href="#" className="text-emerald-600 font-[500] underline">
            Política de Privacidade
          </a>
          .
        </p>
      </div>

      {errors?.agreedToTerms && (
        <p className="mt-[6px] text-[13px] text-[#dc2626]">
          Você deve aceitar os termos para continuar
        </p>
      )}
    </div>
  );
}
