
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { MessageCircle, PhoneCall } from "lucide-react";

interface WelcomeBoxProps {
  className?: string;
}

const WelcomeBox: React.FC<WelcomeBoxProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    
    // Create 3D effect on hover
    container.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(container, {
        rotationY: x * 5,
        rotationX: -y * 5,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.5,
      });
    });
    
    container.addEventListener('mouseleave', () => {
      gsap.to(container, {
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    });

    // Scroll animation
    gsap.fromTo(
      container,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-lg transform-style-preserve-3d",
        className
      )}
    >
      <div 
        ref={contentRef} 
        className="p-8 lg:p-10"
      >
        <h2 className="text-2xl font-normal mb-6">Welcome to Cartesia. It's great to meet you!</h2>
        
        <div className="flex flex-wrap mt-6 gap-2">
          <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors rounded-full w-10 h-10">
            <span className="text-lg">✎</span>
          </button>
          <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors rounded-full px-4 h-10">
            <PhoneCall size={18} className="mr-2" />
            <span>Make a phone call</span>
          </button>
          <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors rounded-full px-4 h-10">
            <MessageCircle size={18} className="mr-2" />
            <span>Tell me a joke</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
