import { CheckCircle } from "lucide-react";

export default function StepIndicator({ currentStep }) {
  const steps = [
    { label: "Proprietário" },
    { label: "Espaço" },
    { label: "Detalhes" },
    { label: "Revisão" },
  ];

  return (
    <div className="flex items-center justify-between mb-[40px]">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={step.label}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Linha */}
            {index < steps.length - 1 && (
              <div
                className="
                  absolute
                  top-[24px]
                  left-[50%]
                  right-[-50%]
                  h-[2px]
                  bg-[#e5e7eb]
                  z-[1]
                "
              />
            )}

            {/* Círculo */}
            <div
              className={`
                w-[48px] h-[48px]
                rounded-full
                flex items-center justify-center
                text-[18px]
                font-[600]
                z-[2]
                transition-all
                ${
                  isCompleted
                    ? "bg-[#059669] text-white"
                    : isActive
                    ? "bg-[#ecfdf5] text-[#059669] border-[2px] border-[#059669]"
                    : "bg-[#f3f4f6] text-[#9ca3af]"
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle size={20} className="text-white" />
              ) : (
                stepNumber
              )}
            </div>

            {/* Label */}
            <span
              className={`
                mt-[12px]
                text-[14px]
                font-[500]
                ${isCompleted || isActive ? "text-[#111827]" : "text-[#9ca3af]"}
              `}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
