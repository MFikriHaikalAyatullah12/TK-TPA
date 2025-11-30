'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  GraduationCap, 
  Calendar, 
  Camera, 
  Users, 
  Newspaper, 
  BookOpen, 
  CreditCard, 
  MapPin, 
  MessageSquare,
  Settings,
  LogOut,
  Home
} from 'lucide-react'

interface MenuItemProps {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}

const MenuItem = ({ href, icon, title, description }: MenuItemProps) => (
  <Link href={href} className="block group">
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300 shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-lg mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </Link>
)

export default function DashboardPage() {
  const menuItems = [
    {
      href: '/profil',
      icon: <User className="w-6 h-6" />,
      title: 'Profil TPA',
      description: 'Sejarah, visi misi, struktur organisasi'
    },
    {
      href: '/pendaftaran',
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Pendaftaran Santri',
      description: 'Daftar santri baru secara online'
    },
    {
      href: '/kurikulum',
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Kurikulum & Program',
      description: 'Materi pembelajaran dan jenjang'
    },
    {
      href: '/jadwal',
      icon: <Calendar className="w-6 h-6" />,
      title: 'Jadwal & Kalender',
      description: 'Jadwal mengaji dan kegiatan TPA'
    },
    {
      href: '/galeri',
      icon: <Camera className="w-6 h-6" />,
      title: 'Galeri',
      description: 'Foto dan video kegiatan santri'
    },
    {
      href: '/pengajar',
      icon: <Users className="w-6 h-6" />,
      title: 'Informasi Pengajar',
      description: 'Profil ustadz dan ustadzah'
    },
    {
      href: '/berita',
      icon: <Newspaper className="w-6 h-6" />,
      title: 'Berita & Artikel',
      description: 'Berita terkini dan artikel islami'
    },
    {
      href: '/hafalan',
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Tracking Hafalan',
      description: 'Monitoring kemajuan hafalan santri'
    },
    {
      href: '/pembayaran',
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pembayaran & Donasi',
      description: 'SPP dan donasi online'
    },
    {
      href: '/kontak',
      icon: <MapPin className="w-6 h-6" />,
      title: 'Kontak & Lokasi',
      description: 'Informasi kontak dan lokasi TPA'
    },
    {
      href: '/testimoni',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Testimoni',
      description: 'Testimoni orang tua dan alumni'
    },
    {
      href: '/admin',
      icon: <Settings className="w-6 h-6" />,
      title: 'Admin Panel',
      description: 'Manajemen data dan konten'
    }
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">TK TPA Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Beranda</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Selamat Datang, Admin!</h2>
          <p className="text-gray-600 text-lg">Kelola semua aspek TK TPA dengan mudah melalui dashboard ini.</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              href={item.href}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Statistik Singkat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">150</div>
              <div className="text-sm text-gray-600">Total Santri</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
              <div className="text-sm text-gray-600">Ustadz/Ustadzah</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">8</div>
              <div className="text-sm text-gray-600">Program</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">95%</div>
              <div className="text-sm text-gray-600">Kepuasan</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}