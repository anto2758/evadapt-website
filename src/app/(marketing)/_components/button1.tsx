"use client";

import React, { useCallback, useState, type ReactNode } from "react";

interface Button1Props {
  buttonText?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  theme?: string;
  buttonUrl?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  colors?: {
    primary?: string;
    secondary?: string;
  };
}

const lightBg = "#2F2F2F";
const lightText = "#F5F5F5";
const darkBg = "#F0F0F0";
const darkText = "#2F2F2F";

/**
 * Convert “#rrggbb” (or “#rgb”) to an rgba string with the given alpha.
 */
const hexToRgba = (hex: string, alpha: number): string => {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(clean, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Button1: React.FC<Button1Props> = ({
  buttonText,
  children,
  className,
  disabled = false,
  theme,
  buttonUrl,
  onClick,
  colors,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isDark = theme === "dark";
  const bg = isDark ? darkBg : lightBg;
  const text = isDark ? darkText : lightText;

  const colorHex = colors?.primary;

  // Label offset should visually match how much we “lose” from the bottom inner shadows
  const pressOffset = 0.5; // px

  /* ---------- SHADOWS (LIGHT) ---------- */
  const lightDefaultShadow = `
    inset 0 -2px 0px rgba(0, 0, 0, 0.5),
    inset 0 -6px 4px ${
      colorHex ? hexToRgba(colorHex, 0.05) : "rgba(255, 255, 255, 0.05)"
    },
    inset 0 4px 6px rgba(0, 0, 0, 0.15),
    inset 0 -3px 0px rgba(0, 0, 0, 0.5),
    inset 0 1px 0px rgba(255, 255, 255, 0.25),
    0 20px 40px rgba(0, 0, 0, 0.05),
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.15),
    0 4px 6px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.07)
  `;

  const lightHoverShadow = `
    inset 0 -2px 0px rgba(0, 0, 0, 0.5),
    inset 0 -7px 5px ${
      colorHex ? hexToRgba(colorHex, 0.07) : "rgba(255, 255, 255, 0.07)"
    },
    inset 0 4px 6px rgba(0, 0, 0, 0.15),
    inset 0 -3px 0px rgba(0, 0, 0, 0.5),
    inset 0 1px 0px rgba(255, 255, 255, 0.25),
    0 30px 60px rgba(0, 0, 0, 0.06),
    0 15px 30px rgba(0, 0, 0, 0.11),
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 6px 8px rgba(0, 0, 0, 0.07),
    0 3px 6px rgba(0, 0, 0, 0.1)
  `;

  // “Pressed” trims the bottom inner edges so it looks like the key sunk in
  const lightPressedShadow = `
    inset 0 -1px 0px rgba(0, 0, 0, 0.45),
    inset 0 -2px 2px ${
      colorHex ? hexToRgba(colorHex, 0.05) : "rgba(255, 255, 255, 0.05)"
    },
    inset 0 3px 5px rgba(0, 0, 0, 0.14),
    inset 0 -1px 0px rgba(0, 0, 0, 0.45),
    inset 0 1px 0px rgba(255, 255, 255, 0.22),
    0 12px 24px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.09),
    0 1px 2px rgba(0, 0, 0, 0.14),
    0 3px 5px rgba(0, 0, 0, 0.11),
    0 2px 3px rgba(0, 0, 0, 0.07)
  `;

  /* ---------- SHADOWS (DARK) ---------- */
  const darkDefaultShadow = `
    inset 0 -2px 0px rgba(255, 255, 255, 0.35),
    inset 0 -6px 4px ${
      colorHex ? hexToRgba(colorHex, 0.025) : "rgba(0, 0, 0, 0.025)"
    },
    inset 0 4px 6px rgba(255, 255, 255, 0.075),
    inset 0 -3px 0px rgba(255, 255, 255, 0.35),
    inset 0 1px 0px rgba(0, 0, 0, 0.075),
    0 20px 40px rgba(255, 255, 255, 0.06),
    0 10px 20px rgba(255, 255, 255, 0.09),
    0 1px 2px rgba(255, 255, 255, 0.125),
    0 4px 6px rgba(255, 255, 255, 0.09),
    0 2px 4px rgba(255, 255, 255, 0.06)
  `;

  const darkHoverShadow = `
    inset 0 -2px 0px rgba(255, 255, 255, 0.4),
    inset 0 -7px 5px ${
      colorHex ? hexToRgba(colorHex, 0.05) : "rgba(0, 0, 0, 0.05)"
    },
    inset 0 4px 6px rgba(255, 255, 255, 0.11),
    inset 0 -3px 0px rgba(255, 255, 255, 0.4),
    inset 0 1px 0px rgba(0, 0, 0, 0.09),
    0 30px 60px rgba(255, 255, 255, 0.075),
    0 15px 30px rgba(255, 255, 255, 0.11),
    0 2px 4px rgba(255, 255, 255, 0.16),
    0 6px 8px rgba(255, 255, 255, 0.09),
    0 3px 6px rgba(255, 255, 255, 0.11)
  `;

  const darkPressedShadow = `
    inset 0 -1px 0px rgba(255, 255, 255, 0.65),
    inset 0 -2px 2px ${
      colorHex ? hexToRgba(colorHex, 0.08) : "rgba(0, 0, 0, 0.08)"
    },
    inset 0 3px 5px rgba(255, 255, 255, 0.20),
    inset 0 -1px 0px rgba(255, 255, 255, 0.65),
    inset 0 1px 0px rgba(0, 0, 0, 0.16),
    0 12px 24px rgba(255, 255, 255, 0.14),
    0 8px 16px rgba(255, 255, 255, 0.20),
    0 1px 2px rgba(255, 255, 255, 0.28),
    0 3px 5px rgba(255, 255, 255, 0.20),
    0 2px 3px rgba(255, 255, 255, 0.14)
  `;

  const defaultBoxShadow = isDark ? darkDefaultShadow : lightDefaultShadow;
  const hoverBoxShadow = isDark ? darkHoverShadow : lightHoverShadow;
  const pressedBoxShadow = isDark ? darkPressedShadow : lightPressedShadow;

  const computeShadow = () => {
    if (pressed) return pressedBoxShadow;
    if (hovered) return hoverBoxShadow;
    return defaultBoxShadow;
  };

  const handleClick = useCallback(() => {
    if (buttonUrl) {
      try {
        window.open(buttonUrl, "_self");
      } catch {
        /* no-op */
      }
    }
  }, [buttonUrl]);

  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        className={`rounded-[4px] px-[22px] py-[9px] text-[14px] transition-[box-shadow,transform] duration-150 whitespace-nowrap select-none outline-none disabled:cursor-wait disabled:opacity-70 ${
          className ?? ""
        }`}
        style={{
          background: bg,
          color: text,
          boxShadow: computeShadow(),
          transform: pressed ? `translateY(${pressOffset}px)` : "translateY(0)",
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          setPressed(true);
        }}
        onPointerUp={() => setPressed(false)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            setPressed(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") {
            setPressed(false);
          }
        }}
        onClick={(event) => {
          handleClick();
          onClick?.(event);
        }}
      >
        <span
          className="inline-flex items-center gap-2"
          style={{
            transform: pressed
              ? `translateY(${pressOffset}px)`
              : "translateY(0)",
            transition: "transform 150ms ease",
          }}
        >
          {children ?? buttonText}
        </span>
      </button>
    </div>
  );
};

export default Button1;
