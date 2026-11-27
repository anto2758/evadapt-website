"use client";

import { ArrowRight } from "lucide-react";
import { Button1 } from "./button1";

export function MarketingPrimaryCta({
  label,
  className,
  variant = "default",
}: {
  label: string;
  className?: string;
  variant?: "default" | "raised";
}) {
  const content = (
    <>
      {label}
      <ArrowRight
        size={15}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </>
  );

  if (variant === "raised") {
    return (
      <Button1
        theme="dark"
        fill="linear-gradient(180deg, #f7f5f3 0%, #efe6de 100%)"
        colors={{ primary: "#e8b48a" }}
        className={className}
      >
        {content}
      </Button1>
    );
  }

  return (
    <button type="button" className={className ?? ""}>
      {content}
    </button>
  );
}
