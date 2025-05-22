import Image from "next/image";
import { Sparkles, Zap, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-white p-8 md:p-12 mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-20 -mb-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gray-900/10 rounded-3xl blur-xl opacity-30"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">
            Explore the Wonderful World of <span className="text-yellow-300">Pokémon</span>!
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6 animate-slide-up animation-delay-300">
            Your interactive guide to discovering, learning about, and falling in love with these amazing creatures.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-600">
            <div className="flex items-center gap-2 bg-gray-800/80 rounded-full px-4 py-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span>800+ Pokémon</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/80 rounded-full px-4 py-2">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span>Detailed Stats</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/80 rounded-full px-4 py-2">
              <Heart className="h-5 w-5 text-yellow-300" />
              <span>Fan Favorite</span>
            </div>
          </div>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
          <Image
            src="/hero.avif"
            alt="Pokéball"
            fill
            priority
            className="animate-fadeIn object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
} 