import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    const { type } = await request.json()

    switch (type) {
      case 'santri':
        await prisma.santri.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'pengajar':
        await prisma.pengajar.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'berita':
        await prisma.berita.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'galeri':
        await prisma.galeri.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'jadwal':
        await prisma.jadwal.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'prestasi':
        await prisma.prestasi.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      case 'all':
        await prisma.santri.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        await prisma.pengajar.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        await prisma.berita.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        await prisma.galeri.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        await prisma.jadwal.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        await prisma.prestasi.deleteMany({
          where: { tpaInfoId: user.tpaInfo.id }
        })
        break
      
      default:
        return NextResponse.json({ error: 'Invalid reset type' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Data reset successfully' })
  } catch (error) {
    console.error('Reset error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}