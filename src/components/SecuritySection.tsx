
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollSection from "./ScrollSection";

const SecuritySection: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const rings = ringRef.current;
    if (!rings) return;
    
    // Create animated rings
    for (let i = 0; i < 5; i++) {
      const ring = document.createElement('div');
      ring.className = 'absolute rounded-full border border-gray-700 opacity-30';
      
      const size = 150 + i * 100;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.left = `calc(50% - ${size/2}px)`;
      ring.style.top = `calc(50% - ${size/2}px)`;
      
      rings.appendChild(ring);
    }
    
    // Animate rings
    const ringElements = rings.querySelectorAll('div');
    
    gsap.to(ringElements, {
      scale: 1.2,
      opacity: 0.1,
      duration: 3,
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    
    // Scroll animation
    gsap.fromTo(
      rings,
      { rotate: 0 },
      {
        rotate: 90,
        scrollTrigger: {
          trigger: rings,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <ScrollSection fade="up" className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
      <div className="text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Enterprise-grade Security.<br />
          From Cloud to Local.
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Your data is protected by industry-leading SOC 2 Type 2, HIPAA, and PCI compliance standards,
          whether in our cloud or on-premises.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mt-12">
          {["HIPAA", "SOC 2", "PCI"].map((cert, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              {cert}
            </div>
          ))}
        </div>
      </div>
      
      <div ref={ringRef} className="absolute inset-0 overflow-hidden">
        {/* Rings will be dynamically added here */}
      </div>
    </ScrollSection>
  );
};

export default SecuritySection;
