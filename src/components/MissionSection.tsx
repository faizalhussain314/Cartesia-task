
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollSection from "./ScrollSection";

const MissionSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    
    // Create colorful grid
    grid.innerHTML = '';
    const colors = ['pink', 'blue', 'red', 'green', 'yellow', 'purple', 'orange'];
    
    for (let i = 0; i < 8 * 8; i++) {
      const item = document.createElement('div');
      item.className = 'color-grid-item';
      
      // Randomly decide if this will be a color block or person image
      const isPerson = Math.random() > 0.7;
      
      if (isPerson) {
        item.style.backgroundColor = '#000';
        item.style.opacity = '0.8';
      } else {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const gradient = Math.random() > 0.5 ? 
          `linear-gradient(to bottom, ${color}, ${colors[Math.floor(Math.random() * colors.length)]})` : 
          `linear-gradient(to right, ${color}, ${colors[Math.floor(Math.random() * colors.length)]})`;
        
        item.style.backgroundImage = gradient;
        item.style.opacity = '0.6';
      }
      
      grid.appendChild(item);
    }
    
    // Animate grid on scroll
    gsap.fromTo(
      grid.children,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: {
          amount: 0.8,
          grid: [8, 8],
          from: "center",
        },
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <ScrollSection fade="up" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our mission
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            We aim to build the next generation of AI. Ubiquitous, interactive intelligence that runs wherever you are. 
            We're pioneering the model architectures that will make it possible.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full px-5 py-6">
              Meet the team
            </Button>
            <Button variant="outline" className="rounded-full px-5 py-6">
              Careers
            </Button>
          </div>
        </div>
        
        <div ref={gridRef} className="color-grid aspect-square"></div>
      </div>
    </ScrollSection>
  );
};

export default MissionSection;
