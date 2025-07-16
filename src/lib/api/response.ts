import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
}

export function createResponse<T = any>(
  data: T,
  message?: string,
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      code: status,
    },
    { status }
  );
}

export function createErrorResponse(
  error: string,
  status = 400,
  details?: any
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details && { details }),
      code: status,
    },
    { status }
  );
}

export function createValidationErrorResponse(
  errors: any[],
  status = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      details: errors,
      code: status,
    },
    { status }
  );
}

export function createAuthErrorResponse(
  message = 'Authentication required',
  status = 401
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: status,
    },
    { status }
  );
}

export function createForbiddenResponse(
  message = 'Insufficient permissions',
  status = 403
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: status,
    },
    { status }
  );
}

export function createNotFoundResponse(
  message = 'Resource not found',
  status = 404
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: status,
    },
    { status }
  );
}

export function createServerErrorResponse(
  message = 'Internal server error',
  status = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: status,
    },
    { status }
  );
}

// Legacy response format for backward compatibility
export function sendResponse(status: number, message: string, data?: any) {
  return NextResponse.json(
    {
      code: status,
      status: status < 400 ? 'Success' : 'Error',
      msg: message,
      ...(data && { data }),
    },
    { status }
  );
} 