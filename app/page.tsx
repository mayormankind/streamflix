import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { fetchMovies } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Info, Play } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const movies = await fetchMovies()
  const featured = movies[0] || {
    id: "1",
    title: "No Movies Available",
    description: "Please add movies from the admin dashboard",
    media: {
      backdrop: "/placeholder.svg",
      thumbnail: "/placeholder.svg"
    }
  }

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full md:h-[95vh]">
        <div className="absolute inset-0">
          <img
            src={featured.media?.backdrop || "/placeholder.svg"}
            alt={featured.title}
            className="h-full w-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative flex h-full flex-col justify-end px-4 pb-20 md:px-12 md:pb-32">
          <h1 className="max-w-[15ch] text-4xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
            {featured.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground md:text-lg">{featured.description}</p>
          <div className="mt-8 flex items-center gap-3">
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

      {/* Rows */}
      <div className="relative z-10 -mt-20 space-y-12 px-4 md:px-12">
        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Trending Now</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">New Releases</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {movies.slice()
              .reverse()
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Action & Adventure</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {[...movies, ...movies].map((movie, i) => (
              <MovieCard key={`${movie.id}-${i}`} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
