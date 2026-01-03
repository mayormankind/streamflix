//app/api/movies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/services/movieService';
import { authMiddleware, unauthorizedResponse } from '@/lib/auth-middleware';

/**
 * GET /api/movies
 * Get all movies
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const year = searchParams.get('year');
    const search = searchParams.get('search');

    let movies;

    if (search) {
      movies = await MovieService.searchMovies(search);
    } else if (genre) {
      movies = await MovieService.getMoviesByGenre(genre);
    } else if (year) {
      movies = await MovieService.getMoviesByYear(parseInt(year));
    } else {
      movies = await MovieService.getAllMovies();
    }

    // Transform movies to match frontend interface
    const transformedMovies = movies.map((movie) => ({
      id: movie._id.toString(),
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      year: movie.year,
      duration: movie.duration,
      rating: movie.rating,
      media: movie.media,
      video: movie.video,
    }));

    return NextResponse.json(
      {
        success: true,
        data: transformedMovies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get movies API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/movies
 * Create a new movie (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authMiddleware(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await request.json();
    const { title, description, genre, year, duration, rating, media, video } = body;

    // Validate required fields
    if (!title || !description || !genre || !year || !duration || !rating || !media?.thumbnail || !media?.backdrop || !video?.url) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create movie
    const movie = await MovieService.createMovie({
      title,
      description,
      genre,
      year: parseInt(year),
      duration: parseInt(duration),
      rating,
      media: {
        thumbnail: media.thumbnail,
        backdrop: media.backdrop
      },
      video: {
        url: video.url,
        provider: video.provider || 'local'
      }
    });

    // Transform movie to match frontend interface
    const transformedMovie = {
      id: movie._id.toString(),
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      year: movie.year,
      duration: movie.duration,
      rating: movie.rating,
      media: movie.media,
      video: movie.video,
    };

    return NextResponse.json(
      {
        success: true,
        data: transformedMovie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create movie API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
