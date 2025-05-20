
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import AnimatedText from "./AnimatedText";
import GridVisualizer from "./GridVisualizer";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const visualizer = visualizerRef.current;
    if (!hero || !visualizer) return;

    // Create 3D effect on scroll
    gsap.to(hero, {
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const scrollY = self.progress * 200;
          hero.style.transform = `translateY(${scrollY}px) scale(${1 - self.progress * 0.1})`;
          hero.style.opacity = String(1 - self.progress);
        }
      }
    });

    // Create 3D parallax effect for visualizer
    gsap.to(visualizer, {
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const scrollY = self.progress * 300;
          visualizer.style.transform = `translateY(${scrollY * 1.5}px)`;
        }
      }
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="noise-bg" />
      
      {/* Hero Content */}
      <div ref={heroRef} className="relative z-10 text-center max-w-5xl px-6">
        <AnimatedText
          text="The fastest, ultra-realistic voice AI platform"
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-glow"
          duration={1}
          stagger={0.03}
        />
        
        <AnimatedText
          text="Powered by high performance State Space Model technology. Purpose-built for developers."
          as="p"
          className="text-lg md:text-xl text-gray-300 mb-10"
          delay={0.3}
          duration={0.8}
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up">
          <Button className="rounded-full text-black bg-white hover:bg-gray-200 px-8 py-6 text-base">
            Get started
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 text-base">
            Read the docs
          </Button>
        </div>
      </div>
      
      {/* Audio Visualizer Background */}
      <div
        ref={visualizerRef} 
        className="absolute bottom-0 left-0 right-0 h-60 z-0"
      >
        <div className="absolute bottom-0 left-0 right-0">
          <GridVisualizer 
            rows={10} 
            cols={20} 
            colorScheme="mixed" 
            className="h-40 opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
