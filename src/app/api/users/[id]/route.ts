import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { updateProfileSchema } from '@/lib/validations/auth';
import { requireRole, requireAuth } from '@/lib/auth/verify-auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createAuthErrorResponse, createForbiddenResponse, createNotFoundResponse } from '@/lib/api/response';

// GET /api/users/[id] - Get specific user
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
    // Await params in Next.js 15
    const { id } = await params;
    
    // Users can only view their own profile, admins can view any user
    if (auth.user.role !== 'admin' && auth.user.id !== id) {
      return createForbiddenResponse();
    }
    
    // Get user by ID
    const userResult = await db
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
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (!userResult.length) {
      return createNotFoundResponse('User not found');
    }

    const user = userResult[0];

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

    return createResponse(userData, 'User retrieved successfully');

  } catch (error) {
    console.error('Get user error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return createForbiddenResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
}

// PUT /api/users/[id] - Update specific user
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
    // Await params in Next.js 15
    const { id } = await params;
    
    // Users can only update their own profile, admins can update any user
    if (auth.user.role !== 'admin' && auth.user.id !== id) {
      return createForbiddenResponse();
    }
    
    const body = await request.json();
    
    // Validate input
    const result = updateProfileSchema.safeParse(body);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const updateData: any = result.data;

    // Generate full name if first or last name is updated
    if (updateData.client_first_name || updateData.client_last_name) {
      const userResult = await db
        .select({
          client_first_name: users.client_first_name,
          client_last_name: users.client_last_name,
        })
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);

      if (userResult.length) {
        const currentUser = userResult[0];
        const firstName = updateData.client_first_name || currentUser.client_first_name;
        const lastName = updateData.client_last_name || currentUser.client_last_name;
        
        updateData.full_name = `${firstName} ${lastName}`;
      }
    }

    // Update user
    const updatedResult = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, parseInt(id)))
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

    if (!updatedResult.length) {
      return createNotFoundResponse('User not found');
    }

    const user = updatedResult[0];

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

    return createResponse(userData, 'User updated successfully');

  } catch (error) {
    console.error('Update user error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return createForbiddenResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
}

// DELETE /api/users/[id] - Delete specific user (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify authentication and admin role
    const auth = await requireRole(request, ['admin']);
    
    // Await params in Next.js 15
    const { id } = await params;
    
    // Check if user exists
    const userResult = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (!userResult.length) {
      return createNotFoundResponse('User not found');
    }

    // Delete user
    await db
      .delete(users)
      .where(eq(users.id, parseInt(id)));

    return createResponse(null, 'User deleted successfully');

  } catch (error) {
    console.error('Delete user error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    if (error instanceof Error && error.message === 'Insufficient permissions') {
      return createForbiddenResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
} 