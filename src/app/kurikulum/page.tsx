'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  BookOpen, 
  Star, 
  Clock, 
  Users,
  Target,
  CheckCircle
} from 'lucide-react'

export default function KurikulumPage() {
  const [activeProgram, setActiveProgram] = useState('iqra')

  const programs = [
    { id: 'iqra', label: 'Iqra 1-6', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'alquran', label: 'Al-Quran', icon: <Star className="w-5 h-5" /> },
    { id: 'tahfidz', label: 'Tahfidz', icon: <Target className="w-5 h-5" /> },
    { id: 'tahsin', label: 'Tahsin', icon: <CheckCircle className="w-5 h-5" /> }
  ]

  const metodePembelajaran = [
    {
      nama: 'Metode Ummi',
      deskripsi: 'Metode pembelajaran Al-Quran yang mudah, menyenangkan, dan menyentuh hati',
      ciri: ['Pembelajaran bertahap', 'Fokus pada makhraj dan tajwid', 'Evaluasi berkala']
    },
    {
      nama: 'Metode Baghdadiyah', 
      deskripsi: 'Metode klasik yang terbukti efektif dalam pembelajaran membaca Al-Quran',
      ciri: ['Dimulai dari huruf hijaiyah', 'Pembelajaran sistematis', 'Penguatan dasar']
    },
    {
      nama: 'Metode Tilawati',
      deskripsi: 'Metode modern dengan pendekatan lagu dan irama dalam pembelajaran',
      ciri: ['Pembelajaran dengan irama', 'Mudah diingat', 'Menyenangkan']
    }
  ]

  const jadwalKegiatan = [
    { hari: 'Senin', waktu: '15:00-17:00', kegiatan: 'Iqra 1-3', ustadz: 'Ust. Ahmad' },
    { hari: 'Selasa', waktu: '15:00-17:00', kegiatan: 'Iqra 4-6', ustadz: 'Ustadzah Fatimah' },
    { hari: 'Rabu', waktu: '15:00-17:00', kegiatan: 'Al-Quran', ustadz: 'Ust. Muhammad' },
    { hari: 'Kamis', waktu: '15:00-17:00', kegiatan: 'Tahfidz', ustadz: 'Ustadzah Khadijah' },
    { hari: 'Jumat', waktu: '15:00-17:00', kegiatan: 'Tahsin & Adab', ustadz: 'Ust. Ali' },
    { hari: 'Sabtu', waktu: '08:00-11:00', kegiatan: 'Program Khusus', ustadz: 'Tim Ustadz' }
  ]

  const materiAdab = [
    'Adab masuk masjid',
    'Adab berwudhu',
    'Adab makan dan minum',
    'Adab kepada orang tua',
    'Adab bergaul dengan teman',
    'Adab dalam berbicara',
    'Doa-doa harian',
    'Sifat-sifat terpuji'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Kurikulum & Program</h1>
              <p className="text-sm text-gray-600">Program pembelajaran TK TPA Al-Hidayah</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Program Pembelajaran Lengkap</h2>
          <p className="text-primary-100 text-lg mb-6">
            Kurikulum terintegrasi yang menggabungkan pembelajaran Al-Quran, tahfidz, dan pembinaan akhlak
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-primary-200 text-sm">Program Utama</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">6</div>
              <div className="text-primary-200 text-sm">Jenjang Iqra</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-primary-200 text-sm">Metode Pembelajaran</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">30</div>
              <div className="text-primary-200 text-sm">Juz dalam Program</div>
            </div>
          </div>
        </div>

        {/* Program Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveProgram(program.id)}
                  className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                    activeProgram === program.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {program.icon}
                  <span>{program.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Program Iqra */}
            {activeProgram === 'iqra' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Program Iqra 1-6</h3>
                <p className="text-gray-700 text-lg">
                  Program dasar pembelajaran membaca Al-Quran dengan metode bertahap dan sistematis.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">١</span>
                    </div>
                    <h4 className="font-semibold text-primary-900 mb-2">Iqra 1</h4>
                    <p className="text-primary-700 text-sm mb-3">Pengenalan huruf hijaiyah dan harakat dasar</p>
                    <ul className="text-primary-600 text-sm space-y-1">
                      <li>• Huruf alif - ya'</li>
                      <li>• Fathah, kasrah, dammah</li>
                      <li>• Membaca huruf sambung</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-islamic-green/10 to-islamic-green/20 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-islamic-green rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">٢</span>
                    </div>
                    <h4 className="font-semibold text-islamic-800 mb-2">Iqra 2</h4>
                    <p className="text-islamic-700 text-sm mb-3">Pengenalan sukun dan bacaan panjang</p>
                    <ul className="text-islamic-600 text-sm space-y-1">
                      <li>• Huruf sukun</li>
                      <li>• Mad thobi'i</li>
                      <li>• Latihan membaca</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-islamic-gold/10 to-islamic-gold/20 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-islamic-gold rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">٣</span>
                    </div>
                    <h4 className="font-semibold text-yellow-900 mb-2">Iqra 3</h4>
                    <p className="text-yellow-800 text-sm mb-3">Pengenalan tanwin dan bacaan-bacaan dasar</p>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Tanwin fathah, kasrah, dammah</li>
                      <li>• Huruf syamsiah & qamariah</li>
                      <li>• Bacaan nun sukun</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">٤</span>
                    </div>
                    <h4 className="font-semibold text-purple-900 mb-2">Iqra 4</h4>
                    <p className="text-purple-700 text-sm mb-3">Pendalaman hukum bacaan dan tajwid</p>
                    <ul className="text-purple-600 text-sm space-y-1">
                      <li>• Qalqalah</li>
                      <li>• Idgham</li>
                      <li>• Ikhfa</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">٥</span>
                    </div>
                    <h4 className="font-semibold text-pink-900 mb-2">Iqra 5</h4>
                    <p className="text-pink-700 text-sm mb-3">Waqaf, ibtida', dan bacaan mad</p>
                    <ul className="text-pink-600 text-sm space-y-1">
                      <li>• Tanda waqaf</li>
                      <li>• Mad wajib muttashil</li>
                      <li>• Mad jaiz munfashil</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">٦</span>
                    </div>
                    <h4 className="font-semibold text-indigo-900 mb-2">Iqra 6</h4>
                    <p className="text-indigo-700 text-sm mb-3">Persiapan membaca Al-Quran</p>
                    <ul className="text-indigo-600 text-sm space-y-1">
                      <li>• Bacaan gharib</li>
                      <li>• Latihan membaca mushaf</li>
                      <li>• Evaluasi kemampuan</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Program Al-Quran */}
            {activeProgram === 'alquran' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Program Al-Quran</h3>
                <p className="text-gray-700 text-lg">
                  Program lanjutan untuk santri yang sudah lulus Iqra 6 dan siap membaca Al-Quran.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Juz yang Dipelajari</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Array.from({length: 30}, (_, i) => (
                        <div key={i} className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-center">
                          <div className="font-medium text-primary-800">Juz {i + 1}</div>
                          <div className="text-sm text-primary-600">
                            {i < 10 ? 'Tingkat Dasar' : i < 20 ? 'Tingkat Menengah' : 'Tingkat Lanjut'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Fokus Pembelajaran</h4>
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Kelancaran Bacaan</h5>
                        <p className="text-gray-600 text-sm">Meningkatkan kemampuan membaca Al-Quran dengan lancar dan benar</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Tajwid</h5>
                        <p className="text-gray-600 text-sm">Memperdalam ilmu tajwid dan penerapannya dalam bacaan</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Pemahaman Makna</h5>
                        <p className="text-gray-600 text-sm">Pengenalan arti dan makna ayat-ayat Al-Quran</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Adab Tilawah</h5>
                        <p className="text-gray-600 text-sm">Pembelajaran etika dan adab dalam membaca Al-Quran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Program Tahfidz */}
            {activeProgram === 'tahfidz' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Program Tahfidz</h3>
                <p className="text-gray-700 text-lg">
                  Program menghafal Al-Quran dengan metode yang terbukti efektif dan bimbingan intensif.
                </p>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Target Hafalan</h4>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-islamic-green to-islamic-green/80 text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">Juz 30 (Juz Amma)</h5>
                            <p className="text-islamic-green/20 text-sm">Target: 6 bulan</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">37</div>
                            <div className="text-xs">Surah</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">Juz 29 + Juz 1</h5>
                            <p className="text-primary-200 text-sm">Target: 1 tahun</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-xs">Juz</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-islamic-gold to-yellow-500 text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">5 Juz Pertama</h5>
                            <p className="text-yellow-100 text-sm">Target: 2 tahun</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">5</div>
                            <div className="text-xs">Juz</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">10 Juz (Sepertiga Al-Quran)</h5>
                            <p className="text-purple-200 text-sm">Target: 3-4 tahun</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">10</div>
                            <div className="text-xs">Juz</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Metode Tahfidz</h4>
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Talqin</h5>
                        <p className="text-gray-600 text-sm">Ustadz membacakan ayat, santri menirukan</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Takrir</h5>
                        <p className="text-gray-600 text-sm">Mengulang hafalan yang sudah dikuasai</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Tasmi'</h5>
                        <p className="text-gray-600 text-sm">Santri menyetorkan hafalan kepada ustadz</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">Muroja'ah</h5>
                        <p className="text-gray-600 text-sm">Mengulang seluruh hafalan secara berkala</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Program Tahsin */}
            {activeProgram === 'tahsin' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Program Tahsin</h3>
                <p className="text-gray-700 text-lg">
                  Program perbaikan bacaan Al-Quran dengan fokus pada makhraj, sifat huruf, dan kaidah tajwid.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Fokus Pembelajaran</h4>
                    <div className="space-y-4">
                      <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
                        <h5 className="font-medium text-primary-900 mb-2">Makhraj Huruf</h5>
                        <p className="text-primary-700 text-sm">Memperbaiki tempat keluarnya huruf sesuai kaidah yang benar</p>
                      </div>
                      <div className="bg-islamic-green/10 border-l-4 border-islamic-green p-4">
                        <h5 className="font-medium text-islamic-800 mb-2">Sifat Huruf</h5>
                        <p className="text-islamic-700 text-sm">Memahami dan menerapkan sifat-sifat huruf hijaiyah</p>
                      </div>
                      <div className="bg-islamic-gold/10 border-l-4 border-islamic-gold p-4">
                        <h5 className="font-medium text-yellow-900 mb-2">Hukum Tajwid</h5>
                        <p className="text-yellow-800 text-sm">Mendalami dan menerapkan hukum-hukum tajwid</p>
                      </div>
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                        <h5 className="font-medium text-purple-900 mb-2">Lagu & Irama</h5>
                        <p className="text-purple-700 text-sm">Pembelajaran nagham dan variasi lagu tilawah</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Tingkatan Tahsin</h4>
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">Tahsin Dasar</h5>
                            <p className="text-gray-600 text-sm">Perbaikan makhraj dan sifat huruf</p>
                          </div>
                          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">Level 1</span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">Tahsin Menengah</h5>
                            <p className="text-gray-600 text-sm">Pendalaman hukum tajwid</p>
                          </div>
                          <span className="bg-islamic-green/20 text-islamic-green px-2 py-1 rounded text-xs">Level 2</span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">Tahsin Lanjut</h5>
                            <p className="text-gray-600 text-sm">Pengembangan lagu dan variasi</p>
                          </div>
                          <span className="bg-islamic-gold/20 text-yellow-800 px-2 py-1 rounded text-xs">Level 3</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Sertifikasi</h5>
                      <p className="text-gray-700 text-sm">
                        Santri yang menyelesaikan program tahsin akan mendapat sertifikat 
                        yang diakui oleh lembaga dan dapat melanjutkan ke program tahfidz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metode Pembelajaran */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Metode Pembelajaran</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {metodePembelajaran.map((metode, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-3">{metode.nama}</h4>
                <p className="text-gray-600 text-sm mb-4">{metode.deskripsi}</p>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Ciri Khas:</h5>
                  <ul className="space-y-1">
                    {metode.ciri.map((ciri, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 text-islamic-green mr-2 flex-shrink-0" />
                        {ciri}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Kegiatan */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Jadwal Kegiatan TPQ</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Hari</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Waktu</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Kegiatan</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Pengajar</th>
                </tr>
              </thead>
              <tbody>
                {jadwalKegiatan.map((jadwal, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{jadwal.hari}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {jadwal.waktu}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                        {jadwal.kegiatan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {jadwal.ustadz}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Materi Adab Islami */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Materi Adab Islami</h3>
          <p className="text-gray-700 mb-6">
            Selain pembelajaran Al-Quran, santri juga diajarkan adab-adab islami untuk membentuk karakter yang baik.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {materiAdab.map((materi, index) => (
              <div key={index} className="bg-gradient-to-br from-islamic-green/10 to-islamic-green/5 border border-islamic-green/20 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-islamic-green mx-auto mb-3" />
                <span className="font-medium text-islamic-800 text-sm">{materi}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}