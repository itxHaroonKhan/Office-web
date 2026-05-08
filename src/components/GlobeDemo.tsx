import React from "react";
import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

export function GlobeDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-full items-center justify-center overflow-hidden bg-transparent", className)}>
      <div className="relative w-full aspect-square max-w-[600px] opacity-80">
        <Globe className="top-0" />
      </div>
    </div>
  );
}
