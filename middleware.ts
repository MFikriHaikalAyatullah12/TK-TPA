import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Import dari lib di root
const { verifyJWT } = require('./lib/auth')

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      const token = request.cookies.get('admin-token')?.value

      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      const payload = await verifyJWT(token)
      if (!payload) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}