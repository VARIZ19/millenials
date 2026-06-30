import Image from "next/image";
import React from "react";
import MorphingText from "./morphing-text";
import Time from "./Time";
import { availableForWork, hero, site } from "@/constants";
import ThemeToggler from "../theme/theme-toggler";

const Profile = () => {
  return (
    <div className="flex flex-col overflow-hidden size-full relative z-10 p-5 items-start justify-start gap-8 max-sm:h-[275px] max-sm:gap-4 dark:text-dark-4 text-white border border-dark-3 dark:border-0 rounded-xl dark:bg-[#FDFDFD]">
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            src={`/assets/pfp.jpg`}
            alt={`${hero.name} profile`}
            width={1024}
            height={1024}
            className="size-16 rounded-3xl opacity-90 dark:opacity-100 [box-shadow:2px_2px_85px_0px_#ffffff]/90 dark:[box-shadow:0px_0px_65px_45px_#ffffff40]"
          />
          <div className="flex flex-col justify-center">
            <p className="font-bold text-lg">{hero.name}</p>
            <p className="text-xs font-mono dark:text-black/70 text-zinc-400/80">
              {hero.role}
            </p>
            {site.education && (
              <p className="text-[10px] font-mono dark:text-black/60 text-zinc-500/80 mt-0.5">
                {site.education}
              </p>
            )}
          </div>
        </div>
        <ThemeToggler />
      </div>
      <div className="flex flex-col gap-2 overflow-hidden w-full">
        <div className="font-bold  w-full  flex items-center justify-start gap-1">
          <p className="inline text-lg">I build </p>
          {"   "}
          <div className="min-w-[7rem]">
            <MorphingText texts={hero.morphingTexts} />
          </div>
          <p>.</p>
        </div>
        <div className="w-full">
          <p className="text-sm text-zinc-400 dark:text-black/70">
            {hero.tagline}
          </p>
        </div>
        <div className="flex gap-2.5 mt-2 z-30">
          <a
            href={hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-bold border border-zinc-500 dark:border-zinc-300 text-zinc-300 dark:text-zinc-700 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition duration-300"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 b">
        <div className="font-mono flex justify-end items-center gap-1 text-sm text-zinc-400 dark:text-black/70">
          <div
            className={`size-1.5 rounded-full ${
              availableForWork ? "bg-green" : "bg-red"
            } `}
          ></div>
          <p className="text-xs">Available for work</p>
        </div>
        <Time />
      </div>
    </div>
  );
};

export default Profile;
