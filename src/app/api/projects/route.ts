import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { projects, users, models, insights } from '@/lib/db/schema';
import { eq, and, or, ilike, desc } from 'drizzle-orm';
import { createProjectSchema, projectFiltersSchema } from '@/lib/validations/project';
import { requireAuth } from '@/lib/auth/verify-auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createAuthErrorResponse } from '@/lib/api/response';

// GET /api/projects - Get all projects with filters
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
    const { searchParams } = new URL(request.url);
    const queryParams = {
      user_id: parseInt(auth.user.id),
      filter: searchParams.get('filter') || 'all',
      search: searchParams.get('search') || '',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    // Validate query parameters
    const result = projectFiltersSchema.safeParse(queryParams);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const { user_id, filter, search, page, limit } = result.data;
    const offset = (page - 1) * limit;

    // Build query conditions
    let whereConditions = [];
    
    // Filter by user (only user's projects unless admin)
    if (auth.user.role !== 'admin') {
      whereConditions.push(eq(projects.user_id, user_id));
    }

    // Apply filters
    if (filter === 'pinned') {
      whereConditions.push(eq(projects.pin_project, '1'));
    }

    // Search functionality
    if (search) {
      whereConditions.push(
        or(
          ilike(projects.project_name, `%${search}%`),
          ilike(projects.client_name, `%${search}%`),
          ilike(projects.product_name, `%${search}%`)
        )
      );
    }

    // Get projects with related data
    const projectsList = await db
      .select({
        id: projects.id,
        user_id: projects.user_id,
        audit_user_id: projects.audit_user_id,
        project_name: projects.project_name,
        slug: projects.slug,
        type_of_project: projects.type_of_project,
        client_name: projects.client_name,
        product_name: projects.product_name,
        project_version: projects.project_version,
        company_logo: projects.company_logo,
        pin_project: projects.pin_project,
        pin_project_date: projects.pin_project_date,
        retailers: projects.retailers,
        brands: projects.brands,
        products: projects.products,
        updatedAt: projects.updatedAt,
        date_created: projects.date_created,
        // User info
        user_name: users.full_name,
        user_email: users.email,
      })
      .from(projects)
      .leftJoin(users, eq(projects.user_id, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(projects.updatedAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: projects.id })
      .from(projects)
      .leftJoin(users, eq(projects.user_id, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const total = totalResult.length;

    // Format response
    const formattedProjects = projectsList.map(project => ({
      id: project.id,
      user_id: project.user_id,
      audit_user_id: project.audit_user_id,
      project_name: project.project_name,
      slug: project.slug,
      type_of_project: project.type_of_project,
      client_name: project.client_name,
      product_name: project.product_name,
      project_version: project.project_version,
      company_logo: project.company_logo,
      pin_project: project.pin_project,
      pin_project_date: project.pin_project_date,
      retailers: project.retailers,
      brands: project.brands,
      products: project.products,
      updatedAt: project.updatedAt,
      date_created: project.date_created,
      user_name: project.user_name,
      user_email: project.user_email,
    }));

    return createResponse({
      projects: formattedProjects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, 'Projects retrieved successfully');

  } catch (error) {
    console.error('Get projects error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await requireAuth(request);
    
    const body = await request.json();
    
    // Validate input
    const result = createProjectSchema.safeParse(body);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const {
      project_name,
      type_of_project,
      client_name,
      product_name,
      retailers,
      brands,
      products,
      company_logo,
    } = result.data;

    // Generate slug
    const slug = project_name.toLowerCase().replace(/\s+/g, '-');

    // Create project
    const newProject = await db
      .insert(projects)
      .values({
        user_id: parseInt(auth.user.id),
        project_name,
        slug,
        type_of_project,
        client_name,
        product_name,
        project_version: 1,
        company_logo,
        pin_project: '0',
        retailers: retailers || [],
        brands: brands || [],
        products: products || [],
        updatedAt: new Date(),
        date_created: new Date(),
      })
      .returning({
        id: projects.id,
        user_id: projects.user_id,
        audit_user_id: projects.audit_user_id,
        project_name: projects.project_name,
        slug: projects.slug,
        type_of_project: projects.type_of_project,
        client_name: projects.client_name,
        product_name: projects.product_name,
        project_version: projects.project_version,
        company_logo: projects.company_logo,
        pin_project: projects.pin_project,
        pin_project_date: projects.pin_project_date,
        retailers: projects.retailers,
        brands: projects.brands,
        products: projects.products,
        updatedAt: projects.updatedAt,
        date_created: projects.date_created,
      });

    if (!newProject.length) {
      return createErrorResponse('Failed to create project', 500);
    }

    const project = newProject[0];

    return createResponse(project, 'Project created successfully', 201);

  } catch (error) {
    console.error('Create project error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return createAuthErrorResponse();
    }
    
    return createErrorResponse('Internal server error', 500);
  }
} 