import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      nama: formData.get('nama') as string,
      tanggalLahir: formData.get('tanggalLahir') as string,
      tempatLahir: formData.get('tempatLahir') as string,
      jenisKelamin: formData.get('jenisKelamin') as string,
      alamat: formData.get('alamat') as string,
      namaAyah: formData.get('namaAyah') as string,
      namaIbu: formData.get('namaIbu') as string,
      pekerjaanAyah: formData.get('pekerjaanAyah') as string,
      pekerjaanIbu: formData.get('pekerjaanIbu') as string,
      nomorTelepon: formData.get('nomorTelepon') as string,
      pendidikanTerakhir: formData.get('pendidikanTerakhir') as string,
      alamatEmail: formData.get('alamatEmail') as string || null,
      tanggalDaftar: new Date(),
      statusPendaftaran: 'PENDING',
      keterangan: formData.get('keterangan') as string || null,
    };

    // Handle file upload
    const fotoFile = formData.get('foto') as File;
    let fotoUrl = null;

    if (fotoFile && fotoFile.size > 0) {
      // Create uploads directory if it doesn't exist
      const fs = require('fs');
      const path = require('path');
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'santri');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = fotoFile.name.split('.').pop();
      const fileName = `santri_${timestamp}.${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      // Save file
      const bytes = await fotoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);

      fotoUrl = `/uploads/santri/${fileName}`;
    }

    // Find the first admin's TPA to assign this registration to
    // In a multi-admin scenario, you might want to modify this logic
    const firstAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      },
      include: {
        tpaInfo: true
      }
    });

    if (!firstAdmin || !firstAdmin.tpaInfo) {
      return NextResponse.json(
        { error: 'Tidak ada admin TPA yang tersedia' },
        { status: 400 }
      );
    }

    // Create santri record
    const santri = await prisma.santri.create({
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
        kelasSebelumnya: data.pendidikanTerakhir || '',
        targetHafalan: data.alamatEmail || '',
        tpaInfoId: firstAdmin.tpaInfo.id,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil! Data Anda telah tersimpan dan akan segera diproses.',
      data: {
        id: santri.id,
        namaLengkap: santri.namaLengkap,
        status: santri.status
      }
    });

  } catch (error) {
    console.error('Error creating santri:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pendaftaran. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Endpoint untuk pendaftaran santri' });
}