"use client";

import React, { ReactNode, CSSProperties } from "react";

interface GhostButtonProps {
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  as?: "button" | "div";
}

const GhostButton: React.FC<GhostButtonProps> = ({
  label,
  onClick,
  children,
  style,
  className,
  as = "button",
}) => {
  const Component = as;

  return (
    <Component
      onClick={onClick}
      style={style}
      className={`
                bg-transparent text-deemphasized transition-colors duration-300 text-[14px] px-[12px] py-[9px] rounded-[4px] space-x-2
                hover:bg-black/5 hover:text-black
                ${className}
            `}
      role={as === "div" ? "button" : undefined}
      tabIndex={as === "div" ? 0 : undefined}
    >
      {label ? label : children}
    </Component>
  );
};

export default GhostButton;
