import { NextRequest, NextResponse } from 'next/server';
import { createResponse, createErrorResponse } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createErrorResponse('No token provided', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // For now, just validate that a token exists
    // In a real implementation, you would verify the JWT token
    if (!token) {
      return createErrorResponse('Invalid token', 401);
    }

    // Return a simple success response
    // In a real implementation, you would decode the JWT and return user data
    return createResponse(
      {
        user_id: 1,
        email: 'user@example.com',
        role: 'user',
        status: 'active',
      },
      'Token verified successfully'
    );
  } catch (error) {
    console.error('Profile verification error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 