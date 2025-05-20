
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeBox from "@/components/WelcomeBox";
import VideoScrollSection from "@/components/VideoScrollSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize all scrolltrigger animations
    const initScrollAnimations = () => {
      // Update ScrollTrigger to work with Lenis
      if (window.lenis) {
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) {
              window.lenis.scrollTo(value);
            }
            return window.lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        window.lenis.on('scroll', ScrollTrigger.update);
      }
      
      // Animate elements with animate-fade-up class
      gsap.utils.toArray<HTMLElement>('.animate-fade-up').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
      
      // Animate elements with animate-fade-right class
      gsap.utils.toArray<HTMLElement>('.animate-fade-right').forEach((element) => {
        gsap.fromTo(
          element,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };
    
    // Call function after a small delay to ensure DOM is fully loaded
    const timeout = setTimeout(initScrollAnimations, 500);
    
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-black text-white min-h-screen">
        {/* Noise overlay for texture */}
        <div className="noise-bg" />
        
        {/* Navbar */}
        <Navbar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Welcome Box */}
        <div className="relative z-10 px-6 -mt-32 max-w-4xl mx-auto">
          <WelcomeBox className="animate-fade-up" />
        </div>
        
        {/* Video Scroll Section */}
        <VideoScrollSection />
        
        {/* Gradient Bar Separator */}
        <div className="gradient-bars my-20"></div>
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Security Section */}
        <SecuritySection />
        
        {/* Mission Section */}
        <MissionSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
