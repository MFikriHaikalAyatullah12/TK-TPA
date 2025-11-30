import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const data = await request.json()

    const jadwal = await prisma.jadwal.update({
      where: { id },
      data: {
        hari: data.hari,
        waktu: data.waktuMulai,
        kegiatan: data.kegiatan,
        tempat: data.tempat || null,
        pengajar: data.pengajar || null
      }
    })

    return NextResponse.json(jadwal)
  } catch (error) {
    console.error('Jadwal update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await prisma.jadwal.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Jadwal deleted successfully' })
  } catch (error) {
    console.error('Jadwal delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}