import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PokemonLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <Card className="w-full overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative h-64 w-64 mb-4 flex items-center justify-center bg-gray-100 rounded-full animate-pulse">
                  <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
                </div>

                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-4 w-32 mb-4" />

                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full mt-6">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-8 w-8 rounded-full mr-3" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
