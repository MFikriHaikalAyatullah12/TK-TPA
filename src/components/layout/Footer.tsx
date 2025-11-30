import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-islamic-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-arabic text-xl">ق</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">TK TPA Al-Hidayah</h2>
                <p className="text-gray-300 text-sm">Tempat Pendidikan Al-Quran</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Mendidik generasi Qurani dengan metode pembelajaran modern dan bimbingan ustadz/ustadzah yang berpengalaman.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-gray-300 hover:text-primary-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="#programs" className="text-gray-300 hover:text-primary-400 transition-colors">Program</Link></li>
              <li><Link href="/pendaftaran" className="text-gray-300 hover:text-primary-400 transition-colors">Pendaftaran</Link></li>
              <li><Link href="#gallery" className="text-gray-300 hover:text-primary-400 transition-colors">Galeri</Link></li>
              <li><Link href="#news" className="text-gray-300 hover:text-primary-400 transition-colors">Berita</Link></li>
              <li><Link href="/admin" className="text-gray-300 hover:text-primary-400 transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Jl. Pendidikan No. 123, Jakarta Selatan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@tktpa-alhidayah.com</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Jam Operasional</h4>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Senin - Jumat: 15:00 - 17:00</p>
                <p>Sabtu: 08:00 - 11:00</p>
                <p>Minggu: Libur</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} TK TPA Al-Hidayah. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer