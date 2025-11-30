'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'

interface HeaderProps {
  onMobileMenuToggle: () => void
  isMobileMenuOpen: boolean
}

const Header = ({ onMobileMenuToggle, isMobileMenuOpen }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Profil', href: '#about', hasDropdown: true },
    { name: 'Program', href: '#programs' },
    { name: 'Pendaftaran', href: '/pendaftaran' },
    { name: 'Jadwal', href: '#schedule' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Berita', href: '#news' },
    { name: 'Kontak', href: '#contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@tkтра-alhidayah.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Jl. Pendidikan No. 123, Jakarta</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg md:top-0' : 'bg-white/95 backdrop-blur-sm md:top-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-arabic text-xl">ق</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-islamic-800">TK TPA Al-Hidayah</h1>
                <p className="text-sm text-islamic-600">Tempat Pendidikan Al-Quran</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-islamic-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/pendaftaran"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Daftar Sekarang
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 text-islamic-700 hover:text-primary-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header