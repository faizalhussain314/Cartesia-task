
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  fade?: "up" | "down" | "left" | "right" | false;
  delay?: number;
  duration?: number;
  triggerStart?: string;
  triggerEnd?: string;
}

const ScrollSection = ({
  children,
  className,
  fade = "up",
  delay = 0,
  duration = 0.8,
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!fade) return;
    
    const element = sectionRef.current;
    if (!element) return;
    
    const direction = {
      up: { y: 50, opacity: 0 },
      down: { y: -50, opacity: 0 },
      left: { x: -50, opacity: 0 },
      right: { x: 50, opacity: 0 },
    };

    const resetDirection = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
    };

    gsap.fromTo(
      element,
      { ...direction[fade] },
      {
        ...resetDirection[fade],
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: triggerStart,
          end: triggerEnd,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [fade, delay, duration, triggerStart, triggerEnd]);

  return (
    <div ref={sectionRef} className={cn(className)}>
      {children}
    </div>
  );
};

export default ScrollSection;
