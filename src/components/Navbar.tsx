
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.from(navbar.children, {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });

    // Add scroll effect
    gsap.to(navbar, {
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          if (scrollProgress > 0) {
            navbar.classList.add("backdrop-blur-md", "bg-black/50");
          } else {
            navbar.classList.remove("backdrop-blur-md", "bg-black/50");
          }
        }
      }
    });
  }, []);

  return (
    <nav 
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-6 lg:px-16 transition-all duration-300"
      )}
    >
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="text-2xl font-bold relative">
              <span className="text-white">■</span>
              <span className="text-white absolute top-0 left-0 opacity-80">□</span>
            </div>
            <span className="text-xl font-semibold ml-2">Cartesia</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 ml-12">
          <Link to="/models" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide transition-colors duration-300">
            Models
          </Link>
          <Link to="/resources" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide transition-colors duration-300">
            Resources
          </Link>
          <Link to="/pricing" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide transition-colors duration-300">
            Pricing
          </Link>
        </div>
      </div>

      <div>
        <Button variant="outline" className="rounded-full text-sm font-medium px-6 py-5 bg-white text-black hover:bg-gray-100 transition-all">
          Get started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
