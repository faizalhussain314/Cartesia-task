
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Pricing</h1>
        <p className="text-xl text-gray-300 mb-12">
          Choose the right plan for your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Coming soon...</h2>
            <p className="text-gray-400">We're working on something exciting. Check back later.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
