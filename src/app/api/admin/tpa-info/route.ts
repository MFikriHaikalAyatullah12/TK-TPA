import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let tpaInfo
    if (user.tpaInfo) {
      // Update existing TPA info
      tpaInfo = await prisma.tpaInfo.update({
        where: { id: user.tpaInfo.id },
        data: {
          tpaName: data.tpaName,
          logo: data.logo,
          heroImage: data.heroImage,
          sejarah: data.sejarah,
          visi: data.visi,
          misi: data.misi,
          strukturOrganisasi: data.strukturOrganisasi,
          alamat: data.alamat,
          telepon: data.telepon,
          whatsapp: data.whatsapp,
          email: data.email,
          jamOperasional: data.jamOperasional,
          instagram: data.instagram,
          facebook: data.facebook,
          kurikulum: data.kurikulum,
          metodePembelajaran: data.metodePembelajaran
        }
      })
    } else {
      // Create new TPA info
      tpaInfo = await prisma.tpaInfo.create({
        data: {
          userId: user.id,
          tpaName: data.tpaName,
          logo: data.logo,
          heroImage: data.heroImage,
          sejarah: data.sejarah,
          visi: data.visi,
          misi: data.misi,
          strukturOrganisasi: data.strukturOrganisasi,
          alamat: data.alamat,
          telepon: data.telepon,
          whatsapp: data.whatsapp,
          email: data.email,
          jamOperasional: data.jamOperasional,
          instagram: data.instagram,
          facebook: data.facebook,
          kurikulum: data.kurikulum,
          metodePembelajaran: data.metodePembelajaran
        }
      })
    }

    return NextResponse.json({ message: 'TPA info updated successfully', tpaInfo })
  } catch (error) {
    console.error('TPA info update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}