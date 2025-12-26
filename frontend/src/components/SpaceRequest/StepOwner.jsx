import { User, FileText, Mail, Phone } from "lucide-react";
import { NumericFormat } from "react-number-format";

export default function StepOwner({ formData, onChange, errors = {} }) {
  const isCompany = formData.ownerType === "company";

  return (
    <div>
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#111827]">
          Informações do Proprietário
        </h2>
        <p className="text-sm text-[#6b7280] mt-1">
          Comece nos contando sobre você ou sua empresa
        </p>
      </div>

      {/* Tipo de cadastro */}
      <div className="mb-8">
        <span className="block text-sm font-medium text-[#374151] mb-3">
          Tipo de Cadastro <span className="text-red-600">*</span>
        </span>

        <div className="flex gap-4">
          {[
            { value: "individual", label: "Pessoa Física" },
            { value: "company", label: "Pessoa Jurídica" },
          ].map((option) => {
            const checked = formData.ownerType === option.value;

            return (
              <label
                key={option.value}
                className={`
                  flex items-center gap-2
                  px-4 py-3
                  rounded-lg border cursor-pointer
                  ${
                    checked
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }
                `}
              >
                <input
                  type="radio"
                  name="ownerType"
                  value={option.value}
                  checked={checked}
                  onChange={(e) => {
                    onChange("ownerType", e.target.value);
                    onChange("ownerDocument", "");
                  }}
                  className="hidden"
                />

                <span
                  className={`
                    w-4 h-4 rounded-full border-2
                    flex items-center justify-center
                    ${checked ? "border-green-600" : "border-gray-400"}
                  `}
                >
                  {checked && (
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  )}
                </span>

                <span className="text-sm font-medium text-[#111827]">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">
            {isCompany ? "Nome da Empresa" : "Nome Completo"}{" "}
            <span className="text-red-600">*</span>
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => onChange("ownerName", e.target.value)}
              placeholder="Digite o nome"
              className={`
                w-full h-12 pl-10 pr-3 border rounded-lg text-sm
                ${
                  errors.ownerName
                    ? "border-red-600"
                    : "border-gray-300 focus:border-green-600"
                }
              `}
            />
          </div>

          {errors.ownerName && (
            <p className="text-xs text-red-600 mt-1">Campo obrigatório</p>
          )}
        </div>

        {/* Documento (CPF / CNPJ) */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">
            {isCompany ? "CNPJ" : "CPF"} <span className="text-red-600">*</span>
          </label>

          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <NumericFormat
              value={formData.ownerDocument}
              onValueChange={(values) =>
                onChange("ownerDocument", values.formattedValue)
              }
              format={isCompany ? "##.###.###/####-##" : "###.###.###-##"}
              placeholder={isCompany ? "00.000.000/0000-00" : "000.000.000-00"}
              className={`
                w-full h-12 pl-10 pr-3 border rounded-lg text-sm
                ${
                  errors.ownerDocument
                    ? "border-red-600"
                    : "border-gray-300 focus:border-green-600"
                }
              `}
            />
          </div>

          {errors.ownerDocument && (
            <p className="text-xs text-red-600 mt-1">Documento obrigatório</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">
            E-mail <span className="text-red-600">*</span>
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => onChange("ownerEmail", e.target.value)}
              placeholder="seuemail@exemplo.com"
              className={`
                w-full h-12 pl-10 pr-3 border rounded-lg text-sm
                ${
                  errors.ownerEmail
                    ? "border-red-600"
                    : "border-gray-300 focus:border-green-600"
                }
              `}
            />
          </div>

          {errors.ownerEmail && (
            <p className="text-xs text-red-600 mt-1">
              Informe um e-mail válido
            </p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1">
            Telefone <span className="text-red-600">*</span>
          </label>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <NumericFormat
              value={formData.ownerPhone}
              onValueChange={(values) =>
                onChange("ownerPhone", values.formattedValue)
              }
              format="(##) #####-####"
              placeholder="(00) 00000-0000"
              className={`
                w-full h-12 pl-10 pr-3 border rounded-lg text-sm
                ${
                  errors.ownerPhone
                    ? "border-red-600"
                    : "border-gray-300 focus:border-green-600"
                }
              `}
            />
          </div>

          {errors.ownerPhone && (
            <p className="text-xs text-red-600 mt-1">Telefone obrigatório</p>
          )}
        </div>
      </div>
    </div>
  );
}
