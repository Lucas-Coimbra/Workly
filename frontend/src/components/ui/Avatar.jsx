import { cn } from "./utils";

export function Avatar({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt || "Avatar"}
      className={cn("object-cover w-full h-full", className)}
    />
  );
}

export function AvatarFallback({ children, className }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full text-gray-600 text-sm font-medium bg-gray-200",
        className
      )}
    >
      {children || "?"}
    </div>
  );
}
