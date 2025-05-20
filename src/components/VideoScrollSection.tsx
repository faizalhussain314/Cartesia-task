
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import IsometricGrid from "./IsometricGrid";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrollSectionProps {
  className?: string;
}

const VideoScrollSection: React.FC<VideoScrollSectionProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const secondText = secondTextRef.current;
    const grid = gridRef.current;
    
    if (!section || !text || !secondText || !grid) return;

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });

    // Animate text color change from gray to white while scrolling
    tl.fromTo(
      text.querySelectorAll("span"),
      { color: "#666666" },
      { 
        color: "#FFFFFF", 
        stagger: 0.05,
        ease: "power2.inOut",
        duration: 0.5
      },
      0
    );

    // Animate second paragraph with a slight delay
    tl.fromTo(
      secondText.querySelectorAll("span"),
      { color: "#666666" },
      { 
        color: "#FFFFFF", 
        stagger: 0.05,
        ease: "power2.inOut",
        duration: 0.5
      },
      0.3
    );

    // Animate the isometric grid
    tl.fromTo(
      grid,
      { rotateX: 15, rotateY: -15, rotateZ: 5, scale: 0.9, opacity: 0.7 },
      { rotateX: 5, rotateY: -5, rotateZ: 0, scale: 1.1, opacity: 1, duration: 1 },
      0.2
    );

    return () => {
      // Clean up the scrollTrigger when component unmounts
      tl.scrollTrigger?.kill();
    };
  }, []);

  // Split text into spans for word-by-word animation
  const splitTextIntoSpans = (text: string) => {
    return text.split(" ").map((word, index) => (
      <React.Fragment key={index}>
        <span className="inline-block transition-colors duration-300">{word}</span>{" "}
      </React.Fragment>
    ));
  };
  

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-black flex items-center justify-between px-6 md:px-16 lg:px-24",
        className
      )}
    >
      <div className="noise-bg opacity-10" />
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-8">
          <div ref={textRef} className="text-xl md:text-2xl lg:text-4xl font-medium leading-tight font-inter-display">
            {splitTextIntoSpans("Developers love how easy Cartesia makes it to incorporate real-time AI voices, voice cloning, and voice infilling into their applications.")}
          </div>
          
          <div ref={secondTextRef} className="text-xl md:text-2xl font-normal leading-relaxed font-inter-display mt-8">
            {splitTextIntoSpans("Teams trust Cartesia to deliver the lowest-latency, highest-quality voice AI for interactive voice apps.")}
          </div>
        </div>
        
        <div ref={gridRef} className="w-full md:w-1/2 flex  mt-12 md:mt-0">
          <IsometricGrid />
        </div>
      </div>
    </section>
  );
};

export default VideoScrollSection;
