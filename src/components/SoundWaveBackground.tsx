
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface SoundWaveBackgroundProps {
  className?: string;
  color?: string;
  animated?: boolean;
}

const SoundWaveBackground: React.FC<SoundWaveBackgroundProps> = ({ 
  className,
  color = "rgba(255, 255, 255, 0.1)",
  animated = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create sound wave bars
    container.innerHTML = "";
    const barCount = 100;
    
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement("div");
      const height = Math.random() * 100;
      
      bar.className = "absolute bottom-0 w-[3px] bg-white/10 rounded-t-sm";
      bar.style.height = `${height}%`;
      bar.style.left = `${(i / barCount) * 100}%`;
      bar.style.backgroundColor = color;
      container.appendChild(bar);
    }

    if (!animated) return;

    // Animate sound waves
    const bars = container.querySelectorAll("div");
    
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    bars.forEach((bar, i) => {
      const height = 20 + Math.random() * 80;
      
      tl.to(
        bar,
        {
          height: `${height}%`,
          duration: 1 + Math.random(),
          ease: "sine.inOut",
        },
        Math.random() * 0.5
      );
    });

    return () => {
      tl.kill();
    };
  }, [color, animated]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
    />
  );
};

export default SoundWaveBackground;
