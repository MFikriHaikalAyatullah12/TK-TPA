'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PhotoIcon,
  NewspaperIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface TpaInfo {
  id: string
  tpaName?: string
  logo?: string
  heroImage?: string
  sejarah?: string
  visi?: string
  misi?: string
  alamat?: string
  telepon?: string
  whatsapp?: string
  email?: string
  jamOperasional?: string
  instagram?: string
  facebook?: string
  pengajar: any[]
  santri: any[]
  berita: any[]
  galeri: any[]
  jadwal: any[]
  prestasi: any[]
}

export default function HomePage() {
  const [tpaInfo, setTpaInfo] = useState<TpaInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTpaInfo()
  }, [])

  const fetchTpaInfo = async () => {
    try {
      const res = await fetch('/api/public/tpa-info')
      if (res.ok) {
        const data = await res.json()
        setTpaInfo(data)
      }
    } catch (error) {
      console.error('Error fetching TPA info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600 mx-auto absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  if (!tpaInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AcademicCapIcon className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">TPA Belum Dikonfigurasi</h1>
          <p className="text-gray-600 mb-6">Silakan login sebagai admin untuk mengatur informasi TPA dan mulai mengelola website Anda.</p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Login Admin
            </Link>
            <Link
              href="/auth/register"
              className="block w-full px-4 py-2 border border-green-600 shadow-sm text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors"
            >
              Daftar Admin Baru
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {tpaInfo.logo && (
                <Image 
                  src={tpaInfo.logo} 
                  alt={tpaInfo.tpaName || 'TPA'} 
                  width={32} 
                  height={32}
                  className="rounded-lg shadow-sm"
                />
              )}
              <span className="ml-3 text-xl font-semibold text-gray-800">
                {tpaInfo.tpaName || 'TPA'}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#beranda" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Beranda</a>
              <a href="#profil" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Profil</a>
              <a href="#pendaftaran" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pendaftaran</a>
              <a href="#kontak" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Kontak</a>
              <Link
                href="/santri"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Portal Santri
              </Link>
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md font-medium"
              >
                Admin
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-blue-600 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Selamat Datang di <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {tpaInfo.tpaName || 'TPA'}
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Membentuk generasi Qurani dengan pembelajaran yang berkualitas dan metode yang tepat
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#pendaftaran"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center font-medium"
                >
                  Daftar Sekarang
                </a>
                <a
                  href="#profil"
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-center font-medium"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
            <div className="relative">
              {tpaInfo.heroImage ? (
                <div className="flex justify-center">
                  <Image
                    src={tpaInfo.heroImage}
                    alt="TPA"
                    width={500}
                    height={350}
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-12 text-center shadow-xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <AcademicCapIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Pendidikan Berkualitas</h3>
                  <p className="text-gray-600">Untuk Generasi Islami</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{tpaInfo.santri.length}</p>
              <p className="text-gray-600 text-sm">Santri Aktif</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{tpaInfo.pengajar.length}</p>
              <p className="text-gray-600 text-sm">Ustaz/Ustazah</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <CalendarDaysIcon className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{tpaInfo.jadwal.length}</p>
              <p className="text-gray-600 text-sm">Program Belajar</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{tpaInfo.prestasi?.length || 0}</p>
              <p className="text-gray-600 text-sm">Prestasi</p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="profil" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {tpaInfo.sejarah && (
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <ClockIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sejarah</h3>
                <p className="text-gray-600 leading-relaxed">{tpaInfo.sejarah}</p>
              </div>
            )}
            {tpaInfo.visi && (
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Visi</h3>
                <p className="text-gray-600 leading-relaxed">{tpaInfo.visi}</p>
              </div>
            )}
            {tpaInfo.misi && (
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Misi</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{tpaInfo.misi}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="pendaftaran" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pendaftaran Santri Baru</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Daftarkan putra-putri Anda untuk belajar Al-Quran dengan metode yang tepat dan lingkungan yang kondusif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pendaftaran"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/santri"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Portal Santri
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <Link href="/kurikulum" className="group bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:bg-blue-50">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <AcademicCapIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors">Kurikulum</h3>
            </Link>
            <Link href="/jadwal" className="group bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:bg-green-50">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CalendarDaysIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-green-600 transition-colors">Jadwal</h3>
            </Link>
            <Link href="/galeri" className="group bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:bg-purple-50">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <PhotoIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-purple-600 transition-colors">Galeri</h3>
            </Link>
            <Link href="/berita" className="group bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:bg-red-50">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <NewspaperIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-center group-hover:text-red-600 transition-colors">Berita</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kontak Kami</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {tpaInfo.alamat && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Alamat</h3>
                <p className="text-gray-600 leading-relaxed">{tpaInfo.alamat}</p>
              </div>
            )}
            {(tpaInfo.telepon || tpaInfo.whatsapp) && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Kontak</h3>
                {tpaInfo.telepon && <p className="text-gray-600 mb-2">Tel: {tpaInfo.telepon}</p>}
                {tpaInfo.whatsapp && (
                  <a 
                    href={`https://wa.me/${tpaInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
                  >
                    WhatsApp: {tpaInfo.whatsapp}
                  </a>
                )}
              </div>
            )}
            {tpaInfo.jamOperasional && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Jam Operasional</h3>
                <p className="text-gray-600 leading-relaxed">{tpaInfo.jamOperasional}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              {tpaInfo.logo && (
                <Image 
                  src={tpaInfo.logo} 
                  alt={tpaInfo.tpaName || 'TPA'} 
                  width={48} 
                  height={48}
                  className="rounded-lg shadow-lg mx-auto mb-4"
                />
              )}
              <h3 className="text-2xl font-bold mb-2">{tpaInfo.tpaName || 'TPA'}</h3>
              <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                Membentuk generasi Qurani yang berakhlak mulia dengan pendidikan berkualitas
              </p>
            </div>
            
            {(tpaInfo.instagram || tpaInfo.facebook || tpaInfo.whatsapp) && (
              <div className="flex justify-center space-x-6 mb-8">
                {tpaInfo.instagram && (
                  <a 
                    href={tpaInfo.instagram.startsWith('http') ? tpaInfo.instagram : `https://instagram.com/${tpaInfo.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="sr-only">Instagram</span>
                    IG
                  </a>
                )}
                {tpaInfo.facebook && (
                  <a 
                    href={tpaInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="sr-only">Facebook</span>
                    FB
                  </a>
                )}
                {tpaInfo.whatsapp && (
                  <a 
                    href={`https://wa.me/${tpaInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="sr-only">WhatsApp</span>
                    WA
                  </a>
                )}
              </div>
            )}
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} {tpaInfo.tpaName || 'TPA'}. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}