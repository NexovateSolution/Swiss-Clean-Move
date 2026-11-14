import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { verifyPassword, generateToken } from '../../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Create response with token in cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)

    const isDbError =
      error?.code === 'P1001' ||
      error?.code === 'P2024' ||
      error?.message?.includes('Can\'t reach database server') ||
      error?.message?.includes('database') ||
      error?.name === 'PrismaClientInitializationError';

    if (isDbError) {
      return NextResponse.json(
        { error: 'Database server is temporarily unreachable. If using Supabase free tier, the database may be paused or waking up. Please retry in a few moments.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error?.message && process.env.NODE_ENV !== 'production' ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
