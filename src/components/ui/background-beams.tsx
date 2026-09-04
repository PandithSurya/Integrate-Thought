"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    // 22 curated smooth sweeping bezier curve tracks across the card
    const paths = [
      "M-200 40 C 100 130, 300 -40, 700 80 C 900 140, 1100 40, 1400 120",
      "M-200 80 C 120 170, 320 0, 720 120 C 920 180, 1120 80, 1400 160",
      "M-200 120 C 140 210, 340 40, 740 160 C 940 220, 1140 120, 1400 200",
      "M-200 160 C 160 250, 360 80, 760 200 C 960 260, 1160 160, 1400 240",
      "M-200 200 C 180 290, 380 120, 780 240 C 980 300, 1180 200, 1400 280",
      "M-200 240 C 200 330, 400 160, 800 280 C 1000 340, 1200 240, 1400 320",
      "M-200 280 C 220 370, 420 200, 820 320 C 1020 380, 1220 280, 1400 360",
      "M-200 320 C 240 410, 440 240, 840 360 C 1040 420, 1240 320, 1400 400",
      "M-150 -50 C 50 180, 450 120, 850 380 C 1050 480, 1150 350, 1450 450",
      "M-150 0 C 70 230, 470 170, 870 430 C 1070 530, 1170 400, 1450 500",
      "M-150 50 C 90 280, 490 220, 890 480 C 1090 580, 1190 450, 1450 550",
      "M-150 100 C 110 330, 510 270, 910 530 C 1110 630, 1210 500, 1450 600",
      "M 1450 -40 C 1050 100, 750 40, 350 280 C 150 380, -50 260, -250 360",
      "M 1450 20 C 1070 160, 770 100, 370 340 C 170 440, -30 320, -250 420",
      "M 1450 80 C 1090 220, 790 160, 390 400 C 190 500, -10 380, -250 480",
      "M 1450 140 C 1110 280, 810 220, 410 460 C 210 560, 10 440, -250 540",
      "M-100 450 C 250 200, 550 480, 950 180 C 1150 60, 1250 150, 1450 100",
      "M-100 490 C 270 240, 570 520, 970 220 C 1170 100, 1270 190, 1450 140",
      "M-100 530 C 290 280, 590 560, 990 260 C 1190 140, 1290 230, 1450 180",
      "M-100 570 C 310 320, 610 600, 1010 300 C 1210 180, 1310 270, 1450 220",
    ];

    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none z-0 select-none",
          className
        )}
      >
        {/* Luminous Ambient Drifting Spotlights */}
        <motion.div
          animate={{
            x: [-40, 50, -30, -40],
            y: [-30, 40, -20, -30],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.55, 0.85, 0.6, 0.55],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-28 w-[550px] h-[380px] rounded-full bg-gradient-to-br from-sky-400/50 via-blue-600/35 to-transparent blur-2xl"
        />

        <motion.div
          animate={{
            x: [40, -45, 30, 40],
            y: [30, -40, 20, 30],
            scale: [1.15, 0.9, 1.25, 1.15],
            opacity: [0.5, 0.8, 0.55, 0.5],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-36 -right-24 w-[600px] h-[400px] rounded-full bg-gradient-to-tl from-indigo-500/45 via-cyan-400/40 to-transparent blur-2xl"
        />

        <motion.div
          animate={{
            x: [0, 35, -35, 0],
            y: [0, -25, 25, 0],
            opacity: [0.35, 0.65, 0.4, 0.35],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-gradient-to-r from-cyan-400/35 via-blue-500/30 to-violet-500/35 blur-2xl"
        />

        {/* Luminous Light Beam Tracks & Traveling Pulses */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beam-grad-cyan-bright" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="25%" stopColor="#00b4d8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="75%" stopColor="#818cf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="beam-grad-blue-bright" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="65%" stopColor="#6366f1" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="track-visible" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Static guiding fiber tracks */}
          {paths.map((d, i) => (
            <path
              key={`track-${i}`}
              d={d}
              stroke="url(#track-visible)"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          ))}

          {/* Flowing radiant light beams */}
          {paths.map((d, i) => {
            const gradId = i % 2 === 0 ? "url(#beam-grad-cyan-bright)" : "url(#beam-grad-blue-bright)";
            const duration = 6.5 + (i % 5) * 1.5;
            const delay = (i % 6) * 0.9;

            return (
              <motion.path
                key={`beam-${i}`}
                d={d}
                stroke={gradId}
                strokeWidth={i % 3 === 0 ? "2.6" : "1.9"}
                strokeDasharray="220 580"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0, opacity: 0.7 }}
                animate={{
                  strokeDashoffset: [-800, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  strokeDashoffset: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay,
                  },
                  opacity: {
                    duration: duration * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            );
          })}
        </svg>

        {/* Center reading spotlight vignette to keep headline razor sharp */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(3, 7, 18, 0.25) 0%, rgba(3, 7, 18, 0.72) 100%)",
          }}
        />
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
export default BackgroundBeams;
