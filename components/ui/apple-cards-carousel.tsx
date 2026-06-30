"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { FlickeringGrid } from "../magicui/flickering-grid";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  github: string;
  demo: string;
  tags?: string[];
  content?: React.ReactNode;
  problem?: string;
  solution?: string;
  result?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});


export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = React.useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll, checkScrollability]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full ">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto md:py-5 scroll-smooth [scrollbar-width:none "
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-7 pl-4 my-3",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2  absolute -top-8 max-md:-top-10 right-3 ">
          <button
            className="relative z-0 h-10 w-10 rounded-full bg-gray-100  dark:bg-white flex items-center justify-center disabled:opacity-50 max-sm:size-10"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-dark-1" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 dark:bg-white dark:text-white flex items-center justify-center disabled:opacity-50 max-sm:size-10"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-dark-1" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

const getCardStyles = (category: string, index: number) => {
  const styles = [
    {
      background: "radial-gradient(circle at 60% 40%, rgba(16,185,129,0.22), transparent 70%), linear-gradient(135deg, #052c1d, #010a07)",
      glow: "shadow-[0_0_60px_rgba(16,185,129,0.2)]",
      borderColor: "border-white/[0.08]",
      accent: "text-emerald-400",
      btnAccent: "bg-emerald-500 text-white shadow-[0_15px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-400 hover:shadow-[0_20px_40px_rgba(16,185,129,0.45)] border border-emerald-400/20",
    },
    {
      background: "radial-gradient(circle at 60% 40%, rgba(139,92,246,0.22), transparent 70%), linear-gradient(135deg, #1c1945, #07040e)",
      glow: "shadow-[0_0_60px_rgba(139,92,246,0.2)]",
      borderColor: "border-white/[0.08]",
      accent: "text-purple-400",
      btnAccent: "bg-purple-600 text-white shadow-[0_15px_30px_rgba(139,92,246,0.35)] hover:bg-purple-500 hover:shadow-[0_20px_40px_rgba(139,92,246,0.45)] border border-purple-400/20",
    },
    {
      background: "radial-gradient(circle at 60% 40%, rgba(59,130,246,0.22), transparent 70%), linear-gradient(135deg, #0a1835, #020610)",
      glow: "shadow-[0_0_60px_rgba(59,130,246,0.2)]",
      borderColor: "border-white/[0.08]",
      accent: "text-blue-400",
      btnAccent: "bg-blue-600 text-white shadow-[0_15px_30px_rgba(59,130,246,0.35)] hover:bg-blue-500 hover:shadow-[0_20px_40px_rgba(59,130,246,0.45)] border border-blue-400/20",
    },
    {
      background: "radial-gradient(circle at 60% 40%, rgba(244,63,94,0.22), transparent 70%), linear-gradient(135deg, #371119, #0b0204)",
      glow: "shadow-[0_0_60px_rgba(244,63,94,0.2)]",
      borderColor: "border-white/[0.08]",
      accent: "text-rose-400",
      btnAccent: "bg-rose-600 text-white shadow-[0_15px_30px_rgba(244,63,94,0.35)] hover:bg-rose-500 hover:shadow-[0_20px_40px_rgba(244,63,94,0.45)] border border-rose-400/20",
    },
  ];
  return styles[index % styles.length];
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef, handleClose);

  const handleOpen = () => {
    setOpen(true);
  };

  const theme = getCardStyles(card.category, index);

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleOpen}
      style={{ background: theme.background }}
      className={`rounded-[32px] h-[35rem] md:h-[48rem] w-[22rem] md:w-[32rem] overflow-hidden flex flex-col items-start justify-start relative transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group p-[1.5px] border ${theme.borderColor} hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)] select-none`}
    >
      {/* Film Grain Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Dynamic Glow behind device */}
      <div className={`absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] rounded-full bg-white/5 filter blur-[80px] pointer-events-none z-0 transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${theme.glow}`} />

      {/* Grid Pattern overlay for texture */}
      <FlickeringGrid 
        width={1000} 
        height={2000} 
        className="size-full absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none" 
      />

      <div className="size-full rounded-[30px] relative overflow-hidden flex flex-col justify-between p-7 md:p-10 z-10">
        
        {/* Title and Category Section (Level 2) */}
        <div className="relative z-10 w-full text-left">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className={`text-sm md:text-[18px] font-semibold uppercase tracking-widest ${theme.accent}`}
          >
            {card.category}
          </motion.p>
          <motion.h2
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-3xl md:text-[58px] leading-[1.05] font-extrabold max-w-sm tracking-tight mt-2 text-white font-glancyr700"
          >
            {card.title.split(" — ")[0] || card.title}
          </motion.h2>
        </div>

        {/* Mockup Image Layer (Level 3 - Behind glass card, offset, rotated) */}
        <div className="absolute bottom-10 right-[-15%] w-[85%] h-[55%] md:w-[75%] md:h-[50%] z-20 pointer-events-none rotate-[3deg] group-hover:rotate-[1deg] group-hover:-translate-y-3 group-hover:scale-[1.03] transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
          <div className="relative w-full h-full">
            <BlurImage
              src={card.src}
              alt={card.title}
              fill
              className="object-contain object-bottom-right"
            />
          </div>
        </div>

        {/* Middle Section: Floating Glass Card (Level 4 - Overlaps mockup & heading) */}
        {card.problem && card.solution && card.result && (
          <div className="relative z-30 w-full mt-6 md:mt-8 ml-0 mr-auto transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4">
            <div className="bg-[#141414]/45 backdrop-blur-[28px] border border-white/12 p-5 md:p-6 rounded-[24px] space-y-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
              <div>
                <p className={`text-xs md:text-[16px] font-bold uppercase tracking-widest ${theme.accent}`}>Problem</p>
                <p className="text-sm md:text-[18px] text-zinc-300 leading-[1.6] mt-1">{card.problem}</p>
              </div>
              <div>
                <p className="text-xs md:text-[16px] font-bold uppercase tracking-widest text-emerald-400">Solution</p>
                <p className="text-sm md:text-[18px] text-zinc-300 leading-[1.6] mt-1">{card.solution}</p>
              </div>
              <div>
                <p className="text-xs md:text-[16px] font-bold uppercase tracking-widest text-blue-400">Result</p>
                <p className="text-sm md:text-[18px] text-zinc-100 font-semibold leading-[1.6] mt-1">{card.result}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Tags and Actions (Level 5) */}
        <div className="relative z-40 w-full mt-auto pt-6 space-y-4">
          {/* Tags (Centered) */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {card.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="h-10 px-[18px] py-[12px] flex items-center justify-center rounded-[14px] bg-white/[0.08] border border-white/[0.08] backdrop-blur-[10px] text-zinc-300 font-medium text-xs md:text-sm select-none transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:bg-white/[0.15] hover:border-white/20"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons (Left Aligned) */}
          <div className="flex items-center justify-start gap-3 w-full">
            {card.github && (
              <Link
                href={card.github}
                target="_blank"
                onClick={(event) => event.stopPropagation()}
                className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/12 text-white backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5"
              >
                <GitHubLogoIcon className="size-4" />
                GitHub
              </Link>
            )}
            {card.demo && (
              <Link
                href={card.demo}
                target="_blank"
                onClick={(event) => event.stopPropagation()}
                className={`text-xs md:text-sm font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5 ${theme.btnAccent}`}
              >
                Live Demo
              </Link>
            )}
          </div>
        </div>

      </div>
    </motion.button>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
