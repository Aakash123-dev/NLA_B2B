import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { createResponse, createErrorResponse, createValidationErrorResponse, createNotFoundResponse } from '@/lib/api/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return createValidationErrorResponse(result.error.issues);
    }

    const { email } = result.data;

    // Find user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!userResult.length) {
      return createNotFoundResponse('User not found');
    }

    const user = userResult[0];

    // Create password reset token
    const resetToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        purpose: 'password_reset'
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Create password reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email configuration
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Password Reset Link',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <!-- Header -->
          <div style="background-color: #000000; padding: 20px; text-align: center;">
            <img src="${process.env.COMPANY_LOGO_URL}" alt="Company Logo" style="max-height: 60px;"/>
          </div>
          
          <!-- Content -->
          <div style="padding: 20px; background-color: #f8f9fa; border: 1px solid #e9ecef;">
            <p>Dear ${user.client_first_name},</p>
            
            <p>We have received your password reset request. Please click on the link below to reset your password. If you have any questions, please feel free to reach out to us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #0066cc;">${process.env.SUPPORT_EMAIL}</a> and someone will be happy to assist you.</p>

            <div style="margin: 25px 0;">
              <a href="${resetLink}" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            
            <p style="margin-top: 20px;">Regards,<br/>The ${process.env.COMPANY_NAME} Team</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #666;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return createResponse(null, 'Password reset link sent successfully');

  } catch (error) {
    console.error('Forgot password error:', error);
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