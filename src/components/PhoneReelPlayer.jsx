import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function PhoneReelPlayer({ className = '' }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize subtle Web Audio tone generator when unmuted
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.value = 0.08;
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playAmbientTone = () => {
    if (isMuted || !audioCtxRef.current || !gainNodeRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const noteGain = audioCtxRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, audioCtxRef.current.currentTime);
      noteGain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);
      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 1.2);
    } catch (err) {
      // Fallback
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    initAudio();
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isMuted) {
      playAmbientTone();
    }
  }, [isMuted]);

  // Guaranteed immediate autoplay execution
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = isMuted;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [isMuted]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* SUBTLE AMBIENT BLUE BACKLIGHT BEHIND PHONE */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        {/* Soft wide diffuse blue ambient aura */}
        <div 
          className="w-[120%] sm:w-[125%] h-[112%] sm:h-[116%] rounded-[60px] blur-2xl sm:blur-3xl opacity-65 sm:opacity-75 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 180, 216, 0.36) 0%, rgba(2, 132, 199, 0.22) 42%, rgba(56, 189, 248, 0.08) 68%, transparent 85%)',
          }}
        />
        {/* Tighter chassis backlight halo */}
        <div 
          className="absolute w-[104%] h-[103%] rounded-[48px] blur-xl opacity-75 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 48%, rgba(0, 180, 216, 0.42) 0%, rgba(14, 165, 233, 0.2) 60%, transparent 80%)',
          }}
        />
      </div>

      {/* BALANCED PREMIUM SMARTPHONE FRAME (BALANCED 6-7px BEZEL) */}
      <div className="relative w-[230px] sm:w-[250px] md:w-[270px] lg:w-[285px] h-[480px] sm:h-[515px] md:h-[540px] lg:h-[560px] rounded-[46px] bg-[#16181c] p-[6px] sm:p-[7px] border border-slate-700/60 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.32),0_0_55px_rgba(0,180,216,0.22),0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300">

        
        {/* Sleek Titanium Rim Highlight */}
        <div className="absolute inset-0 rounded-[45px] pointer-events-none ring-1 ring-white/15" />

        {/* Micro Side Hardware Buttons */}
        <div className="absolute -left-[4px] top-24 w-[3px] h-8 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[4px] top-36 w-[3px] h-11 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[4px] top-28 w-[3px] h-13 bg-slate-600 rounded-r-sm" />

        {/* Edge-to-Edge Screen Canvas */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black flex flex-col justify-between">
          
          {/* Minimalist Dynamic Island Pill */}
          <div className="absolute top-2 inset-x-0 z-30 flex justify-center pointer-events-none">
            <div className="w-16 h-3.5 bg-black rounded-full flex items-center justify-end px-1.5 border border-white/10 shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-white/25" />
            </div>
          </div>

          {/* MUTE / UNMUTE BUTTON IN BOTTOM-RIGHT CORNER ONLY */}
          <button
            onClick={toggleMute}
            className={`absolute bottom-5 right-4 z-40 p-2.5 rounded-full backdrop-blur-xl border transition-all cursor-pointer shadow-xl active:scale-90 ${
              isMuted
                ? 'bg-black/55 border-white/25 text-white/80 hover:text-white hover:bg-black/75'
                : 'bg-[#00b4d8] border-[#00b4d8] text-slate-950 shadow-cyan-500/40 scale-105'
            }`}
            title={isMuted ? "Click to Unmute" : "Click to Mute"}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 animate-pulse" />
            )}
          </button>

          {/* Edge-to-Edge Autoplaying Video */}
          <div className="absolute inset-0 overflow-hidden bg-slate-950">
            <video
              ref={videoRef}
              src="/reels/reel.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
              onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
              className="w-full h-full object-cover"
            />

            {/* Subtle Cinematic Vignette for Realistic Screen Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
            
            {/* Diagonal Ambient Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>

        </div>
      </div>

    </div>
  );
}
