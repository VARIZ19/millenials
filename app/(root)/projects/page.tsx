"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/constants";

export default function ProjectDisplay() {
  const cards = projects.map((card, index) => (
    <Card key={card.title} card={{ ...card, content: <></> }} index={index} />
  ));

  const router = useRouter();

  const navigate = () => {
    router.push("/");
  };

  return (
    <div className="w-full  relative z-50 ">
      <Button
        onClick={() => navigate()}
        className="mx-3 bg-white dark:bg-white hover:bg-white/70"
      >
        <ArrowLeft className="text-zinc-700 dark:text-dark-1 " />
      </Button>
      <Carousel items={cards} />
    </div>
  );
}
