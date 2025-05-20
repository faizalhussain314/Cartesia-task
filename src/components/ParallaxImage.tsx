
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  className?: string;
  speed?: number;
  alt?: string;
  direction?: "up" | "down" | "left" | "right";
}

const ParallaxImage = ({
  src,
  className,
  speed = 0.2,
  alt = "",
  direction = "up",
}: ParallaxImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    let directionMultiplier = 1;
    let transforms = {};

    switch (direction) {
      case "down":
        directionMultiplier = -1;
        transforms = { y: `${-30 * speed * directionMultiplier}%` };
        break;
      case "left":
        transforms = { x: `${30 * speed}%` };
        break;
      case "right":
        transforms = { x: `${-30 * speed}%` };
        break;
      case "up":
      default:
        transforms = { y: `${30 * speed}%` };
        break;
    }

    gsap.fromTo(
      image,
      { ...transforms },
      {
        ...transforms,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        overwrite: "auto",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform scale-110"
      />
    </div>
  );
};

export default ParallaxImage;
