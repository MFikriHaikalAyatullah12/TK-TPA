const { NextResponse } = require('next/server')
const { hashPassword } = require('../../../../lib/auth')
const { prisma } = require('../../../../lib/prisma')

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const data = await request.json()

    if (!data.email || !data.password || !data.namaSekolah) {
      return NextResponse.json(
        { error: 'Email, password, and nama sekolah are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(data.password)

    // Create user and TPA info in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.namaSekolah
        }
      })

      const tpaInfo = await tx.tpaInfo.create({
        data: {
          namaSekolah: data.namaSekolah,
          alamat: data.alamat || '',
          nomorTelepon: data.nomorTelepon || '',
          email: data.email,
          deskripsi: data.deskripsi || '',
          userId: user.id
        }
      })

      return { user, tpaInfo }
    })

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}