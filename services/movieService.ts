//services/movieService.ts
import Movie, { IMovie } from '@/models/Movie';
import dbConnect from '@/lib/db';

export interface CreateMovieDto {
  title: string;
  description: string;
  genre: string;
  year: number;
  duration: number;
  rating: string;
  media: {
    thumbnail: string;
    backdrop: string;
  };
  video: {
    url: string;
    provider: 'local' | 'cloudinary' | 's3';
  };
}

export interface UpdateMovieDto {
  title?: string;
  description?: string;
  genre?: string;
  year?: number;
  duration?: number;
  rating?: string;
  media?: {
    thumbnail?: string;
    backdrop?: string;
  };
  video?: {
    url?: string;
    provider?: 'local' | 'cloudinary' | 's3';
  };
}

export class MovieService {
  /**
   * Get all movies
   */
  static async getAllMovies(): Promise<IMovie[]> {
    await dbConnect();
    const movies = await Movie.find().sort({ createdAt: -1 }).lean();
    return movies as IMovie[];
  }

  /**
   * Get a single movie by ID
   */
  static async getMovieById(id: string): Promise<IMovie | null> {
    await dbConnect();
    
    if (!id || id.length !== 24) {
      return null;
    }

    const movie = await Movie.findById(id).lean();
    return movie as IMovie | null;
  }

  /**
   * Create a new movie
   */
  static async createMovie(movieData: CreateMovieDto): Promise<IMovie> {
    await dbConnect();
    
    const movie = await Movie.create(movieData);
    return movie.toObject() as IMovie;
  }

  /**
   * Update a movie by ID
   */
  static async updateMovie(
    id: string,
    updateData: UpdateMovieDto
  ): Promise<IMovie | null> {
    await dbConnect();
    
    if (!id || id.length !== 24) {
      return null;
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    return movie as IMovie | null;
  }

  /**
   * Delete a movie by ID
   */
  static async deleteMovie(id: string): Promise<boolean> {
    await dbConnect();
    
    if (!id || id.length !== 24) {
      return false;
    }

    const result = await Movie.findByIdAndDelete(id);
    return !!result;
  }

  /**
   * Search movies by query
   */
  static async searchMovies(query: string): Promise<IMovie[]> {
    await dbConnect();
    
    if (!query || query.trim() === '') {
      return this.getAllMovies();
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    return movies as IMovie[];
  }

  /**
   * Get movies by genre
   */
  static async getMoviesByGenre(genre: string): Promise<IMovie[]> {
    await dbConnect();
    
    const movies = await Movie.find({
      genre: { $regex: genre, $options: 'i' },
    })
      .sort({ createdAt: -1 })
      .lean();

    return movies as IMovie[];
  }

  /**
   * Get movies by year
   */
  static async getMoviesByYear(year: number): Promise<IMovie[]> {
    await dbConnect();
    
    const movies = await Movie.find({ year })
      .sort({ createdAt: -1 })
      .lean();

    return movies as IMovie[];
  }
}
