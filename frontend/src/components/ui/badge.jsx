import * as React from "react";
import { cva } from "class-variance-authority";
import * as Slot from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",

        secondary:
          "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",

        destructive:
          "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",

        outline:
          "border-gray-300 text-foreground bg-transparent hover:bg-gray-50",

        ghost:
          "border border-gray-200 bg-gray-50 text-foreground hover:bg-gray-100",

        link: "text-primary underline-offset-4 hover:underline border-none bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };