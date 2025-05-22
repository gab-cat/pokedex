/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Add Pokemon type border classes
    'border-type-normal', 'border-type-fire', 'border-type-water', 'border-type-grass',
    'border-type-electric', 'border-type-ice', 'border-type-fighting', 'border-type-poison',
    'border-type-ground', 'border-type-flying', 'border-type-psychic', 'border-type-bug',
    'border-type-rock', 'border-type-ghost', 'border-type-dragon', 'border-type-dark',
    'border-type-steel', 'border-type-fairy',
    // Add Pokemon type background classes
    'bg-type-normal', 'bg-type-fire', 'bg-type-water', 'bg-type-grass',
    'bg-type-electric', 'bg-type-ice', 'bg-type-fighting', 'bg-type-poison',
    'bg-type-ground', 'bg-type-flying', 'bg-type-psychic', 'bg-type-bug',
    'bg-type-rock', 'bg-type-ghost', 'bg-type-dragon', 'bg-type-dark',
    'bg-type-steel', 'bg-type-fairy',
    // Add Pokemon type text color classes
    'text-type-normal', 'text-type-fire', 'text-type-water', 'text-type-grass',
    'text-type-electric', 'text-type-ice', 'text-type-fighting', 'text-type-poison',
    'text-type-ground', 'text-type-flying', 'text-type-psychic', 'text-type-bug',
    'text-type-rock', 'text-type-ghost', 'text-type-dragon', 'text-type-dark',
    'text-type-steel', 'text-type-fairy',
    // Add opacity variants
    'border-type-normal/50', 'border-type-fire/50', 'border-type-water/50', 'border-type-grass/50',
    'border-type-electric/50', 'border-type-ice/50', 'border-type-fighting/50', 'border-type-poison/50',
    'border-type-ground/50', 'border-type-flying/50', 'border-type-psychic/50', 'border-type-bug/50',
    'border-type-rock/50', 'border-type-ghost/50', 'border-type-dragon/50', 'border-type-dark/50',
    'border-type-steel/50', 'border-type-fairy/50',
    'bg-type-normal/20', 'bg-type-fire/20', 'bg-type-water/20', 'bg-type-grass/20',
    'bg-type-electric/20', 'bg-type-ice/20', 'bg-type-fighting/20', 'bg-type-poison/20',
    'bg-type-ground/20', 'bg-type-flying/20', 'bg-type-psychic/20', 'bg-type-bug/20',
    'bg-type-rock/20', 'bg-type-ghost/20', 'bg-type-dragon/20', 'bg-type-dark/20',
    'bg-type-steel/20', 'bg-type-fairy/20',
    'bg-type-normal/15', 'bg-type-fire/15', 'bg-type-water/15', 'bg-type-grass/15',
    'bg-type-electric/15', 'bg-type-ice/15', 'bg-type-fighting/15', 'bg-type-poison/15',
    'bg-type-ground/15', 'bg-type-flying/15', 'bg-type-psychic/15', 'bg-type-bug/15',
    'bg-type-rock/15', 'bg-type-ghost/15', 'bg-type-dragon/15', 'bg-type-dark/15',
    'bg-type-steel/15', 'bg-type-fairy/15',
    'bg-type-normal/10', 'bg-type-fire/10', 'bg-type-water/10', 'bg-type-grass/10',
    'bg-type-electric/10', 'bg-type-ice/10', 'bg-type-fighting/10', 'bg-type-poison/10',
    'bg-type-ground/10', 'bg-type-flying/10', 'bg-type-psychic/10', 'bg-type-bug/10',
    'bg-type-rock/10', 'bg-type-ghost/10', 'bg-type-dragon/10', 'bg-type-dark/10',
    'bg-type-steel/10', 'bg-type-fairy/10',
    'bg-type-normal/5', 'bg-type-fire/5', 'bg-type-water/5', 'bg-type-grass/5',
    'bg-type-electric/5', 'bg-type-ice/5', 'bg-type-fighting/5', 'bg-type-poison/5',
    'bg-type-ground/5', 'bg-type-flying/5', 'bg-type-psychic/5', 'bg-type-bug/5',
    'bg-type-rock/5', 'bg-type-ghost/5', 'bg-type-dragon/5', 'bg-type-dark/5',
    'bg-type-steel/5', 'bg-type-fairy/5',
    // Add from- variants for gradients
    'from-type-normal/20', 'from-type-fire/20', 'from-type-water/20', 'from-type-grass/20',
    'from-type-electric/20', 'from-type-ice/20', 'from-type-fighting/20', 'from-type-poison/20',
    'from-type-ground/20', 'from-type-flying/20', 'from-type-psychic/20', 'from-type-bug/20',
    'from-type-rock/20', 'from-type-ghost/20', 'from-type-dragon/20', 'from-type-dark/20',
    'from-type-steel/20', 'from-type-fairy/20',
    'from-type-normal/15', 'from-type-fire/15', 'from-type-water/15', 'from-type-grass/15',
    'from-type-electric/15', 'from-type-ice/15', 'from-type-fighting/15', 'from-type-poison/15',
    'from-type-ground/15', 'from-type-flying/15', 'from-type-psychic/15', 'from-type-bug/15',
    'from-type-rock/15', 'from-type-ghost/15', 'from-type-dragon/15', 'from-type-dark/15',
    'from-type-steel/15', 'from-type-fairy/15',
    'from-type-normal/10', 'from-type-fire/10', 'from-type-water/10', 'from-type-grass/10',
    'from-type-electric/10', 'from-type-ice/10', 'from-type-fighting/10', 'from-type-poison/10',
    'from-type-ground/10', 'from-type-flying/10', 'from-type-psychic/10', 'from-type-bug/10',
    'from-type-rock/10', 'from-type-ghost/10', 'from-type-dragon/10', 'from-type-dark/10',
    'from-type-steel/10', 'from-type-fairy/10',
    'from-type-normal/5', 'from-type-fire/5', 'from-type-water/5', 'from-type-grass/5',
    'from-type-electric/5', 'from-type-ice/5', 'from-type-fighting/5', 'from-type-poison/5',
    'from-type-ground/5', 'from-type-flying/5', 'from-type-psychic/5', 'from-type-bug/5',
    'from-type-rock/5', 'from-type-ghost/5', 'from-type-dragon/5', 'from-type-dark/5',
    'from-type-steel/5', 'from-type-fairy/5',
    // Add to- variants for gradients
    'to-type-normal/5', 'to-type-fire/5', 'to-type-water/5', 'to-type-grass/5',
    'to-type-electric/5', 'to-type-ice/5', 'to-type-fighting/5', 'to-type-poison/5',
    'to-type-ground/5', 'to-type-flying/5', 'to-type-psychic/5', 'to-type-bug/5',
    'to-type-rock/5', 'to-type-ghost/5', 'to-type-dragon/5', 'to-type-dark/5',
    'to-type-steel/5', 'to-type-fairy/5',
    // Add gradient utilities
    'bg-gradient-radial', 'bg-gradient-to-br', 'bg-gradient-to-b',
    // Add animate utilities
    'animate-pulse', 'animate-blob', 'animate-float',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        'cream-100': '#FFFDD0',
        'type-normal': '#A8A77A',
        'type-fire': '#EE8130',
        'type-water': '#6390F0',
        'type-grass': '#7AC74C',
        'type-electric': '#F7D02C',
        'type-ice': '#96D9D6',
        'type-fighting': '#C22E28',
        'type-poison': '#A33EA1',
        'type-ground': '#E2BF65',
        'type-flying': '#A98FF3',
        'type-psychic': '#F95587',
        'type-bug': '#A6B91A',
        'type-rock': '#B6A136',
        'type-ghost': '#735797',
        'type-dragon': '#6F35FC',
        'type-dark': '#705746',
        'type-steel': '#B7B7CE',
        'type-fairy': '#D685AD',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '70%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '40%': { transform: 'scale(1.1)', opacity: '0.8' },
          '70%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        carouselReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.7)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        popIn: 'popIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.4s ease-out forwards',
        bounceIn: 'bounceIn 0.6s ease-out forwards',
        wiggle: 'wiggle 0.5s ease-in-out',
        carousel: 'carousel 40s linear infinite',
        'carousel-reverse': 'carouselReverse 50s linear infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      utilities: {
        '.clip-path-tail': {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%)'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.clip-path-tail': {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%)'
        }
      };
      addUtilities(newUtilities);
    }
  ],
};