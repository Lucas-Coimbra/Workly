import { User, FileText, Mail, Phone } from "lucide-react";

export default function StepOwner({ formData, onChange, errors = {} }) {
  return (
    <div>
      {/* Título */}
      <div className="mb-[32px]">
        <h2 className="text-[24px] font-[700] text-[#111827]">
          Informações do Proprietário
        </h2>
        <p className="text-[15px] text-[#6b7280] mt-[6px]">
          Comece nos contando sobre você ou sua empresa
        </p>
      </div>

      {/* Tipo de cadastro */}
      <div className="mb-[32px]">
        <span className="block text-[14px] font-[500] text-[#374151] mb-[12px]">
          Tipo de Cadastro <span className="text-[#dc2626]">*</span>
        </span>

        <div className="flex gap-[16px]">
          {[
            { value: "individual", label: "Pessoa Física" },
            { value: "company", label: "Pessoa Jurídica" },
          ].map((option) => {
            const checked = formData.ownerType === option.value;

            return (
              <label
                key={option.value}
                className={`
                  flex items-center gap-[10px]
                  px-[16px] py-[12px]
                  rounded-[10px]
                  border
                  cursor-pointer
                  transition
                  ${
                    checked
                      ? "border-[#059669] bg-[#ecfdf5]"
                      : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"
                  }
                `}
              >
                <span
                  className={`
                    w-[18px] h-[18px]
                    rounded-full
                    border-[2px]
                    flex items-center justify-center
                    ${checked ? "border-[#059669]" : "border-[#9ca3af]"}
                  `}
                >
                  {checked && (
                    <span className="w-[8px] h-[8px] rounded-full bg-[#059669]" />
                  )}
                </span>

                <input
                  type="radio"
                  name="ownerType"
                  value={option.value}
                  checked={checked}
                  onChange={(e) => onChange("ownerType", e.target.value)}
                  className="hidden"
                />

                <span className="text-[14px] font-[500] text-[#111827]">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
        {/* Nome */}
        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            {formData.ownerType === "company"
              ? "Nome da Empresa"
              : "Nome Completo"}{" "}
            <span className="text-[#dc2626]">*</span>
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-[14px] top-[50%] -translate-y-[50%] text-[#9ca3af]"
            />
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => onChange("ownerName", e.target.value)}
              placeholder="Digite o nome"
              className={`
                w-full h-[48px]
                pl-[44px] pr-[14px]
                rounded-[10px]
                border
                text-[14px]
                text-[#111827]
                placeholder:text-[#9ca3af]
                focus:outline-none
                focus:ring-2
                transition
              ${
                errors.ownerName
                  ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20"
                  : "border-[#e5e7eb] focus:border-[#059669] focus:ring-[#059669]/20"
              }
            `}
            />

            {errors.ownerName && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                Este campo é obrigatório
              </p>
            )}
          </div>
        </div>

        {/* Documento */}
        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            {formData.ownerType === "company" ? "CNPJ" : "CPF"}{" "}
            <span className="text-[#dc2626]">*</span>
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-[14px] top-[50%] -translate-y-[50%] text-[#9ca3af]"
            />
            <input
              type="text"
              value={formData.ownerDocument}
              onChange={(e) => onChange("ownerDocument", e.target.value)}
              placeholder={
                formData.ownerType === "company"
                  ? "00.000.000/0000-00"
                  : "000.000.000-00"
              }
              className={`
                w-full h-[48px]
                pl-[44px] pr-[14px]
                rounded-[10px]
                border
                text-[14px]
                text-[#111827]
                placeholder:text-[#9ca3af]
                focus:outline-none
                focus:ring-2
                transition
                ${
                  errors.ownerDocument
                    ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20"
                    : "border-[#e5e7eb] focus:border-[#059669] focus:ring-[#059669]/20"
                }
              `}
            />

            {errors.ownerDocument && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                Documento obrigatório
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            E-mail <span className="text-[#dc2626]">*</span>
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-[14px] top-[50%] -translate-y-[50%] text-[#9ca3af]"
            />
            <input
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => onChange("ownerEmail", e.target.value)}
              placeholder="seuemail@exemplo.com"
              className={`
                w-full h-[48px]
                pl-[44px] pr-[14px]
                rounded-[10px]
                border
                text-[14px]
                text-[#111827]
                placeholder:text-[#9ca3af]
                focus:outline-none
                focus:ring-2
                transition
                ${
                  errors.ownerEmail
                    ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20"
                    : "border-[#e5e7eb] focus:border-[#059669] focus:ring-[#059669]/20"
                }
              `}
            />

            {errors.ownerEmail && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                Informe um e-mail válido
              </p>
            )}
          </div>
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-[14px] font-[500] text-[#374151] mb-[6px]">
            Telefone <span className="text-[#dc2626]">*</span>
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-[14px] top-[50%] -translate-y-[50%] text-[#9ca3af]"
            />
            <input
              type="text"
              value={formData.ownerPhone}
              onChange={(e) => onChange("ownerPhone", e.target.value)}
              placeholder="(00) 00000-0000"
              className={`
                w-full h-[48px]
                pl-[44px] pr-[14px]
                rounded-[10px]
                border
                text-[14px]
                text-[#111827]
                placeholder:text-[#9ca3af]
                focus:outline-none
                focus:ring-2
                transition
                ${
                  errors.ownerPhone
                    ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20"
                    : "border-[#e5e7eb] focus:border-[#059669] focus:ring-[#059669]/20"
                }
              `}
            />

            {errors.ownerPhone && (
              <p className="mt-[6px] text-[13px] text-[#dc2626]">
                Telefone obrigatório
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
