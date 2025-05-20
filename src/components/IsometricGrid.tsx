
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface IsometricGridProps {
  className?: string;
}

const IsometricGrid: React.FC<IsometricGridProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create isometric grid
    for (let i = 0; i < 25; i++) {
      const box = document.createElement("div");
      box.className = "absolute w-16 h-16 bg-white/10 rounded";
      
      const row = Math.floor(i / 5);
      const col = i % 5;
      
      // Set position
      box.style.left = `${col * 70 - row * 20}px`;
      box.style.top = `${row * 40}px`;
      box.style.zIndex = `${5 - row}`;

      // Create 3D effect with transforms
      gsap.set(box, {
        transform: "rotateX(60deg) rotateZ(-45deg)",
        transformStyle: "preserve-3d",
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1)",
      });

      container.appendChild(box);
    }

    // Animate boxes on scroll
    const boxes = container.querySelectorAll("div");

    gsap.from(boxes, {
      y: 100,
      opacity: 0,
      stagger: {
        each: 0.05,
        grid: [5, 5],
        from: "center",
      },
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    // Add hover animation
    gsap.to(container, {
      rotateX: 5,
      rotateY: 5,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative w-full h-60 transform-style-preserve-3d transition-transform",
        className
      )}
    />
  );
};

export default IsometricGrid;
