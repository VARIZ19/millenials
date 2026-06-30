"use client";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";

const Github = () => {
  const { theme } = useTheme();

  // Filter contributions to only show the last 15-20 weeks to fit into a square shape
  const selectLastHalfYear = (contributions: any[]) => {
    // 20 weeks * 7 days = 140 days
    return contributions.slice(-140);
  };

  return (
    <div className="sm:col-start-4 sm:col-end-6 sm:row-start-1 sm:row-end-5 relative border border-zinc-700/20 dark:border-zinc-300/40 rounded-3xl p-4 flex flex-col items-center justify-center bg-transparent overflow-hidden max-sm:h-[300px]">
      <p className="font-mono text-xs font-semibold mb-3 text-zinc-400 dark:text-zinc-600 w-full text-left">
        GitHub Contributions
      </p>
      <div className="w-full flex-1 flex items-center justify-center">
        <GitHubCalendar
          username="VARIZ19"
          colorScheme={theme === "light" ? "light" : "dark"}
          transformData={selectLastHalfYear}
          hideTotalCount
          hideColorLegend
          blockSize={11}
          blockMargin={3}
          fontSize={10}
          theme={{
            light: ['#f0f0f0', '#d8b4fe', '#c084fc', '#a855f7', '#7e22ce'],
            dark: ['#27272a', '#581c87', '#7e22ce', '#9333ea', '#a855f7'],
          }}
        />
      </div>
    </div>
  );
};

export default Github;
