import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "block w-full rounded-md border-black pl-10 pr-3 py-2 focus:border-indigo-500 ring-0  sm:text-sm shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
