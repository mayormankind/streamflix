"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { fetchMovies, createMovie, updateMovie, deleteMovie, isAuthenticated, type Movie } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, MoreHorizontal, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { formatDuration } from "@/lib/utils"
import { MovieForm } from "@/components/movie-form"

export default function AdminMoviesPage() {
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  // Form state kept flat for easier input handling
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: new Date().getFullYear(),
    duration: "", 
    rating: "",
    media: {
      thumbnail: "",
      backdrop: "",
    },
    video: {
      url: "",
      provider: "local" as const,
    },
  })

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    loadMovies()
  }, [router])

  const loadMovies = async () => {
    setLoading(true)
    const data = await fetchMovies()
    setMovies(data)
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      genre: "",
      year: new Date().getFullYear(),
      duration: "",
      rating: "",
      media: {
        thumbnail: "",
        backdrop: "",
      },
      video: {
        url: "",
        provider: "local" as const,
      },
    })
  }

  const handleAddMovie = async () => {
    setSubmitting(true)
    
    const movieData = {
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      year: Number(formData.year),
      duration: parseInt(formData.duration) || 0,
      rating: formData.rating,
      media: {
        thumbnail: formData.media.thumbnail,
        backdrop: formData.media.backdrop
      },
      video: {
        url: formData.video.url,
        provider: 'local' as const
      }
    }

    // @ts-ignore - CreateMovieDto vs strict Movie type mismatch in client helper
    const result = await createMovie(movieData)
    
    if (result.success && result.data) {
      setMovies([result.data, ...movies])
      setIsAddDialogOpen(false)
      resetForm()
    } else {
      alert(result.error || "Failed to create movie")
    }
    setSubmitting(false)
  }

  const handleEditMovie = async () => {
    if (!editingMovie) return

    setSubmitting(true)
    
    const movieData = {
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      year: Number(formData.year),
      duration: parseInt(formData.duration) || 0,
      rating: formData.rating,
      media: {
        thumbnail: formData.media.thumbnail,
        backdrop: formData.media.backdrop
      },
      video: {
        url: formData.video.url,
        provider: 'local' as const
      }
    }

    const result = await updateMovie(editingMovie.id, movieData)
    
    if (result.success && result.data) {
      setMovies(movies.map(m => m.id === editingMovie.id ? result.data! : m))
      setIsEditDialogOpen(false)
      setEditingMovie(null)
      resetForm()
    } else {
      alert(result.error || "Failed to update movie")
    }
    setSubmitting(false)
  }

  const handleDeleteMovie = async (id: string) => {
    if (!confirm("Are you sure you want to delete this movie?")) return

    const result = await deleteMovie(id)
    
    if (result.success) {
      setMovies(movies.filter(m => m.id !== id))
    } else {
      alert(result.error || "Failed to delete movie")
    }
  }

  const openEditDialog = (movie: Movie) => {
    setEditingMovie(movie)
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      year: movie.year,
      duration: movie.duration.toString(),
      rating: movie.rating,
      media: {
        thumbnail: movie.media.thumbnail,
        backdrop: movie.media.backdrop
      },
      video: {
        url: movie.video.url,
        provider: 'local' as const
      }
    })
    setIsEditDialogOpen(true)
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="mt-20 flex flex-1">
        <AdminSidebar />

        <section className="flex-1 p-6 md:p-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Movies Management</h1>
              <p className="text-muted-foreground">View, edit, and manage all movies in your library</p>
            </div>
            
            {/* Add Movie Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) resetForm()
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Add Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Movie</DialogTitle>
                </DialogHeader>
                <MovieForm formData={formData} onChange={setFormData}/>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMovie} disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Movie
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Movie Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
              setIsEditDialogOpen(open)
              if (!open) {
                setEditingMovie(null)
                resetForm()
              }
            }}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Movie</DialogTitle>
                </DialogHeader>
                <MovieForm formData={formData} onChange={setFormData}/>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditMovie} disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <Input
              placeholder="Search movies by title or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md bg-muted/50"
            />
            <div className="text-sm text-muted-foreground">
              {filteredMovies.length} of {movies.length} movies
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[400px]">Movie</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : filteredMovies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      {searchQuery ? `No movies found matching "${searchQuery}"` : "No movies yet. Add your first movie!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovies.map((movie) => (
                    <TableRow key={movie.id} className="group">
                      <TableCell className="flex items-center gap-4">
                        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded bg-muted">
                          <img src={movie.media.backdrop || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{movie.title}</div>
                          <div className="line-clamp-1 text-xs text-muted-foreground">{movie.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{movie.genre}</TableCell>
                      <TableCell>{movie.year}</TableCell>
                      <TableCell>{formatDuration(movie.duration)}</TableCell>
                      <TableCell>
                        <span className="rounded bg-muted px-2 py-1 text-xs">{movie.rating}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openEditDialog(movie)}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDeleteMovie(movie.id)}>
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </main>
  )
}
