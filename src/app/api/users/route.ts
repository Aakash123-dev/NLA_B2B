import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { registerSchema } from '@/lib/validations/auth';
import { requireRole } from '@/lib/auth/verify-auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createAuthErrorResponse, createForbiddenResponse } from '@/lib/api/response';
import { eq } from 'drizzle-orm';

// GET /api/users - Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const auth = await requireRole(request, ['admin']);
    
    // Get all users
    const usersList = await db
      .select({
        id: users.id,
        email: users.email,
        client_first_name: users.client_first_name,
        client_last_name: users.client_last_name,
        full_name: users.full_name,
        role: users.role,
        status: users.status,
        phone_number: users.phone_number,
        address: users.address,
        client_logo: users.client_logo,
        show_popup: users.show_popup,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(users.createdAt);

    const formattedUsers = usersList.map(user => ({
      user_id: user.id,
      email: user.email,
      first_name: user.client_first_name,
      last_name: user.client_last_name,
      full_name: user.full_name,
      role: user.role,
      status: user.status,
      phone_number: user.phone_number,
      address: user.address,
      client_logo: user.client_logo,
      show_popup: user.show_popup,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return createResponse(formattedUsers, 'Users retrieved successfully');

  } catch (error) {
    console.error('Get users error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return createForbiddenResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
}

// POST /api/users - Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const auth = await requireRole(request, ['admin']);
    
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const { email, password, client_first_name, client_last_name, phone_number, address } = result.data;

    // Check if user already exists
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length) {
      return createErrorResponse('User already exists', 409);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create full name
    const full_name = `${client_first_name} ${client_last_name}`;

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        client_first_name,
        client_last_name,
        full_name,
        phone_number,
        address,
        created_by: auth.user.id,
        status: 'active',
        role: 'user',
        show_popup: '0',
      })
      .returning({
        id: users.id,
        email: users.email,
        client_first_name: users.client_first_name,
        client_last_name: users.client_last_name,
        full_name: users.full_name,
        role: users.role,
        status: users.status,
        phone_number: users.phone_number,
        address: users.address,
        client_logo: users.client_logo,
        show_popup: users.show_popup,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!newUser.length) {
      return createErrorResponse('Failed to create user', 500);
    }

    const user = newUser[0];

    const userData = {
      user_id: user.id,
      email: user.email,
      first_name: user.client_first_name,
      last_name: user.client_last_name,
      full_name: user.full_name,
      role: user.role,
      status: user.status,
      phone_number: user.phone_number,
      address: user.address,
      client_logo: user.client_logo,
      show_popup: user.show_popup,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return createResponse(userData, 'User created successfully', 201);

  } catch (error) {
    console.error('Create user error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return createForbiddenResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
} 