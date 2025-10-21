import { cn } from "./utils";

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6 text-base",
    icon: "h-9 w-9",
  };

  return (
    <Comp
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
