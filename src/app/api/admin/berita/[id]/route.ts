import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
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

    if (!params?.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const berita = await prisma.berita.findUnique({
      where: { id: params.id },
      include: {
        tpaInfo: true
      }
    })

    if (!berita) {
      return NextResponse.json({ error: 'Berita not found' }, { status: 404 })
    }

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Berita get error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    if (!params?.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const data = await request.json()

    if (!data.judul) {
      return NextResponse.json({ error: 'Judul is required' }, { status: 400 })
    }

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
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Berita not found' }, { status: 404 })
    }
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

    if (!params?.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.berita.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Berita deleted successfully' })
  } catch (error) {
    console.error('Berita delete error:', error)
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Berita not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}