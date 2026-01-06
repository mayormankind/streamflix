"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Plus, ChevronDown } from "lucide-react";
import type { Movie } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watch/${movie.id}`)}
      className="group relative aspect-2/3 w-full min-w-40 cursor-pointer overflow-hidden rounded-md bg-muted transition-all duration-300 hover:scale-105 hover:z-10 md:min-w-50 lg:min-w-60"
    >
      {movie.media && (
        // <Image src={movie.media.thumbnail || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
        <img
          src={movie.media.thumbnail || "/placeholder.svg"}
          alt={movie.title}
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="mb-2 text-sm font-bold md:text-base">{movie.title}</h3>
        <div className="flex items-center gap-2">
          <Link
            href={`/watch/${movie.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full border-muted-foreground/50 bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Link
            href={`/movies/${movie.id}`}
            className="ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full border-muted-foreground/50 bg-transparent"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="font-bold text-green-500">98% Match</span>
          <span>{movie.year}</span>
          <span className="rounded border px-1 py-0.5 text-[8px]">
            {movie.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
