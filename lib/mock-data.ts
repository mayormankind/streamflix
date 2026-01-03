import type { Movie } from "@/lib/api-client"

export const MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Midnight Protocol",
    description: "In a world where data is the only currency, a rogue hacker discovers a secret that could collapse the global economy.",
    genre: "Sci-Fi",
    year: 2024,
    duration: 8100, // 2h 15m
    rating: "PG-13",
    media: {
      thumbnail: "/movie-poster-cyberpunk.jpg",
      backdrop: "/cinematic-cyberpunk-cityscape.jpg",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      provider: "local",
    },
  },
  {
    id: "2",
    title: "Shadow of the Peak",
    description: "An experienced climber must survive a treacherous mountain range after a rescue mission goes horribly wrong.",
    genre: "Action",
    year: 2023,
    duration: 7080, // 1h 58m
    rating: "R",
    media: {
      thumbnail: "/movie-poster-mountain-climber.jpg",
      backdrop: "/snowy-mountain-cinematic.jpg",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      provider: "local",
    },
  },
  // ... adding more items to fill rows
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `movie-${i + 3}`,
    title: `Cinematic Journey ${i + 1}`,
    description: "A breathtaking exploration of nature and the human spirit.",
    genre: "Documentary",
    year: 2024,
    duration: 5400, // 1h 30m
    rating: "G",
    media: {
      thumbnail: `/placeholder.svg?height=450&width=300&query=movie+poster+nature+${i}`,
      backdrop: `/placeholder.svg?height=1080&width=1920&query=landscape+nature+${i}`,
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      provider: "local" as const,
    },
  })),
]
