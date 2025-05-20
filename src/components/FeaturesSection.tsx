
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollSection from "./ScrollSection";
import GridVisualizer from "./GridVisualizer";
import SoundWaveBackground from "./SoundWaveBackground";
import IsometricGrid from "./IsometricGrid";

const FeaturesSection: React.FC = () => {
  const featureRef = useRef<HTMLDivElement>(null);
  const voiceAgentRef = useRef<HTMLDivElement>(null);
  const voiceCloningRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll animations
    const features = featureRef.current;
    if (!features) return;

    // Create scroll effect
    gsap.to(features, {
      scrollTrigger: {
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          features.style.transform = `scale(${1 + progress * 0.05})`;
        }
      }
    });

    // Add 3D rotation effect on voice agent section
    const voiceAgent = voiceAgentRef.current;
    if (voiceAgent) {
      gsap.to(voiceAgent, {
        scrollTrigger: {
          trigger: voiceAgent,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            voiceAgent.style.transform = `rotateX(${5 - progress * 10}deg) rotateY(${progress * 5}deg)`;
          }
        }
      });
    }

    // Add parallax for voice cloning
    const voiceCloning = voiceCloningRef.current;
    if (voiceCloning) {
      const elements = voiceCloning.querySelectorAll('[data-parallax]');
      elements.forEach((el, i) => {
        const speed = i % 2 === 0 ? 0.2 : -0.2;
        gsap.to(el, {
          y: `${speed * 100}%`,
          scrollTrigger: {
            trigger: voiceCloning,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }

    // Add scroll effect for languages
    const languages = languagesRef.current;
    if (languages) {
      const items = languages.querySelectorAll('.language-item');
      
      gsap.from(items, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: languages,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse",
        }
      });
    }
  }, []);

  return (
    <div ref={featureRef} className="relative py-20 overflow-hidden">
      <div className="noise-bg" />
      
      {/* Voice Agents Section */}
      <ScrollSection fade="up" className="mb-40 px-6 max-w-6xl mx-auto">
        <div 
          ref={voiceAgentRef} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transform-style-preserve-3d"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Perfect for real-time voice agents
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Best-in-class pronunciations: Get complex phone numbers, addresses, and IDs right every time.
            </p>
            
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-2">Low-latency</h3>
                <p className="text-gray-400 text-sm">
                  Cartesia Sonic has the lowest latency of any AI voice model.
                </p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-2">Best-in-class</h3>
                <p className="text-gray-400 text-sm">
                  Get complex phone numbers, addresses, and IDs right every time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative h-80 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-orange-600/80 rounded-lg">
              <SoundWaveBackground color="rgba(255, 255, 255, 0.2)" />
            </div>
            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md text-sm">
              HUMAN
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
      </ScrollSection>

      {/* Voice Cloning Section */}
      <ScrollSection fade="up" className="mb-40 px-6 max-w-6xl mx-auto">
        <div ref={voiceCloningRef} className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Best-in-class<br />AI voice cloning
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Leverage AI voice cloning and AI voice changer for high-fidelity, realistic voice replication with unmatched accuracy.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-full flex items-center space-x-2">
              <span className="text-xl">□</span>
              <span>Voice Cloning</span>
            </button>
            <button className="bg-gray-800/50 hover:bg-gray-700 px-5 py-2 rounded-full flex items-center space-x-2">
              <span className="text-xl">↺</span>
              <span>Voice Changer</span>
            </button>
            <button className="bg-gray-800/50 hover:bg-gray-700 px-5 py-2 rounded-full flex items-center space-x-2">
              <span className="text-xl">♫</span>
              <span>Text-to-Speech</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div data-parallax className="bg-blue-500/30 h-60 md:h-80 rounded-lg overflow-hidden relative">
            <SoundWaveBackground color="rgba(59, 130, 246, 0.3)" />
            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md text-sm">
              SOURCE
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-black/50 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-xl">▶</span>
              </button>
            </div>
          </div>
          
          <div data-parallax className="bg-indigo-600/30 h-60 md:h-80 rounded-lg overflow-hidden relative">
            <SoundWaveBackground color="rgba(99, 102, 241, 0.3)" />
            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md text-sm">
              CLONE
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-black/50 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-xl">▶</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollSection>
      
      {/* Languages Section */}
      <ScrollSection fade="up" className="mb-40 px-6 max-w-6xl mx-auto">
        <div ref={languagesRef}>
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Speak every language
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Sonic supports native speech in 15 languages. Localize a given voice to any accent or language.
              </p>
              
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full">
                Try your language
              </button>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-3">
              {[
                { flag: "🇺🇸", name: "English" },
                { flag: "🇪🇸", name: "Spanish" },
                { flag: "🇫🇷", name: "French" },
                { flag: "🇧🇷", name: "Portuguese" },
                { flag: "🇮🇳", name: "Hindi" },
                { flag: "🇨🇳", name: "Chinese" },
                { flag: "🇷🇺", name: "Russian" },
                { flag: "🇳🇱", name: "Dutch" },
              ].map((lang, index) => (
                <div 
                  key={index} 
                  className="language-item bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-lg flex items-center cursor-pointer"
                >
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 relative overflow-hidden rounded-lg">
            <div className="absolute right-0 bottom-0 w-2/3 h-full">
              <div className="w-full h-full bg-gradient-to-bl from-green-400/20 to-teal-600/20 rounded-lg">
                <div className="vertical-lines w-full h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>
      
      {/* Integrations Section */}
      <ScrollSection fade="up" className="mb-40 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Seamless integrations
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Integrate Cartesia with Twilio, Pipecat, LiveKit, or Rasa with ease.
          </p>
          
          <button className="mt-8 bg-transparent hover:bg-white/10 border border-white/20 px-6 py-3 rounded-full">
            Find out how
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Rasa", "LiveKit", "Twilio", "Pipecat"
          ].map((partner, index) => (
            <div 
              key={index}
              className="aspect-square bg-black/40 border border-gray-800 rounded-lg flex items-center justify-center text-xl font-semibold"
            >
              {partner}
            </div>
          ))}
        </div>
      </ScrollSection>
      
      {/* Models Section */}
      <ScrollSection fade="up" className="mb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-black/30 border border-gray-800 rounded-lg p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Sonic
            </h3>
            <p className="text-gray-300 mb-8">
              The flagship State Space Model behind our seamless, ultra-realistic AI voices.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full">
                Learn more
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white/20 px-5 py-2 rounded-full">
                Capabilities
              </button>
            </div>
            
            <div className="mt-8">
              <GridVisualizer rows={5} cols={10} colorScheme="green" className="h-40" />
            </div>
          </div>
          
          <div className="bg-black/30 border border-gray-800 rounded-lg p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Custom Deployments
            </h3>
            <p className="text-gray-300 mb-8">
              Deploy voice AI anywhere—whether it's on-prem or on-device.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-full">
                Learn more
              </button>
              <button className="bg-transparent hover:bg-white/10 border border-white/20 px-5 py-2 rounded-full">
                Reach out
              </button>
            </div>
            
            <div className="mt-8">
              <GridVisualizer rows={5} cols={10} colorScheme="pink" className="h-40" />
            </div>
          </div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default FeaturesSection;
