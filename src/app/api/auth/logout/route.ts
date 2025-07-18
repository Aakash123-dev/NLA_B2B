import { NextRequest, NextResponse } from 'next/server';
import { createResponse, createErrorResponse } from '@/lib/api/response';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = createResponse(null, 'Logout successful');

    // Clear the auth token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Expire immediately
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 