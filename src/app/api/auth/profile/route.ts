import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { updateProfileSchema } from '@/lib/validations/auth';
import { requireAuth } from '@/lib/auth/verify-auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createNotFoundResponse, createAuthErrorResponse } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
    // Get user profile
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
      .where(eq(users.id, parseInt(auth.user.id)))
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

    return createResponse(userData, 'Profile retrieved successfully');

  } catch (error) {
    console.error('Get profile error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
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
        .where(eq(users.id, parseInt(auth.user.id)))
        .limit(1);

      if (userResult.length) {
        const currentUser = userResult[0];
        const firstName = updateData.client_first_name || currentUser.client_first_name;
        const lastName = updateData.client_last_name || currentUser.client_last_name;
        
        updateData.full_name = `${firstName} ${lastName}`;
      }
    }

    // Update user profile
    await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, parseInt(auth.user.id)));

    // Get updated user data
    const updatedUserResult = await db
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
      .where(eq(users.id, parseInt(auth.user.id)))
      .limit(1);

    if (!updatedUserResult.length) {
      return createNotFoundResponse('User not found');
    }

    const updatedUser = updatedUserResult[0];

    const userData = {
      user_id: updatedUser.id,
      email: updatedUser.email,
      first_name: updatedUser.client_first_name,
      last_name: updatedUser.client_last_name,
      full_name: updatedUser.full_name,
      role: updatedUser.role,
      status: updatedUser.status,
      phone_number: updatedUser.phone_number,
      address: updatedUser.address,
      client_logo: updatedUser.client_logo,
      show_popup: updatedUser.show_popup,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return createResponse(userData, 'Profile updated successfully');

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
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

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 