import { useState } from "react";
import { useCreateSpaceRequest } from "../hooks/spaceRequest/useCreateSpaceRequest";

import StepIndicator from "../components/SpaceRequest/StepIndicator";
import StepOwner from "../components/SpaceRequest/StepOwner";
import StepSpace from "../components/SpaceRequest/StepSpace";
import StepDetails from "../components/SpaceRequest/StepDetails";
import StepReview from "../components/SpaceRequest/StepReview";
import NavigationButtons from "../components/SpaceRequest/NavigationButtons";
import WhyWorkly from "../components/SpaceRequest/WhyWorkly";
import { CheckCircle, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SpaceRequest() {
  const navigate = useNavigate();
  const { submit, loading, error, success } = useCreateSpaceRequest();

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerDocument: "",
    ownerType: "individual",

    spaceName: "",
    spaceType: "",
    spaceDescription: "",

    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",

    totalArea: "",
    capacity: "",
    rooms: "",

    availability: "full-time",
    pricePerHour: "",
    pricePerDay: "",
    pricePerMonth: "",
    minimumBooking: "1",

    additionalInfo: "",
  });

  /* =========================
     HELPERS
  ========================== */

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addImage = (url) => {
    setUploadedImages((prev) => [...prev, url]);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleZipCodeChange = async (value) => {
    const zip = value.replace(/\D/g, "");

    handleInputChange("zipCode", value);

    if (zip.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
      const data = await response.json();

      if (data.erro) return;

      handleInputChange("street", data.logradouro || "");
      handleInputChange("neighborhood", data.bairro || "");
      handleInputChange("city", data.localidade || "");
      handleInputChange("state", data.uf || "");
    } catch (e) {
      console.error("Erro ao buscar CEP", e);
    }
  };

  /* =========================
     VALIDAÇÃO POR STEP
  ========================== */

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.ownerName) newErrors.ownerName = true;
      if (!formData.ownerEmail) newErrors.ownerEmail = true;
      if (!formData.ownerPhone) newErrors.ownerPhone = true;
      if (!formData.ownerDocument) newErrors.ownerDocument = true;
    }

    if (step === 2) {
      if (!formData.spaceName) newErrors.spaceName = "Informe o nome do espaço";

      if (!formData.spaceType)
        newErrors.spaceType = "Selecione o tipo de espaço";

      if (!formData.spaceDescription)
        newErrors.spaceDescription = "Informe a descrição";

      // ENDEREÇO (obrigatório)
      if (!formData.zipCode) newErrors.zipCode = "Informe o CEP";

      if (!formData.street) newErrors.street = "Informe a rua ou avenida";

      if (!formData.number) newErrors.number = "Informe o número";

      if (!formData.neighborhood) newErrors.neighborhood = "Informe o bairro";

      if (!formData.city) newErrors.city = "Informe a cidade";

      if (!formData.state) newErrors.state = "Selecione o estado";
    }

    if (step === 3) {
      // Métricas obrigatórias
      if (!formData.totalArea || Number(formData.totalArea) <= 0) {
        newErrors.totalArea = "Informe a área total";
      }

      if (!formData.capacity || Number(formData.capacity) <= 0) {
        newErrors.capacity = "Informe a capacidade";
      }

      if (!formData.rooms || Number(formData.rooms) < 1) {
        newErrors.rooms = "Informe ao menos 1 sala ou ambiente";
      }

      // Comodidades (mínimo 1)
      if (selectedAmenities.length === 0) {
        newErrors.amenities = "Selecione ao menos uma comodidade";
      }

      // Imagens (mínimo 1)
      if (uploadedImages.length === 0) {
        newErrors.images = "Adicione ao menos uma foto do espaço";
      }

      // Preços (todos obrigatórios e >= 1)
      if (!formData.pricePerHour || Number(formData.pricePerHour) < 1) {
        newErrors.pricePerHour = "Informe o preço por hora";
      }

      if (!formData.pricePerDay || Number(formData.pricePerDay) < 1) {
        newErrors.pricePerDay = "Informe o preço por dia";
      }

      if (!formData.pricePerMonth || Number(formData.pricePerMonth) < 1) {
        newErrors.pricePerMonth = "Informe o preço mensal";
      }

      if (!formData.minimumBooking || Number(formData.minimumBooking) < 1) {
        newErrors.minimumBooking =
          "Reserva mínima deve ser de pelo menos 1 hora";
      }
    }

    if (step === 4) {
      if (!agreedToTerms) newErrors.agreedToTerms = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     NAVEGAÇÃO
  ========================== */

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => Math.min(4, s + 1));
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  /* =========================
     SUBMIT FINAL
  ========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const formPayload = new FormData();

    // campos numéricos que o backend espera
    const numericFields = [
      "totalArea",
      "capacity",
      "rooms",
      "pricePerHour",
      "pricePerDay",
      "pricePerMonth",
      "minimumBooking",
    ];

    Object.entries(formData).forEach(([key, value]) => {
      if (numericFields.includes(key)) {
        formPayload.append(key, value ? Number(value) : ""); // converte para number
      } else {
        formPayload.append(key, value);
      }
    });

    // comodidades
    selectedAmenities.forEach((amenity) =>
      formPayload.append("amenities", amenity)
    );

    // imagens (arquivos reais)
    uploadedImages.forEach((file) => formPayload.append("images", file));

    try {
      await submit(formPayload); // envia FormData para o backend
    } catch {
      // erro tratado no hook
    }
  };

  /* =========================
     RENDER
  ========================== */

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-[24px] py-[16px] flex items-center justify-between">
          <div
            className="flex items-center gap-[12px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-[44px] h-[44px] bg-gradient-to-tr from-[#059669] to-[#047857] rounded-[10px] flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-[20px] font-[700] text-[#111827]">
              Workly
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="border border-[#e5e7eb] rounded-[8px]
              px-[16px] py-[8px] text-[14px] font-[600]
              text-[#374151] hover:bg-[#f9fafb]"
          >
            Voltar
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-[24px] py-[48px]">
        {/* HERO */}
        <div className="text-center mb-[40px]">
          <div
            className="mx-auto w-[80px] h-[80px] rounded-full
            bg-[#d6f6e7] flex items-center justify-center"
          >
            <Building2 size={36} className="text-[#059669]" />
          </div>

          <h1 className="text-[36px] font-[700] text-[#111827] mt-[24px]">
            Cadastre seu Espaço
          </h1>

          <p className="text-[18px] text-[#6b7280] mt-[12px] leading-[1.6]">
            Faça parte da rede Workly e conecte seu espaço a milhares de
            profissionais
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white p-[40px] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <StepIndicator currentStep={currentStep} />

          <form onSubmit={handleSubmit}>
            <div className="mt-[32px]">
              {currentStep === 1 && (
                <StepOwner
                  formData={formData}
                  onChange={handleInputChange}
                  errors={errors}
                />
              )}
              {currentStep === 2 && (
                <StepSpace
                  formData={formData}
                  onChange={handleInputChange}
                  onZipCodeChange={handleZipCodeChange}
                  errors={errors}
                />
              )}
              {currentStep === 3 && (
                <StepDetails
                  formData={formData}
                  onChange={handleInputChange}
                  selectedAmenities={selectedAmenities}
                  toggleAmenity={toggleAmenity}
                  uploadedImages={uploadedImages}
                  addImage={addImage}
                  removeImage={removeImage}
                  errors={errors}
                />
              )}
              {currentStep === 4 && (
                <StepReview
                  formData={formData}
                  selectedAmenities={selectedAmenities}
                  uploadedImages={uploadedImages}
                  agreedToTerms={agreedToTerms}
                  setAgreedToTerms={setAgreedToTerms}
                  errors={errors}
                />
              )}
            </div>

            <NavigationButtons
              currentStep={currentStep}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
              agreedToTerms={agreedToTerms && !loading}
            />
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {typeof error === "string"
                ? error
                : error.message || "Erro ao enviar solicitação"}
            </div>
          )}

          {loading && (
            <p className="mt-4 text-sm text-gray-500">
              Enviando solicitação...
            </p>
          )}
        </div>
      </main>

      <WhyWorkly />

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] max-w-md w-full p-[32px] text-center">
            <CheckCircle size={64} className="text-[#059669] mx-auto" />
            <h2 className="text-[24px] font-[700] mt-[16px]">
              Solicitação Enviada!
            </h2>
            <p className="text-[#6b7280] mt-[8px]">
              Você receberá um e-mail em <strong>{formData.ownerEmail}</strong>.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-[20px] w-full bg-[#059669] hover:bg-[#047857] text-white rounded-[8px] py-[12px]"
            >
              Voltar para Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
