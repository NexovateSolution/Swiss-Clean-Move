import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './db'

// Validate JWT_SECRET exists and is strong
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required. Please set it in .env.local')
  }
  if (secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long for security')
  }
  if (secret.includes('change-in-production') || secret.includes('your-secret')) {
    throw new Error('JWT_SECRET is using a default/weak value. Please generate a strong random secret')
  }
  return secret
}

const JWT_SECRET = getJWTSecret()

export interface AuthenticatedUser {
  userId: string
  email: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: Request | NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Also check cookies for browser requests (via NextRequest cookies or raw header)
  const nextReqCookies = (request as NextRequest).cookies
  if (nextReqCookies && typeof nextReqCookies.get === 'function') {
    const token = nextReqCookies.get('auth-token')?.value
    if (token) return token
  }

  const rawCookie = request.headers.get('cookie')
  if (rawCookie) {
    const match = rawCookie.match(/(?:^|;\s*)auth-token=([^;]+)/)
    if (match) {
      return decodeURIComponent(match[1])
    }
  }

  return null
}

/**
 * Authenticates request against JWT and verifies user existence in the database.
 * Returns AuthenticatedUser with their assigned role, or null if invalid or not found.
 */
export async function authenticateRequest(request: Request | NextRequest): Promise<AuthenticatedUser | null> {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  
  const payload = verifyToken(token)
  if (!payload || !payload.userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    if (!user) {
      return null
    }

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error('Database error in authenticateRequest:', error)
    return null
  }
}

/**
 * Ensures user is authenticated AND holds the privileged ADMIN role.
 */
export async function authenticateAdminRequest(request: Request | NextRequest): Promise<AuthenticatedUser | null> {
  const user = await authenticateRequest(request)
  if (!user || user.role !== 'ADMIN') {
    return null
  }
  return user
}
