//app/watch/[id]/page.tsx
import { fetchMovieById } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Maximize, Play, SkipForward, Volume2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDuration } from "@/lib/utils"

export default async function WatchPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const movie = await fetchMovieById(id)

  if (!movie) notFound()

  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-black">
      {/* Video Player */}
      <div className="absolute inset-0 bg-black">
        {movie.video?.url ? (
          <video
            src={movie.video.url}
            className="h-full w-full object-contain"
            controls
            autoPlay
            poster={movie.media.backdrop}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <Image
              src={movie.media.backdrop || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover opacity-50 blur-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                  <Play className="h-10 w-10 fill-white" />
                </div>
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="mt-2 text-muted-foreground">Video unavailable</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 z-50 flex w-full items-center p-8 transition-opacity duration-300 hover:opacity-100">
        <Link href={`/movies/${movie.id}`}>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10">
            <ArrowLeft className="h-8 w-8" />
          </Button>
        </Link>
        <span className="ml-6 text-xl font-medium">{movie.title}</span>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 z-50 flex w-full flex-col p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/20">
          <div className="h-full w-[35%] rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
              <Play className="h-6 w-6 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
              <SkipForward className="h-6 w-6 fill-current" />
            </Button>
            <div className="flex items-center gap-4">
              <Volume2 className="h-6 w-6" />
              <div className="h-1 w-20 rounded-full bg-white/20">
                <div className="h-full w-[70%] rounded-full bg-white" />
              </div>
            </div>
            <span className="text-sm font-medium">1:12:45 / {formatDuration(movie.duration)}</span>
          </div>
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
              <Maximize className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
