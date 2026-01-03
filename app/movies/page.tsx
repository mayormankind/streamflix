import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"
import Link from "next/link"
import { MovieService } from "@/services/movieService"


export default async function MoviesPage() {
   const dbMovies = await MovieService.getAllMovies();
    // Transform the movies to plain objects to avoid serialization issues
    const MOVIES = dbMovies.map((movie) => ({
      id: movie._id.toString(),
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      year: movie.year,
      rating: movie.rating,
      duration: movie.duration,
      media: movie.media,
      video: movie.video,
    }));
    const featured = MOVIES[1] ?? MOVIES[0] ?? null

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />

      {/* Featured Movie Hero */}
      {featured && (
      <section className="relative h-[70vh] w-full md:h-[80vh]">
        <div className="absolute inset-0">
          {featured.media && <img
            src={featured.media.backdrop || "/placeholder.svg"}
            alt={featured.title}
            className="h-full w-full object-cover brightness-[0.5]"
          />}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative flex h-full flex-col justify-end px-4 pb-16 md:px-12 md:pb-24">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <span className="rounded bg-primary/20 px-2 py-1">FEATURED MOVIE</span>
          </div>
          <h1 className="max-w-[15ch] text-4xl font-extrabold tracking-tight md:text-6xl">{featured.title}</h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">{featured.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <Link href={`/watch/${featured.id}`}>
              <Button size="lg" className="h-12 gap-2 bg-white px-8 text-black hover:bg-white/90">
                <Play className="h-5 w-5 fill-current" />
                Play
              </Button>
            </Link>
            <Link href={`/movies/${featured.id}`}>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 gap-2 bg-muted/60 px-8 text-white backdrop-blur-sm hover:bg-muted/80"
              >
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Content Rows */}
      <div className="relative z-10 -mt-16 space-y-12 px-4 md:px-12">
        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Action Movies</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.filter((m) => m.genre === "Action")
              .concat(MOVIES.slice(0, 6))
              .map((movie, i) => (
                <MovieCard key={`action-${i}`} movie={movie} />
              ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Sci-Fi Blockbusters</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.filter((m) => m.genre === "Sci-Fi")
              .concat(MOVIES.slice(1, 7))
              .map((movie, i) => (
                <MovieCard key={`scifi-${i}`} movie={movie} />
              ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Award Winners</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(2, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Classic Cinema</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice()
              .reverse()
              .map((movie) => (
                <MovieCard key={`classic-${movie.id}`} movie={movie} />
              ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Documentaries</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.filter((m) => m.genre === "Documentary").map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
