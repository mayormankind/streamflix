import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Middleware to verify JWT token and protect admin routes
 */
export async function authMiddleware(
  request: NextRequest
): Promise<{ authorized: boolean; user?: { id: string; role: string }; error?: string }> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authorized: false,
        error: 'No token provided',
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
      return {
        authorized: false,
        error: 'Invalid or expired token',
      };
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return {
        authorized: false,
        error: 'Unauthorized access',
      };
    }

    return {
      authorized: true,
      user: decoded,
    };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return {
      authorized: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}

/**
 * Helper to create forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 403 }
  );
}
