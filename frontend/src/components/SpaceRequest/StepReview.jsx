import { AlertCircle } from "lucide-react";
import { amenitiesList as AMENITIES } from "../../mocks/mockData";

export default function StepReview({
  formData,
  selectedAmenities,
  uploadedImages,
  agreedToTerms,
  setAgreedToTerms,
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

        {formData.spaceDescription && (
          <p className="text-[14px] text-[#374151] mt-[8px]">
            {formData.spaceDescription}
          </p>
        )}
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
          <div className="flex flex-wrap gap-[8px]">
            {selectedAmenities.map((id) => {
              const amenity = AMENITIES.find((a) => a.id === id);
              return (
                <span
                  key={id}
                  className="px-[10px] py-[6px] rounded-full
                    bg-emerald-50 text-emerald-700
                    text-[13px] font-[500]"
                >
                  {amenity?.name || id}
                </span>
              );
            })}
          </div>
        </Section>
      )}

      {/* Fotos */}
      {uploadedImages.length > 0 && (
        <Section title="Fotos do Espaço">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
            {uploadedImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`foto-${i}`}
                className="w-full h-[110px] object-cover rounded-[10px] border"
              />
            ))}
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
          className="mt-[3px]"
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
    </div>
  );
}
