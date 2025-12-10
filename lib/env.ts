/**
 * Environment Variable Validation
 * Ensures all required environment variables are set before the app starts
 */

const requiredEnvVars = [
  'JWT_SECRET',
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
] as const

const optionalEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'NODE_ENV',
  'NEXT_PUBLIC_SITE_URL',
] as const

/**
 * Validates that all required environment variables are set
 * Throws an error if any are missing
 */
export function validateEnv() {
  const missing: string[] = []
  const warnings: string[] = []

  // Check required variables
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })

  // Check for weak/default values
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.includes('change-in-production')) {
    warnings.push('JWT_SECRET appears to be using a default value. Please use a strong random secret.')
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET should be at least 32 characters long for security.')
  }

  // Report missing variables
  if (missing.length > 0) {
    const errorMessage = `
╔════════════════════════════════════════════════════════════╗
║  MISSING REQUIRED ENVIRONMENT VARIABLES                    ║
╚════════════════════════════════════════════════════════════╝

The following environment variables are required but not set:

${missing.map(v => `  ❌ ${v}`).join('\n')}

Please create a .env.local file with these variables.
See .env.local.example for reference.

`
    throw new Error(errorMessage)
  }

  // Report warnings
  if (warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('\n⚠️  ENVIRONMENT WARNINGS:\n')
    warnings.forEach(warning => console.warn(`  ⚠️  ${warning}`))
    console.warn('')
  }

  // Success message in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Environment variables validated successfully')
  }
}

/**
 * Get environment variable with type safety
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key]
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value || defaultValue || ''
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}
