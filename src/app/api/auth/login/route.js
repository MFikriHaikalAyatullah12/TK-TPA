const { NextResponse } = require('next/server')
const { verifyPassword, createJWT } = require('../../../../lib/auth')
const { prisma } = require('../../../../lib/prisma')

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const data = await request.json()

    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isValidPassword = await verifyPassword(data.password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = await createJWT({
      userId: user.id,
      email: user.email
    })

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}