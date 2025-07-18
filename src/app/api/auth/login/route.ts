import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { loginSchema } from '@/lib/validations/auth';
import { createResponse, createErrorResponse, createValidationErrorResponse } from '@/lib/api/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: result.error.issues 
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find user by email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user.length || user[0].status !== 'active') {
      return NextResponse.json(
        { error: 'Invalid credentials or inactive user' },
        { status: 401 }
      );
    }

    // Verify password
    if (!user[0].password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        user: {
          id: user[0].id,
          email: user[0].email,
          role: user[0].role,
        }
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    // Return user data and token
    const userData = {
      user_id: user[0].id,
      email: user[0].email,
      first_name: user[0].client_first_name,
      last_name: user[0].client_last_name,
      full_name: user[0].full_name,
      role: user[0].role,
      status: user[0].status,
      phone_number: user[0].phone_number,
      address: user[0].address,
      client_logo: user[0].client_logo,
      show_popup: user[0].show_popup,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
      token,
    };

    // Set HTTP-only cookie
    const response = NextResponse.json(
      {
        code: 200,
        status: 'Success',
        msg: 'Passed',
        data: userData,
      },
      { status: 200 }
    );

    // Set cookie with token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 