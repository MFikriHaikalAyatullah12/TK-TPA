const { NextResponse } = require('next/server')

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' })
    
    response.cookies.delete('admin-token')
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}