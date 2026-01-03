"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { MOVIES, type Movie } from "@/lib/mock-data"
import { MovieCard } from "@/components/movie-card"
import { cn } from "@/lib/utils"

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const filtered = MOVIES.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    setResults(filtered)
  }, [query])

  return (
    <div className="relative flex items-center">
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border border-transparent transition-all duration-300",
          isOpen && "border-muted-foreground/30 bg-black/50 px-3 py-1 w-64",
        )}
      >
        <SearchIcon
          className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Titles, people, genres"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
            {query && <X className="h-4 w-4 cursor-pointer text-muted-foreground" onClick={() => setQuery("")} />}
          </>
        )}
      </div>

      {isOpen && query && (
        <div className="fixed inset-x-0 top-20 z-50 flex max-h-[70vh] flex-col overflow-y-auto bg-background/95 p-6 backdrop-blur-xl md:px-12">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Search results for "{query}"</h2>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground">No matches found for "{query}".</div>
          )}
        </div>
      )}
    </div>
  )
}
