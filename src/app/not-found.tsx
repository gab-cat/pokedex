import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Pokémon Not Found!</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The Pokémon you&apos;re looking for might be hiding in tall grass or hasn&apos;t been discovered yet.
      </p>
      <Link href="/">
        <Button className="bg-red-500 hover:bg-red-600">Return to Pokédex</Button>
      </Link>
    </div>
  );
}
