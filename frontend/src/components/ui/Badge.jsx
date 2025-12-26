import { cn } from "./utils";

export function Badge({ children, variant = "default", className, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors overflow-hidden";

  const variants = {
    default: "bg-blue-600 text-white border-transparent",
    secondary: "bg-gray-200 text-gray-900 border-transparent hover:bg-gray-300",
    destructive: "bg-red-600 text-white border-transparent hover:bg-red-700",
    outline: "border text-gray-800 hover:bg-gray-100",
    ticketOpen: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    ticketProgress: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    ticketResolved: "bg-green-100 text-green-700 hover:bg-green-200",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
