-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TpaInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tpaName" TEXT,
    "logo" TEXT,
    "heroImage" TEXT,
    "sejarah" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "strukturOrganisasi" TEXT,
    "alamat" TEXT,
    "telepon" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "jamOperasional" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "kurikulum" TEXT,
    "metodePembelajaran" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TpaInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengajar" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "bidang" TEXT,
    "pengalaman" TEXT,
    "sertifikasi" TEXT,
    "jadwal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengajar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Santri" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "kelasSebelumnya" TEXT,
    "targetHafalan" TEXT,
    "jilid" TEXT NOT NULL DEFAULT 'Iqra 1',
    "hafalan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Santri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "kategori" TEXT NOT NULL DEFAULT 'umum',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galeri" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "gambar" TEXT NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'kegiatan',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "kegiatan" TEXT NOT NULL,
    "hari" TEXT NOT NULL,
    "waktu" TEXT NOT NULL,
    "tempat" TEXT,
    "pengajar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestasi" (
    "id" TEXT NOT NULL,
    "tpaInfoId" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prestasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TpaInfo_userId_key" ON "TpaInfo"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TpaInfo" ADD CONSTRAINT "TpaInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengajar" ADD CONSTRAINT "Pengajar_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Santri" ADD CONSTRAINT "Santri_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Galeri" ADD CONSTRAINT "Galeri_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestasi" ADD CONSTRAINT "Prestasi_tpaInfoId_fkey" FOREIGN KEY ("tpaInfoId") REFERENCES "TpaInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
