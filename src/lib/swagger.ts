export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Gazelle Analytics API',
    version: '1.0.0',
    description: 'API documentation for Gazelle Analytics Platform',
    contact: {
      name: 'Northlight Analytics',
      email: 'support@northlightanalytics.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://your-production-url.com',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          user_id: {
            type: 'integer',
            description: 'User ID',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
          },
          first_name: {
            type: 'string',
            description: 'User first name',
          },
          last_name: {
            type: 'string',
            description: 'User last name',
          },
          full_name: {
            type: 'string',
            description: 'User full name',
          },
          role: {
            type: 'string',
            enum: ['admin', 'manager', 'audit', 'user'],
            description: 'User role',
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
            description: 'User status',
          },
          phone_number: {
            type: 'string',
            description: 'User phone number',
          },
          address: {
            type: 'string',
            description: 'User address',
          },
          client_logo: {
            type: 'string',
            description: 'User client logo URL',
          },
          show_popup: {
            type: 'string',
            enum: ['0', '1'],
            description: 'Show popup setting',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'User creation date',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'User update date',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
          },
          password: {
            type: 'string',
            description: 'User password',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            example: 200,
          },
          status: {
            type: 'string',
            example: 'Success',
          },
          msg: {
            type: 'string',
            example: 'Passed',
          },
          data: {
            allOf: [
              { $ref: '#/components/schemas/User' },
              {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: 'JWT token',
                  },
                },
              },
            ],
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password', 'client_first_name', 'client_last_name'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'User password',
          },
          client_first_name: {
            type: 'string',
            description: 'User first name',
          },
          client_last_name: {
            type: 'string',
            description: 'User last name',
          },
          phone_number: {
            type: 'string',
            description: 'User phone number',
          },
          address: {
            type: 'string',
            description: 'User address',
          },
        },
      },
      ForgotPasswordRequest: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
          },
        },
      },
      ResetPasswordRequest: {
        type: 'object',
        required: ['token', 'password', 'confirmPassword'],
        properties: {
          token: {
            type: 'string',
            description: 'Reset token',
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'New password',
          },
          confirmPassword: {
            type: 'string',
            minLength: 6,
            description: 'Confirm new password',
          },
        },
      },
      UpdateProfileRequest: {
        type: 'object',
        properties: {
          client_first_name: {
            type: 'string',
            description: 'User first name',
          },
          client_last_name: {
            type: 'string',
            description: 'User last name',
          },
          phone_number: {
            type: 'string',
            description: 'User phone number',
          },
          address: {
            type: 'string',
            description: 'User address',
          },
          client_logo: {
            type: 'string',
            description: 'User client logo URL',
          },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Response success status',
          },
          data: {
            type: 'object',
            description: 'Response data',
          },
          error: {
            type: 'string',
            description: 'Error message',
          },
          message: {
            type: 'string',
            description: 'Response message',
          },
          code: {
            type: 'integer',
            description: 'HTTP status code',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          error: {
            type: 'string',
            description: 'Error message',
          },
          code: {
            type: 'integer',
            description: 'HTTP status code',
          },
        },
      },
    },
  },
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'User login',
        description: 'Authenticate user and return JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'User logout',
        description: 'Logout user and clear authentication token',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Logout successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Forgot password',
        description: 'Send password reset email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ForgotPasswordRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset email sent',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/reset-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Reset password',
        description: 'Reset user password with token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ResetPasswordRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          401: {
            description: 'Invalid or expired token',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/profile': {
      get: {
        tags: ['Authentication'],
        summary: 'Get user profile',
        description: 'Get current user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Authentication'],
        summary: 'Update user profile',
        description: 'Update current user profile',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProfileRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Profile updated successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Get all users (admin only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Users retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/User',
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          403: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create user',
        description: 'Create new user (admin only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          403: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          409: {
            description: 'User already exists',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description: 'Get specific user by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'User retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          403: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        description: 'Update specific user by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProfileRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/ApiResponse' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          403: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        description: 'Delete specific user by ID (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
              },
            },
          },
          401: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          403: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
  ],
}; 