import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#38bdf8",
      shimmerSize = "0.08em",
      shimmerDuration = "2.6s",
      borderRadius = "9999px",
      background = "#ffffff",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--bg": background,
            "--shimmer": shimmerColor,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] px-8 py-3.5 whitespace-nowrap text-slate-950 font-bold transition-all duration-300 ease-out active:scale-95 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-[1.03] border-2 border-sky-400/80",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Animated perimeter rotating shimmer laser */}
        <span
          className="absolute -inset-[180%] animate-[spin_2.8s_linear_infinite] pointer-events-none opacity-95"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg 240deg, ${shimmerColor} 300deg, #ffffff 340deg, #0284c7 360deg)`,
          }}
        />

        {/* Button body surface */}
        <span
          className="absolute inset-[2px] [border-radius:inherit] pointer-events-none transition-colors duration-300"
          style={{
            background: background,
          }}
        />

        {/* Specular Shimmer-Sweep Hover Sheen across button face */}
        <span className="absolute inset-0 z-10 pointer-events-none overflow-hidden [border-radius:inherit]">
          <span
            className="absolute inset-0 w-[140%] -left-[20%] animate-btn-shimmer opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(2, 132, 199, 0.4) 35%, rgba(56, 189, 248, 0.85) 48%, rgba(255, 255, 255, 1) 50%, rgba(14, 165, 233, 0.85) 52%, rgba(99, 102, 241, 0.4) 65%, transparent 80%)",
            }}
          />
        </span>

        {/* Text / Content */}
        <span className="relative z-20 flex items-center justify-center gap-2 tracking-wider uppercase font-extrabold text-xs text-slate-950 select-none">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
