'use client'

import Link from 'next/link'
import { X, Home, User, BookOpen, Calendar, Camera, Newspaper, Phone } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigation = [
    { name: 'Beranda', href: '#home', icon: Home },
    { name: 'Profil', href: '#about', icon: User },
    { name: 'Program', href: '#programs', icon: BookOpen },
    { name: 'Pendaftaran', href: '/pendaftaran', icon: User },
    { name: 'Jadwal', href: '#schedule', icon: Calendar },
    { name: 'Galeri', href: '#gallery', icon: Camera },
    { name: 'Berita', href: '#news', icon: Newspaper },
    { name: 'Kontak', href: '#contact', icon: Phone },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-islamic-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-islamic-600 hover:text-islamic-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-6 py-3 text-islamic-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="p-4 border-t">
            <Link
              href="/pendaftaran"
              onClick={onClose}
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu