
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface GridVisualizerProps {
  className?: string;
  rows?: number;
  cols?: number;
  colorScheme?: "rainbow" | "blue" | "green" | "pink" | "mixed";
}

const GridVisualizer = ({
  className,
  rows = 10,
  cols = 15,
  colorScheme = "rainbow",
}: GridVisualizerProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create grid items
    grid.innerHTML = "";
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const getRandomHeight = () => Math.random() * 50 + 10;
    const getColor = (index: number, total: number) => {
      const hue = (index / total) * 360;
      
      switch (colorScheme) {
        case "blue":
          return `hsl(${200 + (Math.random() * 40)}, 80%, 60%)`;
        case "green": 
          return `hsl(${120 + (Math.random() * 40)}, 80%, 60%)`;
        case "pink":
          return `hsl(${320 + (Math.random() * 40)}, 80%, 60%)`;
        case "mixed":
          return [
            `hsl(${200 + (Math.random() * 40)}, 80%, 60%)`,
            `hsl(${120 + (Math.random() * 40)}, 80%, 60%)`,
            `hsl(${320 + (Math.random() * 40)}, 80%, 60%)`,
            `hsl(${40 + (Math.random() * 40)}, 80%, 60%)`
          ][Math.floor(Math.random() * 4)];
        case "rainbow":
        default:
          return `hsl(${hue}, 80%, 60%)`;
      }
    };

    const totalBars = rows * cols;
    
    for (let i = 0; i < totalBars; i++) {
      const bar = document.createElement("div");
      const height = getRandomHeight();
      bar.style.height = `${height}px`;
      bar.style.backgroundColor = getColor(i, totalBars);
      bar.className = "w-[3px] mx-[1px] transform origin-bottom";
      grid.appendChild(bar);
    }

    // Animate bars
    const bars = grid.querySelectorAll("div");
    gsap.from(bars, {
      scaleY: 0,
      duration: 1.5,
      stagger: {
        amount: 1,
        grid: [rows, cols],
        from: "center",
      },
      ease: "elastic.out(1, 0.3)",
    });

    // Create animation
    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    bars.forEach((bar, i) => {
      timeline.to(
        bar,
        {
          height: `${getRandomHeight()}px`,
          duration: 1,
          delay: (i % 5) * 0.1,
          ease: "sine.inOut",
        },
        "<"
      );
    });

    return () => {
      timeline.kill();
    };
  }, [rows, cols, colorScheme]);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-[1px] h-[100px] items-end justify-center",
        className
      )}
    ></div>
  );
};

export default GridVisualizer;
