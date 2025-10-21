import { cn } from "./utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white text-gray-900 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("px-6 pt-6 border-b border-gray-100", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h4
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-gray-500 text-sm", className)} {...props} />;
}

export function CardAction({ className, ...props }) {
  return (
    <div className={cn("ml-auto flex items-center", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center px-6 pb-6 border-t border-gray-100",
        className
      )}
      {...props}
    />
  );
}
