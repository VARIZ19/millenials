"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Track = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    const audio = new Audio("/assets/often.mp3");
    audio.loop = true;
    audioRef.current = audio;

    let isSubscribed = true;

    // Autoplay attempt
    const playAudio = () => {
      if (!isSubscribed) return;
      audio.play()
        .then(() => {
          if (isSubscribed) setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked by browser. Awaiting interaction:", err);
        });
    };

    // Try playing immediately
    playAudio();

    // Trigger play on first user interaction to bypass autoplay restrictions
    const handleInteraction = () => {
      if (audio.paused) {
        playAudio();
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      isSubscribed = false;
      audio.pause();
      audio.src = ""; // Release resources
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
        });
    }
  };

  return (
    <>
      <div className="sm:col-start-2 sm:col-end-4 sm:row-start-4 sm:row-end-7 border-dark-3 dark:border-dark-5 rounded-3xl bg-transparent group relative overflow-hidden h-[180px] sm:h-full">
        {!imageError ? (
          <Image
            src="/assets/often_poster.png"
            alt="Often - The Weeknd"
            width={1024}
            height={1024}
            onError={() => setImageError(true)}
            className={`aspect-square size-full object-cover rounded-3xl transition-transform duration-[10s] ease-linear ${
              isPlaying ? "scale-110 rotate-3" : "scale-100 rotate-0"
            }`}
          />
        ) : (
          <div className="size-full rounded-3xl bg-gradient-to-tr from-zinc-950 via-purple-950 to-zinc-900 flex flex-col items-center justify-center p-6 text-center border border-zinc-800 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            <div className={`w-24 h-24 rounded-full border border-purple-500/30 flex items-center justify-center relative ${
              isPlaying ? "animate-spin-slow" : ""
            }`}>
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-purple-500/80" />
              </div>
            </div>
            <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider mt-4">Often</p>
            <p className="text-zinc-600 text-[10px] font-mono mt-1">The Weeknd</p>
          </div>
        )}
        {/* Glow pulsing ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/50 animate-pulse pointer-events-none" />
        )}
        
        {/* Overlay button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 hover:scale-110 transition-transform duration-200 shadow-lg">
            {isPlaying ? (
              // Pause Icon
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play Icon
              <svg className="w-8 h-8 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      <div className="sm:col-start-2 sm:col-end-4 sm:row-start-7 sm:row-end-8 p-1">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg font-glancyr leading-6 text-white dark:text-dark-4">
            Often
          </p>
          {isPlaying && (
            // Animated audio wave lines
            <div className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-purple-500 rounded-full animate-[bounce_0.8s_infinite_0.1s] h-2" />
              <span className="w-0.5 bg-purple-500 rounded-full animate-[bounce_0.8s_infinite_0.3s] h-3" />
              <span className="w-0.5 bg-purple-500 rounded-full animate-[bounce_0.8s_infinite_0.2s] h-1.5" />
            </div>
          )}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 pointer-events-none">
          <p>The Weeknd</p>
          <p className="font-mono">{isPlaying ? "Playing" : "Paused"}</p>
        </div>
      </div>
    </>
  );
};

export default Track;
