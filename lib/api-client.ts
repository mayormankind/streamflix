//lib/api-client.ts
// API client utilities for frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: number; // in seconds
  
  media: {
    thumbnail: string;
    backdrop: string;
  };

  video: {
    url: string;
    provider: 'local' | 'cloudinary' | 's3';
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  admin?: {
    id: string;
    email: string;
    role: string;
  };
  error?: string;
}

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Set auth token to localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Fetch all movies
 */
export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const result: ApiResponse<Movie[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

/**
 * Search movies
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies?search=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    const result: ApiResponse<Movie[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

/**
 * Fetch a single movie by ID
 */
export async function fetchMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch movie');
    }

    const result: ApiResponse<Movie> = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

/**
 * Create a new movie (Admin only)
 */
export async function createMovie(movieData: Omit<Movie, 'id'>): Promise<ApiResponse<Movie>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });

    const result: ApiResponse<Movie> = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating movie:', error);
    return { success: false, error: 'Failed to create movie' };
  }
}

/**
 * Update a movie (Admin only)
 */
export async function updateMovie(
  id: string,
  movieData: Partial<Movie>
): Promise<ApiResponse<Movie>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });

    const result: ApiResponse<Movie> = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating movie:', error);
    return { success: false, error: 'Failed to update movie' };
  }
}

/**
 * Delete a movie (Admin only)
 */
export async function deleteMovie(id: string): Promise<ApiResponse<void>> {
  try {
    const token = getAuthToken();

    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: ApiResponse<void> = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting movie:', error);
    return { success: false, error: 'Failed to delete movie' };
  }
}

/**
 * Login admin
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result: AuthResponse = await response.json();

    if (result.success && result.token) {
      setAuthToken(result.token);
    }

    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Failed to login' };
  }
}

/**
 * Register admin
 */
export async function register(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result: AuthResponse = await response.json();

    if (result.success && result.token) {
      setAuthToken(result.token);
    }

    return result;
  } catch (error) {
    console.error('Error registering:', error);
    return { success: false, error: 'Failed to register' };
  }
}

/**
 * Logout
 */
export function logout(): void {
  removeAuthToken();
}
