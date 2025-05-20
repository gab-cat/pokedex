export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 animate-bounce">
          <div className="absolute inset-0 rounded-full border-8 border-t-red-500 border-r-transparent border-b-white border-l-transparent animate-spin"></div>
          <div className="absolute inset-4 rounded-full bg-white"></div>
          <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-gray-800"></div>
        </div>
        <h2 className="mt-4 text-xl font-bold text-red-500">Loading Pokédex...</h2>
        <p className="text-gray-500 animate-pulse mt-2">Catching Pokémon data</p>
      </div>
    </div>
  );
}
