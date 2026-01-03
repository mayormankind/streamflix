//app/api/movies/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MovieService } from '@/services/movieService';
import { authMiddleware, unauthorizedResponse } from '@/lib/auth-middleware';

/**
 * GET /api/movies/[id]
 * Get a single movie by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const movie = await MovieService.getMovieById(id);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

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
      { status: 200 }
    );
  } catch (error) {
    console.error('Get movie API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movie' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/movies/[id]
 * Update a movie by ID (Admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await authMiddleware(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const body = await request.json();

    // Update movie
    const movie = await MovieService.updateMovie(id, body);

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

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
      { status: 200 }
    );
  } catch (error) {
    console.error('Update movie API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update movie' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/movies/[id]
 * Delete a movie by ID (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await authMiddleware(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult.error);
    }

    const { id } = await params;
    const deleted = await MovieService.deleteMovie(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Movie deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete movie API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete movie' },
      { status: 500 }
    );
  }
}
