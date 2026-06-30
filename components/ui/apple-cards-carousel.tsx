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
      bg: "bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 border-emerald-900/40",
      accent: "text-emerald-400",
      btnAccent: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30",
    },
    {
      bg: "bg-gradient-to-br from-indigo-950 via-purple-900 to-zinc-950 border-purple-900/40",
      accent: "text-purple-400",
      btnAccent: "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
    },
    {
      bg: "bg-gradient-to-br from-cyan-950 via-blue-900 to-zinc-950 border-blue-900/40",
      accent: "text-cyan-400",
      btnAccent: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30",
    },
    {
      bg: "bg-gradient-to-br from-rose-950 via-pink-900 to-zinc-950 border-pink-900/40",
      accent: "text-rose-400",
      btnAccent: "bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30",
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
      className={`rounded-3xl h-[28rem] z-30 w-72 md:h-[38rem] md:w-[27rem] overflow-hidden flex flex-col items-start justify-start relative transition-all duration-500 group p-1.5 border ${theme.bg} shadow-2xl`}
    >
      <div className="size-full rounded-[20px] relative overflow-hidden flex flex-col justify-between p-6 md:p-8">
        
        {/* Title and Category Section */}
        <div className="relative z-10 w-full">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className={`text-xs md:text-sm font-semibold uppercase tracking-wider text-left ${theme.accent}`}
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-lg md:text-2xl font-bold max-w-xs text-left [text-wrap:balance] font-glancyr700 mt-1 md:mt-2 text-white"
          >
            {card.title.split(" — ")[0] || card.title}
          </motion.p>
        </div>

        {/* Mockup Image Layer (Behind the glass card but in front of background) */}
        <div className="absolute bottom-0 right-[-10%] w-[90%] h-[55%] md:w-[80%] md:h-[50%] z-0 pointer-events-none opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out">
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-contain object-bottom-right"
          />
        </div>

        {/* Middle Section: Translucent Glass Card (Problem, Solution, Result) */}
        {card.problem && card.solution && card.result && (
          <div className="relative z-10 w-full mt-4 md:mt-6">
            <div className="backdrop-blur-xl bg-zinc-950/45 border border-white/10 p-4 md:p-5 rounded-2xl space-y-3 shadow-lg">
              <div>
                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${theme.accent}`}>Problem</p>
                <p className="text-[11px] md:text-xs text-zinc-300 leading-relaxed mt-0.5">{card.problem}</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-400">Solution</p>
                <p className="text-[11px] md:text-xs text-zinc-300 leading-relaxed mt-0.5">{card.solution}</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-400">Result</p>
                <p className="text-[11px] md:text-xs text-zinc-100 font-semibold leading-relaxed mt-0.5">{card.result}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Tags and Actions */}
        <div className="relative z-10 w-full mt-auto pt-4 space-y-3">
          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 w-full">
              {card.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {card.github && (
              <Link
                href={card.github}
                target="_blank"
                onClick={(event) => event.stopPropagation()}
                className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors"
              >
                <GitHubLogoIcon className="size-3.5" />
                GitHub
              </Link>
            )}
            {card.demo && (
              <Link
                href={card.demo}
                target="_blank"
                onClick={(event) => event.stopPropagation()}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${theme.btnAccent} transition-all`}
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
