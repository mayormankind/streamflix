import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { MOVIES } from "@/lib/mock-data"

export default function TVShowsPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />

      {/* Header Section */}
      <section className="px-4 pb-8 pt-32 md:px-12">
        <h1 className="mb-2 text-4xl font-bold md:text-5xl">TV Shows</h1>
        <p className="text-lg text-muted-foreground">Binge-worthy series and shows for every mood</p>
      </section>

      {/* Content Rows */}
      <div className="space-y-12 px-4 md:px-12">
        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Popular on StreamFlix</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Trending Series</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(2, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Drama Series</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(1, 9).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Comedy Shows</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(3, 11).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Mystery & Thriller</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(0, 8).map((movie) => (
              <MovieCard key={`mystery-${movie.id}`} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
