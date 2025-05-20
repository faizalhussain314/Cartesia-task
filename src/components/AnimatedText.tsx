
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: React.ElementType;
  once?: boolean;
}

const AnimatedText = ({
  text,
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  as: Component = "div",
  once = true,
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (once && hasAnimated.current) return;
    
    const element = textRef.current;
    if (!element) return;

    const splitText = (text: string) => {
      return text.split(" ").map((word) => {
        return `<span class="inline-block">${word}&nbsp;</span>`;
      }).join("");
    };

    element.innerHTML = splitText(text);
    const words = element.querySelectorAll("span");

    gsap.fromTo(
      words,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        stagger: stagger,
        duration: duration,
        delay: delay,
        ease: "power3.out",
      }
    );

    hasAnimated.current = true;
  }, [text, delay, duration, stagger, once]);

  return <Component ref={textRef} className={cn("overflow-hidden", className)} />;
};

export default AnimatedText;
