import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { MOVIES } from "@/lib/mock-data"
import { TrendingUp, Flame, Clock } from "lucide-react"

export default function NewPopularPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />

      {/* Header Section */}
      <section className="px-4 pb-8 pt-32 md:px-12">
        <h1 className="mb-2 text-4xl font-bold md:text-5xl">New & Popular</h1>
        <p className="text-lg text-muted-foreground">The latest releases and what everyone's watching right now</p>
      </section>

      {/* Content Sections */}
      <div className="space-y-12 px-4 md:px-12">
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold md:text-2xl">Trending Now</h2>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold md:text-2xl">Top 10 This Week</h2>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice(0, 10).map((movie, index) => (
              <div key={movie.id} className="relative">
                <div className="absolute -left-2 -top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-black text-primary-foreground">
                  {index + 1}
                </div>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold md:text-2xl">New This Week</h2>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.filter((m) => m.year === 2024).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Coming Soon</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOVIES.slice(0, 6).map((movie) => (
              <div
                key={movie.id}
                className="group flex gap-4 rounded-lg bg-card p-4 transition-colors hover:bg-card/80"
              >
                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <img
                    src={movie.media.thumbnail || "/placeholder.svg"}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="mb-1 font-bold">{movie.title}</h3>
                    <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">{movie.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-muted px-2 py-1">{movie.genre}</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">Worth the Wait</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MOVIES.slice()
              .reverse()
              .map((movie) => (
                <MovieCard key={`wait-${movie.id}`} movie={movie} />
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}
