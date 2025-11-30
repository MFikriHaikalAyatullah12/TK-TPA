import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user?.tpaInfo) {
      return NextResponse.json({ 
        alamat: '',
        telepon: '',
        email: '',
        whatsapp: '',
        jamOperasional: '',
        maps: ''
      })
    }

    return NextResponse.json({
      alamat: user.tpaInfo.alamat || '',
      telepon: user.tpaInfo.telepon || '',
      email: user.tpaInfo.email || '',
      whatsapp: user.tpaInfo.whatsapp || '',
      jamOperasional: user.tpaInfo.jamOperasional || ''
    })
  } catch (error) {
    console.error('Kontak fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user?.tpaInfo) {
      return NextResponse.json({ error: 'TPA info not found' }, { status: 404 })
    }

    const data = await request.json()

    const updatedTpaInfo = await prisma.tpaInfo.update({
      where: { id: user.tpaInfo.id },
      data: {
        alamat: data.alamat,
        telepon: data.telepon,
        email: data.email || null,
        whatsapp: data.whatsapp,
        jamOperasional: data.jamOperasional
      }
    })

    return NextResponse.json(updatedTpaInfo)
  } catch (error) {
    console.error('Kontak update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}