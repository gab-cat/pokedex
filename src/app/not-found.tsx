import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative overflow-hidden">
      {/* Background decorations - Pokéballs */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => {
          const size = Math.max(40, Math.random() * 100);
          return (
            <div 
              key={`ball-${i}`}
              className="absolute rounded-full border-4 border-black"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${i * 0.5}s`,
                animation: 'float 3s infinite ease-in-out'
              }}
            >
              <div className="w-full h-1/2 bg-red-500 rounded-t-full"></div>
              <div className="absolute w-full top-1/2 h-[4px] bg-black transform -translate-y-1/2"></div>
              <div className="absolute w-[30%] h-[30%] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black"></div>
            </div>
          );
        })}
      </div>
      
      {/* Question marks */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={`q-${i}`}
            className="absolute text-gray-800 font-bold animate-float"
            style={{
              fontSize: `${Math.max(20, Math.random() * 100)}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${Math.random() * 40 - 20}deg)`
            }}
          >
            ?
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border-2 border-red-500 max-w-md w-full">
        <div className="relative mb-6">
          <h1 className="text-8xl font-black text-red-500 animate-bounce">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Wild Pokémon Not Found!</h2>
        
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto">
            {/* Simplified Psyduck confused */}
            <div className="absolute w-24 h-24 bg-yellow-300 rounded-full left-1/2 -translate-x-1/2 top-4">
              <div className="absolute w-6 h-6 bg-black rounded-full left-1/4 top-1/4"></div>
              <div className="absolute w-6 h-6 bg-black rounded-full right-1/4 top-1/4"></div>
              <div className="absolute w-8 h-4 bg-orange-300 rounded-full left-1/2 -translate-x-1/2 bottom-5"></div>
              <div className="absolute w-12 h-5 bg-cream-100 rounded-full left-1/2 -translate-x-1/2 bottom-1"></div>
              
              {/* Confusion stars */}
              <div className="absolute w-3 h-3 bg-yellow-100 rounded-full -top-2 -right-1 animate-twinkle"
                style={{animationDelay: '0.2s'}}></div>
              <div className="absolute w-4 h-4 bg-yellow-100 rounded-full -top-3 right-5 animate-twinkle"
                style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          The Pokémon you&apos;re looking for might be hiding in tall grass, or maybe it&apos;s just at another gym!
        </p>
        
        <Link href="/">
          <Button className="bg-red-500 hover:bg-red-600 px-6 py-2 text-lg font-medium transition-transform hover:scale-105 shadow-md">
            Return to Pokédex
          </Button>
        </Link>
      </div>
    </div>
  );
}
