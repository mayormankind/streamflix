import { Navbar } from "@/components/navbar"
import { fetchMovies, fetchMovieById } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Play, Plus, ThumbsUp, Volume2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDuration } from "@/lib/utils"

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const movie = await fetchMovieById(id)

  if (!movie) notFound()

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="relative h-[60vh] w-full lg:h-[75vh]">
        <img
          src={movie.media.backdrop || "/placeholder.svg"}
          alt={movie.title}
          className="h-full w-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="absolute bottom-12 left-4 right-4 md:left-12">
          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/watch/${movie.id}`}>
              <Button size="lg" className="h-12 gap-2 bg-white px-10 text-black hover:bg-white/90">
                <Play className="h-5 w-5 fill-current" /> Play
              </Button>
            </Link>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-muted-foreground/50 bg-transparent"
            >
              <Plus className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full border-muted-foreground/50 bg-transparent"
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <div className="ml-auto hidden items-center gap-4 md:flex">
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-muted-foreground/50 bg-transparent"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
              <span className="rounded border px-2 py-1 text-sm">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-12 px-4 md:px-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-lg font-medium text-muted-foreground">
            <span className="text-green-500">98% Match</span>
            <span>{movie.year}</span>
            <span>{formatDuration(movie.duration)}</span>
            <span className="rounded border border-muted-foreground/30 px-2 py-0.5 text-xs text-foreground">HD</span>
          </div>
          <p className="text-lg leading-relaxed">{movie.description}</p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">Cast:</span> James Wilson, Sarah Parker, Michael Chen
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">Genres:</span> {movie.genre}, Thriller, Cinematic
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-bold uppercase tracking-wider text-muted-foreground">More Like This</h3>
            <div className="grid grid-cols-2 gap-4">
              {(await fetchMovies()).slice(0, 4).map((m) => (
                <Link
                  key={m.id}
                  href={`/movies/${m.id}`}
                  className="group relative aspect-video overflow-hidden rounded-md bg-muted"
                >
                  <img
                    src={m.media.backdrop || "/placeholder.svg"}
                    alt={m.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
