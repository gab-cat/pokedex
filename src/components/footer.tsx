"use client";

import { memo } from "react";
import Link from "next/link";
import { Github, Heart, Zap, Code, User } from "lucide-react";
import { Button } from "@/components/ui/button";

function FooterComponent() {
  return (
    <footer className="w-full mt-12 relative overflow-hidden">
      {/* Decorative Pokeball pattern - animated carousel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-carousel whitespace-nowrap opacity-15 flex">
          {/* First set of Pokeballs */}
          <div className="inline-flex min-w-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                suppressHydrationWarning
                key={`first-${i}`} 
                className="inline-block mx-3 aspect-square rounded-full border-4 border-black"
                style={{ 
                  width: `${Math.max(20, Math.random() * 40)}px`,
                  height: `${Math.max(20, Math.random() * 40)}px`,
                  marginTop: `${Math.random() * 30}px`
                }}
              >
                <div className="w-full h-1/2 bg-red-500"></div>
              </div>
            ))}
          </div>
          {/* Duplicate set to create seamless loop */}
          <div className="inline-flex min-w-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                suppressHydrationWarning
                key={`second-${i}`} 
                className="inline-block mx-3 aspect-square rounded-full border-4 border-black"
                style={{ 
                  width: `${Math.max(20, Math.random() * 40)}px`,
                  height: `${Math.max(20, Math.random() * 40)}px`,
                  marginTop: `${Math.random() * 30}px`
                }}
              >
                <div className="w-full h-1/2 bg-red-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative border-b-2 -mb-4 border-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-red-500">
          <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="bg-red-500 border-none text-white pt-4 pb-8 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and about */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                  <div className="absolute w-8 h-4 bg-red-500 top-0"></div>
                  <div className="absolute w-2 h-2 bg-white rounded-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-500"></div>
                </div>
                <span className="font-bold text-xl">Pokédex</span>
              </div>
              <p className="text-sm text-white/80 text-center md:text-left mb-4">
                Your comprehensive guide to the world of Pokémon. Explore, learn, and discover all your favorite Pokémon
                in one place.
              </p>
              <Link href="https://github.com/gab-cat/pokedex" target="_blank" className="flex space-x-3 items-center border border-white/20 rounded-full p-2 hover:border-white/70 hover:bg-white/20 transition-colors cursor-pointer">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Github className="h-4 w-4" />
                </Button>
                <span className="text-sm text-white/80">Check out the code on GitHub</span>
              </Link>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Links
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-white/80 hover:text-white transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/?type=fire" className="text-white/80 hover:text-white transition-colors">
                    Types
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="text-white/80 hover:text-white transition-colors">
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developer Details */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Developer
              </h3>
              <div className="text-sm text-white/80 mb-4 text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-yellow-300" />
                  <span>Gabriel Catimbang</span>
                </div>
                <p className="mb-3">Passionate Pokémon fan and web developer creating this Pokédex with modern web technologies.</p>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-yellow-300" />
                  <Link target="_blank" href="https://github.com/gab-cat" className="hover:underline hover:text-yellow-300 transition-colors">
                    github.com/gab-cat
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70 mb-4 md:mb-0">
              © {new Date().getFullYear()} Pokédex. All rights reserved.
            </p>
            <p className="text-sm text-white/70 flex items-center">
              Made with
              <Heart className="h-3 w-3 mx-1 text-yellow-400 animate-pulse" />
              for Pokémon fans
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400"></div>

        {/* Floating Pokeballs */}
        <div
          className="absolute -top-6 right-10 w-12 h-12 rounded-full bg-white border-4 border-red-600 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="w-full h-1/2 bg-red-600"></div>
          <div className="absolute w-4 h-4 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-600"></div>
        </div>

        <div
          className="absolute top-20 left-[10%] w-8 h-8 rounded-full bg-white border-4 border-red-600 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-full h-1/2 bg-red-600"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-600"></div>
        </div>

        <div
          className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-white border-2 border-red-600 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="w-full h-1/2 bg-red-600"></div>
          <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-1 border-red-600"></div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
