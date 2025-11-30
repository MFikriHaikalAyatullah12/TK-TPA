import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

    const pengajar = await prisma.pengajar.update({
      where: { id },
      data: {
        nama: data.nama,
        bidang: data.jabatan || data.bidang,
        pengalaman: data.pengalaman || null,
        sertifikasi: data.sertifikasi || null,
        jadwal: data.jadwal || null
      }
    })

    return NextResponse.json(pengajar)
  } catch (error) {
    console.error('Pengajar update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await prisma.pengajar.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Pengajar deleted successfully' })
  } catch (error) {
    console.error('Pengajar delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}