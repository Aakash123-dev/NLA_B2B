import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { JWTPayload } from '@/types/auth';

export async function verifyAuth(token: string): Promise<JWTPayload | null> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not found in environment variables');
      return null;
    }

    const payload = verify(token, secret) as JWTPayload;
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function getAuthFromRequest(request: NextRequest): Promise<JWTPayload | null> {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization');
  let token = authHeader?.split(' ')[1];

  // If no token in header, try to get from cookies
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('auth-token')?.value;
  }

  if (!token) {
    return null;
  }

  return await verifyAuth(token);
}

export async function requireAuth(request: NextRequest): Promise<JWTPayload> {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    throw new Error('Authentication required');
  }
  return auth;
}

export async function requireRole(request: NextRequest, roles: string[]): Promise<JWTPayload> {
  const auth = await requireAuth(request);
  
  if (!roles.includes(auth.user.role)) {
    throw new Error('Insufficient permissions');
  }
  
  return auth;
} 