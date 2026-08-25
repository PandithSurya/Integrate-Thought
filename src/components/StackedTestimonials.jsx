import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, CheckCircle } from "lucide-react";

export const TESTIMONIALS_DATA = [
  {
    id: "1",
    name: "Swathy Madanu",
    initials: "SM",
    role: "Computer Basics Student",
    location: "Turkayamjal, Hyderabad",
    quote: "I am very happy to have successfully completed the Computer Basics course conducted by Integrate Thought. The course was very informative, practical, and useful for improving my basic computer knowledge and skills.",
    rating: 5,
    theme: {
      bg: "bg-[#1e293b]",
      border: "border-slate-700/60",
      activeBorder: "border-slate-500",
      badgeBg: "bg-slate-900",
      badgeText: "text-blue-300",
      badgeBorder: "border-slate-600",
      accentText: "text-blue-300",
      subText: "text-slate-300/80"
    }
  },
  {
    id: "2",
    name: "Vaishnavi Morkar",
    initials: "VM",
    role: "C Language Student",
    location: "Turkayamjal, Hyderabad",
    quote: "I completed the Computer & C Language course at Integrate Thought. The instructor explained foundational concepts like loops, arrays, and pointers in a simple, step-by-step manner. Highly recommend this institute!",
    rating: 5,
    theme: {
      bg: "bg-[#064e3b]",
      border: "border-emerald-800/60",
      activeBorder: "border-emerald-600",
      badgeBg: "bg-emerald-950",
      badgeText: "text-emerald-300",
      badgeBorder: "border-emerald-700",
      accentText: "text-emerald-300",
      subText: "text-emerald-200/80"
    }
  },
  {
    id: "3",
    name: "sainath",
    initials: "SN",
    role: "Academy Student",
    location: "Hyderabad",
    quote: "Aravind sir is soo friendly and fun teaching. Thank you sir for making complex technical concepts so clear and engaging to learn!",
    rating: 5,
    theme: {
      bg: "bg-[#4c1d95]",
      border: "border-purple-800/60",
      activeBorder: "border-purple-600",
      badgeBg: "bg-purple-950",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-700",
      accentText: "text-purple-300",
      subText: "text-purple-200/80"
    }
  },
  {
    id: "4",
    name: "Aravindh Cherala",
    initials: "AC",
    role: "Client & Partner",
    location: "Hyderabad",
    quote: "Flexible work, good experience... Highly professional digital engineering team and reliable project delivery throughout.",
    rating: 5,
    theme: {
      bg: "bg-[#881337]",
      border: "border-rose-900/60",
      activeBorder: "border-rose-700",
      badgeBg: "bg-rose-950",
      badgeText: "text-rose-300",
      badgeBorder: "border-rose-800",
      accentText: "text-rose-300",
      subText: "text-rose-200/80"
    }
  },
  {
    id: "5",
    name: "Hemanth kumar Jampala",
    initials: "HJ",
    role: "Project Client",
    location: "Hyderabad",
    quote: "Super excellent 👌🏻👍🏻 Great experience working with Integrate Thought on custom web & AI automation solutions.",
    rating: 5,
    theme: {
      bg: "bg-[#78350f]",
      border: "border-amber-900/60",
      activeBorder: "border-amber-700",
      badgeBg: "bg-amber-950",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-800",
      accentText: "text-amber-300",
      subText: "text-amber-200/80"
    }
  },
  {
    id: "6",
    name: "kotra radha",
    initials: "KR",
    role: "Course Graduate",
    location: "Hyderabad",
    quote: "Excellent 👌 Outstanding support, friendly guidance, and highly practical learning environment for skill development.",
    rating: 5,
    theme: {
      bg: "bg-[#134e4a]",
      border: "border-teal-900/60",
      activeBorder: "border-teal-700",
      badgeBg: "bg-teal-950",
      badgeText: "text-teal-300",
      badgeBorder: "border-teal-800",
      accentText: "text-teal-300",
      subText: "text-teal-200/80"
    }
  }
];

export function StackedTestimonials({ items = TESTIMONIALS_DATA }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-4 px-3 sm:px-4 flex flex-col items-center overflow-hidden font-sans select-none">
      
      {/* Header Title Section (Clean Light Theme) */}
      <div className="text-center mb-4 sm:mb-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-mono font-bold tracking-widest uppercase mb-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
          <span>VERIFIED FEEDBACK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1.5 font-sans uppercase">
          CLIENT PERSPECTIVE
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-lg mx-auto font-sans leading-relaxed">
          What our students, clients, and partners say about Integrate Thought.
        </p>
      </div>

      {/* Overlapping Stacked Cards Container */}
      <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-visible">
        {items.map((item, index) => {
          let offset = index - activeIndex;

          if (offset > Math.floor(items.length / 2)) {
            offset -= items.length;
          } else if (offset < -Math.floor(items.length / 2)) {
            offset += items.length;
          }

          let zIndex = 10;
          let scale = 0.82;
          let rotate = 0;
          let translateX = 0;
          let opacity = 0;

          const sideOffset = isMobile ? 40 : 190;
          const farOffset = isMobile ? 75 : 340;

          if (offset === 0) {
            zIndex = 30;
            scale = 1;
            rotate = 0;
            translateX = 0;
            opacity = 1;
          } else if (offset === 1) {
            zIndex = 20;
            scale = isMobile ? 0.92 : 0.9;
            rotate = isMobile ? 3 : 5;
            translateX = sideOffset;
            opacity = isMobile ? 0.45 : 0.75;
          } else if (offset === -1) {
            zIndex = 20;
            scale = isMobile ? 0.92 : 0.9;
            rotate = isMobile ? -3 : -5;
            translateX = -sideOffset;
            opacity = isMobile ? 0.45 : 0.75;
          } else if (offset >= 2) {
            zIndex = 10;
            scale = 0.8;
            rotate = isMobile ? 6 : 10;
            translateX = farOffset;
            opacity = 0.2;
          } else {
            zIndex = 10;
            scale = 0.8;
            rotate = isMobile ? -6 : -10;
            translateX = -farOffset;
            opacity = 0.2;
          }

          const isActive = offset === 0;

          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                scale,
                rotate,
                x: translateX,
                opacity,
                zIndex
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                mass: 0.8
              }}
              onClick={() => setActiveIndex(index)}
              className={`absolute top-0 w-[90vw] max-w-[440px] p-5 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 ${item.theme.bg} ${
                isActive
                  ? `border-2 ${item.theme.activeBorder} shadow-2xl text-white`
                  : `border ${item.theme.border} text-slate-300 shadow-lg`
              }`}
            >
              <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Initials Badge Circle */}
                    <div className={`size-11 sm:size-12 rounded-full ${item.theme.badgeBg} border ${item.theme.badgeBorder} ${item.theme.badgeText} font-mono font-bold text-sm sm:text-base flex items-center justify-center shadow-md shrink-0`}>
                      {item.initials}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="size-3 sm:size-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <a
                        href="https://maps.app.goo.gl/Tte7zY8BP4cEaBa79"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[9px] font-mono text-slate-300/80 hover:text-amber-400 uppercase flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle className="size-2.5 text-amber-400" /> Google Verified Review ↗
                      </a>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-light italic leading-relaxed text-slate-100">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 font-mono text-[11px] sm:text-xs">
                  <span className={`${item.theme.accentText} font-bold block`}>– {item.name}</span>
                  <span className={`${item.theme.subText} text-[10px] sm:text-[11px] block mt-0.5`}>{item.role}, {item.location}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-6 sm:mt-8 z-30">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="size-10 sm:size-11 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 flex items-center justify-center transition-all shadow-md cursor-pointer"
        >
          <ChevronLeft className="size-5" />
        </motion.button>
        <div className="font-mono text-xs text-slate-700 px-3 font-bold">
          0{activeIndex + 1} / 0{items.length}
        </div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="size-10 sm:size-11 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 flex items-center justify-center transition-all shadow-md cursor-pointer"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}
