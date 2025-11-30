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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user?.tpaInfo) {
      return NextResponse.json({ error: 'TPA info not found' }, { status: 404 })
    }

    const data = await request.json()

    // Verify the santri belongs to this user's TPA
    const existingSantri = await prisma.santri.findFirst({
      where: {
        id,
        tpaInfoId: user.tpaInfo.id
      }
    })

    if (!existingSantri) {
      return NextResponse.json({ error: 'Santri not found' }, { status: 404 })
    }

    const santri = await prisma.santri.update({
      where: { id },
      data: {
        namaLengkap: data.nama,
        tempatLahir: data.tempatLahir,
        tanggalLahir: new Date(data.tanggalLahir),
        jenisKelamin: data.jenisKelamin,
        alamat: data.alamat,
        namaAyah: data.namaAyah || '',
        namaIbu: data.namaIbu || '',
        pekerjaanAyah: data.pekerjaanAyah || '',
        pekerjaanIbu: data.pekerjaanIbu || '',
        noTelepon: data.nomorTelepon,
        kelasSebelumnya: data.pendidikanTerakhir || null,
        targetHafalan: data.alamatEmail || null,
        status: data.statusPendaftaran
      }
    })

    return NextResponse.json(santri)
  } catch (error) {
    console.error('Santri update error:', error)
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user?.tpaInfo) {
      return NextResponse.json({ error: 'TPA info not found' }, { status: 404 })
    }

    // Verify the santri belongs to this user's TPA
    const existingSantri = await prisma.santri.findFirst({
      where: {
        id,
        tpaInfoId: user.tpaInfo.id
      }
    })

    if (!existingSantri) {
      return NextResponse.json({ error: 'Santri not found' }, { status: 404 })
    }

    await prisma.santri.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Santri deleted successfully' })
  } catch (error) {
    console.error('Santri delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}