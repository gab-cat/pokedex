import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-12 w-full max-w-md mb-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden h-full">
              <CardContent className="p-4 flex flex-col items-center">
                <Skeleton className="h-40 w-40 rounded-md mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex items-center justify-center gap-2 animate-pulse">
            <Loader2 className="h-6 w-6 text-red-500 animate-spin" />
            <span className="text-lg font-medium text-red-500">Searching for Pokémon...</span>
          </div>
        </div>
      </div>
    </main>
  );
}
