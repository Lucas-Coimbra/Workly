import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "./utils";

export function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex items-center justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-800",
        "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
        "transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50 w-5 h-5",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white"
      >
        <CheckIcon className="w-4 h-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
