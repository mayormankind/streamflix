import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MovieFormProps {
  formData: {
    title: string
    description: string
    genre: string
    year: number
    duration: string
    rating: string
    media: {
      thumbnail: string
      backdrop: string
    }
    video: {
      url: string
      provider: "local"
    }
  }
  onChange: (data: MovieFormProps["formData"]) => void
}

export function MovieForm({ formData, onChange }: MovieFormProps){
    return (
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter movie title"
              value={formData.title}
              onChange={(e) => onChange({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Enter movie description"
              value={formData.description}
              onChange={(e) => onChange({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="genre">Genre</Label>
              <Input 
                id="genre" 
                placeholder="e.g., Action"
                value={formData.genre}
                onChange={(e) => onChange({ ...formData, genre: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input 
                id="year" 
                type="number" 
                placeholder="2024"
                value={formData.year}
                onChange={(e) => onChange({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input 
                id="duration" 
                type="number"
                placeholder="e.g., 7200"
                value={formData.duration}
                onChange={(e) => onChange({ ...formData, duration: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Input 
                id="rating" 
                placeholder="e.g., PG-13"
                value={formData.rating}
                onChange={(e) => onChange({ ...formData, rating: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input 
              id="thumbnail" 
              placeholder="Enter thumbnail image URL"
              value={formData.media.thumbnail}
              onChange={(e) => onChange({ ...formData, media: { ...formData.media, thumbnail: e.target.value } })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="backdrop">Backdrop URL</Label>
            <Input 
              id="backdrop" 
              placeholder="Enter backdrop image URL"
              value={formData.media.backdrop}
              onChange={(e) => onChange({ ...formData, media: { ...formData.media, backdrop: e.target.value } })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              placeholder="https://..."
              value={formData.video.url}
              onChange={(e) =>
                onChange({ ...formData, video: { ...formData.video, url: e.target.value } })
              }
            />
          </div>
        </div>
    )
} 