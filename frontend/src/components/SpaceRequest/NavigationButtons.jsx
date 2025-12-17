export default function NavigationButtons({
  currentStep,
  onPrev,
  onNext,
  onSubmit,
  agreedToTerms,
}) {
  return (
    <div className="flex gap-[16px] mt-[40px]">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="
            flex-1
            h-[48px]
            rounded-[10px]
            border border-[#e5e7eb]
            text-[#374151]
            text-[15px]
            font-[500]
            bg-white
            hover:bg-[#f9fafb]
            transition
          "
        >
          Voltar
        </button>
      )}

      {currentStep < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="
            flex-1
            h-[48px]
            rounded-[10px]
            bg-[#059669]
            hover:bg-[#047857]
            text-white
            text-[15px]
            font-[600]
            transition
          "
        >
          Próximo
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          disabled={!agreedToTerms}
          className={`
            flex-1
            h-[48px]
            rounded-[10px]
            text-[15px]
            font-[600]
            transition
            ${
              agreedToTerms
                ? "bg-[#059669] hover:bg-[#047857] text-white"
                : "bg-[#d1d5db] text-[#9ca3af] cursor-not-allowed"
            }
          `}
        >
          Enviar Solicitação
        </button>
      )}
    </div>
  );
}
