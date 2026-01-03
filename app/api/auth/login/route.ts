import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';

/**
 * POST /api/auth/login
 * Login an admin user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Attempt login
    const result = await AuthService.login({ email, password });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        token: result.token,
        admin: result.admin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
