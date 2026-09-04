import React, { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const delaySec = delay > 10 ? delay / 1000 : delay;
      const startValue = direction === "down" ? value : 0;
      const endValue = direction === "down" ? 0 : value;

      const controls = animate(startValue, endValue, {
        duration: duration,
        delay: delaySec,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted = Intl.NumberFormat("en-US", {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            }).format(Number(latest.toFixed(decimalPlaces)));
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, delay, value, direction, duration, decimalPlaces, prefix, suffix]);

  const initialFormatted = Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(direction === "down" ? value : 0);

  return (
    <span
      className={cn(
        "inline-block tabular-nums tracking-tight font-sans",
        className
      )}
      ref={ref}
    >
      {prefix}{initialFormatted}{suffix}
    </span>
  );
}

export default NumberTicker;
