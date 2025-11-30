import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    const santri = await prisma.santri.findMany({
      where: { tpaInfoId: user.tpaInfo.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(santri)
  } catch (error) {
    console.error('Santri fetch error:', error)
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

    const santri = await prisma.santri.create({
      data: {
        tpaInfoId: user.tpaInfo.id,
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
        targetHafalan: data.alamatEmail || null
      }
    })

    return NextResponse.json(santri, { status: 201 })
  } catch (error) {
    console.error('Santri create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}