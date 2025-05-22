"use client";

import type React from "react";
import { memo , useState, useEffect } from "react";
import Link from "next/link";
import { usePathname , useRouter } from "next/navigation";
import { 
  Search, Home, Heart, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";



function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.toLowerCase().trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };


  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/90 text-white",
        isScrolled ? " backdrop-blur-md shadow-md py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-white animate-pulse">
              <div className="absolute w-10 h-5 bg-red-500 top-0" />
              <div className="absolute w-3 h-3 bg-white  rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-800"></div>
            </div>
            <span className="font-bold text-3xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Pokédex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" className="rounded-full">
                <Home className="h-4 w-4 mr-2" aria-label="Home" />
                Home
              </Button>
            </Link>

            <Link href="/search">
              <Button variant={pathname === "/search" ? "default" : "ghost"} size="sm" className="rounded-full">
                <Search className="h-4 w-4 mr-2" aria-label="Search" />
                Search
              </Button>
            </Link>

            <Link href="/favorites">
              <Button variant={pathname === "/favorites" ? "default" : "ghost"} size="sm" className="rounded-full">
                <Heart className="h-4 w-4 mr-2" aria-label="Favorites" />
                Favorites
              </Button>
            </Link>
          </nav>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn("w-40 lg:w-64 h-9 rounded-full pl-9 pr-4 bg-gray-100 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-red-500")}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            </form>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" aria-label="Close Menu" /> : <Menu className="h-5 w-5" aria-label="Open Menu" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden text-white overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-[80vh] mt-4 overflow-y-auto" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-2 py-2">
            <form onSubmit={handleSearch} className="relative mb-2">
              <Input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 rounded-full pl-9 pr-4 bg-gray-200 border-none placeholder:text-gray-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-200" aria-hidden="true" />
            </form>

            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant={pathname === "/" ? "default" : "ghost"} className="w-full justify-start rounded-full">
                <Home className="h-4 w-4 mr-2" aria-label="Home" />
                Home
              </Button>
            </Link>

            <Link href="/search">
              <Button variant={pathname === "/search" ? "default" : "ghost"} size="sm" className="w-full justify-start rounded-full">
                <Search className="h-4 w-4 mr-2" aria-label="Search" />
                Search
              </Button>
            </Link>

            <Link href="/favorites" onClick={() => setIsMenuOpen(false)}>
              <Button variant={pathname === "/favorites" ? "default" : "ghost"} className="w-full justify-start rounded-full">
                <Heart className="h-4 w-4 mr-2" aria-label="Favorites" />
                Favorites
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500" />

      {isScrolled && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-900 rotate-45 border-b border-r border-red-500" />
      )}
    </header>
  );
}

export const Navbar = memo(NavbarComponent);
