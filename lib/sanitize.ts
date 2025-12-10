/**
 * Input Sanitization Utilities
 * Prevents XSS and injection attacks
 */

/**
 * Sanitize HTML string to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return ''
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email) return ''
  
  // Remove any characters that aren't valid in email addresses
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._+-]/g, '')
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return ''
  
  // Keep only numbers, spaces, +, -, (, )
  return phone.trim().replace(/[^0-9+\-() ]/g, '')
}

/**
 * Sanitize general text input
 */
export function sanitizeText(text: string, maxLength: number = 1000): string {
  if (!text) return ''
  
  return sanitizeHtml(text.trim().slice(0, maxLength))
}

/**
 * Sanitize number input
 */
export function sanitizeNumber(value: any): number {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return ''
  
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return ''
    }
    return parsed.toString()
  } catch {
    return ''
  }
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return ''
  
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .slice(0, 255)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format (international)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Rate limiting helper - simple in-memory store
 * For production, use Redis or a proper rate limiting service
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}

/**
 * Clean up old rate limit records periodically
 */
setInterval(() => {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key)
    }
  })
  
  keysToDelete.forEach(key => rateLimitStore.delete(key))
}, 60000) // Clean up every minute
