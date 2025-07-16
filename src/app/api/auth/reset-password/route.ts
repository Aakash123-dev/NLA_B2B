import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createNotFoundResponse } from '@/lib/api/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const { token, password } = result.data;

    // Verify token
    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    } catch (error) {
      return createErrorResponse('Invalid or expired token', 401);
    }

    // Check if token is for password reset
    if (tokenPayload.purpose !== 'password_reset') {
      return createErrorResponse('Invalid token purpose', 401);
    }

    // Find user by ID
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, tokenPayload.userId))
      .limit(1);

    if (!userResult.length) {
      return createNotFoundResponse('User not found');
    }

    const user = userResult[0];

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password
    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return createResponse(null, 'Password reset successfully');

  } catch (error) {
    console.error('Reset password error:', error);
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