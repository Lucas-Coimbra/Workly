import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";

/* =========================
   Tabs Root
========================= */
export function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

/* =========================
   Tabs List
========================= */
export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-xl bg-muted p-[3px] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Tabs Trigger
========================= */
export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-1 text-sm font-medium whitespace-nowrap transition-all",
        "border border-transparent",
        "text-foreground dark:text-muted-foreground",
        "data-[state=active]:bg-card data-[state=active]:text-foreground",
        "dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )}
      {...props}
    />
  );
}

/* =========================
   Tabs Content
========================= */
export function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}
