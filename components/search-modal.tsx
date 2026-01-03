"use client"

import { useState, useEffect } from "react"
import { SearchIcon, X } from "lucide-react"
import { searchMovies, type Movie } from "@/lib/api-client"
import { MovieCard } from "@/components/movie-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])

  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const search = async () => {
      if (query.trim() === "") {
        setResults([])
        return
      }

      const data = await searchMovies(query)
      setResults(data)
    }

    // Debounce
    const timeoutId = setTimeout(search, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/98 border-muted/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search Movies and TV Shows</DialogTitle>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Titles, genres, or descriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50 text-lg"
              autoFocus
            />
            {query && (
              <X
                className="absolute right-3 h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setQuery("")}
              />
            )}
          </div>
        </DialogHeader>

        <div className="mt-6">
          {query.trim() !== "" ? (
            <>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Results for "{query}"
                </h2>
              </div>
              {results.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground italic">No matches found for your search.</p>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              <SearchIcon className="mx-auto h-12 w-12 opacity-20 mb-4" />
              <p>Type to start searching across movies and TV shows</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
