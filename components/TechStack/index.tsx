import { backEnd, automation, frontEnd, services } from "@/constants";
import React from "react";
import Badge from "../ui/badge";

const Techstack = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden justify-start  w-full group text-white dark:text-dark-4 pb-2.5 border border-dark-4 dark:border-0 rounded-xl dark:bg-[#FDFDFD]">
      <div className="h-max ">
        <div className="flex pt-2.5">
          <p className="text-4xl px-2.5 font-bold"> {"{ "}</p>
          <p className="text-4xl group-hover:px-2 transition-all duration-200 font-bold">{"}"}</p>
        </div>
        <h1 className="text-5xl font-extrabold py-2 px-2.5 relative w-full  ">
          TECH <br /> STACK 
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-white dark:bg-dark-4 rounded-full transition-all duration-500 group-hover:w-[80%] group-hover:mx-auto "></span>
        </h1>{" "}
      </div>
      <div className="relative mt-2 w-full grid grid-cols-1 text-zinc-200/80 overflow-y-auto p-2 gap-5 ">
        <div className="  flex flex-col transition-all duration-500 rounded-lg gap-1  p-1  text-md">
          <p className="text-white dark:text-dark-1 text-sm">Frontend:</p>
          <div className=" flex flex-wrap gap-1.5">
            {frontEnd.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div className=" flex flex-col transition-all duration-500 rounded-lg gap-1  p-1 text-md">
          <p className="text-white dark:text-dark-1 text-sm">Backend:</p>
          <div className=" flex flex-wrap gap-1.5">
            {backEnd.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div className=" flex flex-col transition-all duration-500 rounded-lg gap-1  p-1 text-md">
          <p className="text-white dark:text-dark-1 text-sm">DB & Services:</p>
          <div className=" flex flex-wrap gap-1.5">
            {services.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div className=" flex flex-col transition-all duration-500 rounded-lg gap-1  p-1 text-md">
          <p className="text-white dark:text-dark-1 text-sm">
            Automation:
          </p>
          <div className=" flex flex-wrap gap-1.5">
            {automation.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Techstack;
