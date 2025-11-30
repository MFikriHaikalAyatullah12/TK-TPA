import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
      return NextResponse.json({ error: 'TPA info not found' }, { status: 404 })
    }

    const berita = await prisma.berita.findMany({
      where: { tpaInfoId: user.tpaInfo.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Berita fetch error:', error)
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

    const berita = await prisma.berita.create({
      data: {
        tpaInfoId: user.tpaInfo.id,
        judul: data.judul,
        konten: data.isi
      }
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('Berita create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}