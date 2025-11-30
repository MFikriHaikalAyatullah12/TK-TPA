import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '../../../../lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

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

    const data = await request.formData()
    const file = data.get('file') as File
    const type = data.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory already exists
    }

    // Generate unique filename
    const filename = `${type}_${Date.now()}_${file.name}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    const url = `/uploads/${filename}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}