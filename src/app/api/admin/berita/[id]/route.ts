import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const berita = await prisma.berita.update({
      where: { id: params.id },
      data: {
        judul: data.judul,
        konten: data.isi || data.konten,
        ...(data.gambar && { gambar: data.gambar }),
        kategori: data.kategori || 'umum'
      }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Berita update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await prisma.berita.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Berita deleted successfully' })
  } catch (error) {
    console.error('Berita delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}