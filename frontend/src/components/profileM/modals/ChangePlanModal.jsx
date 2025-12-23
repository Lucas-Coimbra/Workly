import { Card } from "../../ui";
import { X } from "lucide-react";
import PlanSelector from "../PlanSelector";

export default function ChangePlanModal({
  open,
  onClose,
  plans,
  currentPlanName,
}) {
  if (!open) return null;

  const handleSelectPlan = (planName) => {
    alert(`Plano selecionado: ${planName}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card
        className="max-w-5xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Alterar plano</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <PlanSelector
          plans={plans}
          currentPlanName={currentPlanName}
          onSelectPlan={handleSelectPlan}
        />
      </Card>
    </div>
  );
}
