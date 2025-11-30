'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  CalendarIcon,
  PhotoIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  StarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalSantri: 0,
    totalPengajar: 0,
    totalBerita: 0,
    totalGaleri: 0
  })
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
    fetchStats()
  }, [])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/admin/profile')
      if (res.ok) {
        const userData = await res.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const statsData = await res.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: true },
    { name: 'Profil TPA', href: '/admin/profile', icon: AcademicCapIcon },
    { name: 'Data Santri', href: '/admin/santri', icon: UserGroupIcon },
    { name: 'Data Pengajar', href: '/admin/pengajar', icon: UserGroupIcon },
    { name: 'Jadwal', href: '/admin/jadwal', icon: CalendarIcon },
    { name: 'Galeri', href: '/admin/galeri', icon: PhotoIcon },
    { name: 'Berita', href: '/admin/berita', icon: NewspaperIcon },
    { name: 'Prestasi', href: '/admin/prestasi', icon: StarIcon },
    { name: 'Kontak & Sosmed', href: '/admin/kontak', icon: PhoneIcon },
    { name: 'Export Data', href: '/admin/export', icon: DocumentArrowDownIcon },
    { name: 'Reset Data', href: '/admin/reset', icon: Cog6ToothIcon },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-lg shadow-xl border-r border-blue-100">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h1 className="text-xl font-bold text-white">Admin TPA</h1>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 shadow-sm'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page header */}
            <div className="pb-5 border-b border-blue-200">
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Dashboard Admin
              </h1>
            </div>

            {/* Stats */}
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white/90 backdrop-blur-lg overflow-hidden shadow-xl rounded-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                        <UserGroupIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-600 truncate">
                            Total Santri
                          </dt>
                          <dd className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                            {stats.totalSantri}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-lg overflow-hidden shadow-xl rounded-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                        <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-600 truncate">
                            Total Pengajar
                          </dt>
                          <dd className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                            {stats.totalPengajar}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-lg overflow-hidden shadow-xl rounded-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                        <NewspaperIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-600 truncate">
                            Total Berita
                          </dt>
                          <dd className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                            {stats.totalBerita}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-lg overflow-hidden shadow-xl rounded-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                        <PhotoIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-600 truncate">
                            Total Galeri
                          </dt>
                          <dd className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                            {stats.totalGaleri}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="mt-8">
              <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-xl border border-blue-100">
                <div className="px-6 py-6 sm:p-8">
                  <h3 className="text-xl leading-6 font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
                    Menu Cepat
                  </h3>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    <Link
                      href="/admin/profile"
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-100"
                    >
                      <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg inline-block mb-3">
                        <AcademicCapIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-semibold text-green-900">Edit Profil TPA</p>
                    </Link>
                    <Link
                      href="/admin/santri"
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-100"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg inline-block mb-3">
                        <UserGroupIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-blue-900">Kelola Santri</p>
                    </Link>
                    <Link
                      href="/admin/galeri"
                      className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-100"
                    >
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg inline-block mb-3">
                        <PhotoIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-semibold text-purple-900">Upload Foto</p>
                    </Link>
                    <Link
                      href="/admin/export"
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 shadow-lg hover:shadow-xl border border-yellow-100"
                    >
                      <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg inline-block mb-3">
                        <DocumentArrowDownIcon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <p className="text-sm font-semibold text-yellow-900">Export Data</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}