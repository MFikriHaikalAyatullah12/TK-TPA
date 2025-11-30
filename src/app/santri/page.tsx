'use client'

import { useState, useEffect } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface TpaInfo {
  tpaName: string
  alamat: string
  telepon: string
  email?: string
  deskripsi?: string
  visi?: string
  misi?: string
  whatsapp?: string
}

interface PengajarSummary {
  id: string
  nama: string
  jabatan: string
}

interface BeritaSummary {
  id: string
  judul: string
  isi: string
  createdAt: string
}

interface JadwalSummary {
  id: string
  hari: string
  waktuMulai: string
  waktuSelesai: string
  kegiatan: string
}

export default function SantriDashboard() {
  const [tpaInfo, setTpaInfo] = useState<TpaInfo | null>(null)
  const [pengajar, setPengajar] = useState<PengajarSummary[]>([])
  const [berita, setBerita] = useState<BeritaSummary[]>([])
  const [jadwal, setJadwal] = useState<JadwalSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch TPA Info
      const tpaRes = await fetch('/api/public/tpa-info')
      if (tpaRes.ok) {
        const tpaData = await tpaRes.json()
        setTpaInfo(tpaData)
      }

      // Fetch Pengajar Summary (only first 3)
      const pengajarRes = await fetch('/api/public/pengajar?limit=3')
      if (pengajarRes.ok) {
        const pengajarData = await pengajarRes.json()
        setPengajar(pengajarData)
      }

      // Fetch Latest News (only first 3)
      const beritaRes = await fetch('/api/public/berita?limit=3')
      if (beritaRes.ok) {
        const beritaData = await beritaRes.json()
        setBerita(beritaData)
      }

      // Fetch Schedule
      const jadwalRes = await fetch('/api/public/jadwal')
      if (jadwalRes.ok) {
        const jadwalData = await jadwalRes.json()
        setJadwal(jadwalData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">{tpaInfo?.tpaName || 'TPA'}</h1>
                <p className="text-sm text-gray-500">Portal Santri</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/pendaftaran"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                Daftar Santri
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Beranda
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Selamat Datang</h2>
              <p className="text-gray-600">
                {tpaInfo?.deskripsi || 'Selamat datang di portal santri TPA. Di sini Anda dapat melihat informasi terkini tentang kegiatan, jadwal, dan pengumuman.'} 
              </p>
            </div>

            {/* Latest News */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Berita & Pengumuman Terbaru</h3>
              </div>
              <div className="p-6">
                {berita.length > 0 ? (
                  <div className="space-y-4">
                    {berita.map((item) => (
                      <div key={item.id} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-gray-900">{item.judul}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.isi.substring(0, 150)}...
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(item.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Belum ada berita terbaru</p>
                )}
              </div>
            </div>

            {/* Teachers */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Pengajar</h3>
              </div>
              <div className="p-6">
                {pengajar.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {pengajar.map((teacher) => (
                      <div key={teacher.id} className="text-center p-4 rounded-lg bg-gray-50">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-600 font-medium text-lg">
                            {teacher.nama.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900">{teacher.nama}</h4>
                        <p className="text-sm text-gray-600">{teacher.jabatan}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Belum ada data pengajar</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Schedule */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Jadwal Kegiatan</h3>
              </div>
              <div className="p-6">
                {jadwal.length > 0 ? (
                  <div className="space-y-3">
                    {jadwal.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.kegiatan}</p>
                          <p className="text-sm text-gray-600">{item.hari}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {item.waktuMulai} - {item.waktuSelesai}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Belum ada jadwal</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Kontak</h3>
              </div>
              <div className="p-6 space-y-4">
                {tpaInfo?.alamat && (
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{tpaInfo.alamat}</p>
                  </div>
                )}
                {tpaInfo?.telepon && (
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{tpaInfo.telepon}</p>
                  </div>
                )}
                {tpaInfo?.email && (
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{tpaInfo.email}</p>
                  </div>
                )}
                {tpaInfo?.whatsapp && (
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/${tpaInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Menu Cepat</h3>
              </div>
              <div className="p-6 space-y-2">
                <Link
                  href="/santri/jadwal"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Jadwal Lengkap
                </Link>
                <Link
                  href="/santri/berita"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Semua Berita
                </Link>
                <Link
                  href="/santri/pengajar"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Daftar Pengajar
                </Link>
                <Link
                  href="/santri/galeri"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Galeri Foto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}