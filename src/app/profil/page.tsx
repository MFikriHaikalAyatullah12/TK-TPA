'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Award, Target, History } from 'lucide-react'

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('sejarah')

  const tabs = [
    { id: 'sejarah', label: 'Sejarah', icon: <History className="w-5 h-5" /> },
    { id: 'visi-misi', label: 'Visi & Misi', icon: <Target className="w-5 h-5" /> },
    { id: 'struktur', label: 'Struktur Organisasi', icon: <Users className="w-5 h-5" /> },
    { id: 'prestasi', label: 'Prestasi', icon: <Award className="w-5 h-5" /> },
  ]

  const strukturOrganisasi = [
    { jabatan: 'Kepala TPA', nama: 'H. Ahmad Yusuf, S.Pd.I', foto: '/placeholder-male.jpg' },
    { jabatan: 'Sekretaris', nama: 'Hj. Fatimah Zahra, S.Ag', foto: '/placeholder-female.jpg' },
    { jabatan: 'Bendahara', nama: 'Ust. Muhammad Ali, S.E', foto: '/placeholder-male.jpg' },
    { jabatan: 'Koordinator Pengajaran', nama: 'Ustadzah Khadijah, S.Pd.I', foto: '/placeholder-female.jpg' },
  ]

  const prestasi = [
    { tahun: '2024', juara: 'Juara 1 Lomba Tahfidz Tingkat Kecamatan', peserta: 'Ahmad Rizky' },
    { tahun: '2024', juara: 'Juara 2 Lomba Adzan Tingkat Kabupaten', peserta: 'Muhammad Farid' },
    { tahun: '2023', juara: 'Juara 1 Lomba Qiroah Tingkat Provinsi', peserta: 'Aisyah Putri' },
    { tahun: '2023', juara: 'Juara 3 Lomba Kaligrafi Islam', peserta: 'Zahra Amelia' },
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
              <h1 className="text-xl font-semibold text-gray-900">Profil TPA</h1>
              <p className="text-sm text-gray-600">Informasi lengkap tentang TK TPA Al-Hidayah</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-arabic">ق</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">TK TPA Al-Hidayah</h2>
              <p className="text-primary-100 text-lg">Tempat Pendidikan Al-Quran Terdepan</p>
              <p className="text-primary-200 mt-2">Berdiri sejak 1995 • 150+ Santri Aktif</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Sejarah */}
            {activeTab === 'sejarah' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sejarah TK TPA Al-Hidayah</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src="/placeholder-mosque.jpg" 
                      alt="Gedung TPA" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary-900 mb-2">1995 - Pendirian</h4>
                      <p className="text-primary-700 text-sm">
                        TK TPA Al-Hidayah didirikan oleh KH. Abdul Rahman dengan visi membentuk generasi Qurani.
                      </p>
                    </div>
                    <div className="bg-islamic-green/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-islamic-800 mb-2">2010 - Pengembangan</h4>
                      <p className="text-islamic-700 text-sm">
                        Pembangunan gedung baru dan penambahan program tahfidz untuk santri.
                      </p>
                    </div>
                    <div className="bg-islamic-gold/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">2020 - Digitalisasi</h4>
                      <p className="text-yellow-800 text-sm">
                        Implementasi sistem digital untuk tracking pembelajaran dan administrasi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    TK TPA Al-Hidayah berdiri pada tahun 1995 atas prakarsa KH. Abdul Rahman bersama para tokoh masyarakat 
                    setempat yang memiliki visi untuk menciptakan generasi Islami yang berakhlak mulia dan cinta Al-Quran.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Berawal dari sebuah musholla kecil dengan 20 santri, kini TK TPA Al-Hidayah telah berkembang menjadi 
                    lembaga pendidikan Al-Quran terpercaya dengan 150+ santri aktif dan tenaga pengajar yang berkualitas.
                  </p>
                </div>
              </div>
            )}

            {/* Visi & Misi */}
            {activeTab === 'visi-misi' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Visi & Misi</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary-900 mb-4 flex items-center">
                        <Target className="w-6 h-6 mr-2" />
                        Visi
                      </h4>
                      <p className="text-primary-800 leading-relaxed">
                        "Menjadi lembaga pendidikan Al-Quran terdepan yang menghasilkan generasi Islami 
                        yang berakhlak mulia, hafal Al-Quran, dan mampu mengamalkannya dalam kehidupan sehari-hari."
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-islamic-green/10 to-islamic-green/20 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-islamic-800 mb-4">Misi</h4>
                      <ul className="text-islamic-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-islamic-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Menyelenggarakan pendidikan Al-Quran dengan metode pembelajaran yang efektif dan menyenangkan
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-islamic-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Membina akhlak santri sesuai dengan ajaran Islam
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-islamic-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Mengembangkan program tahfidz untuk membentuk generasi penghafal Al-Quran
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-islamic-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Memberikan pelayanan pendidikan terbaik kepada masyarakat
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Nilai-nilai */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Nilai-nilai Kami</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">إ</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">Ikhlas</h5>
                      <p className="text-sm text-gray-600">Mengabdi dengan hati yang ikhlas</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-islamic-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-islamic-green font-bold">ص</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">Sabar</h5>
                      <p className="text-sm text-gray-600">Sabar dalam mendidik</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-islamic-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-yellow-700 font-bold">ع</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">Amanah</h5>
                      <p className="text-sm text-gray-600">Menjalankan tugas dengan amanah</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-purple-600 font-bold">ت</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">Tawadhu</h5>
                      <p className="text-sm text-gray-600">Rendah hati dalam berinteraksi</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Struktur Organisasi */}
            {activeTab === 'struktur' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Struktur Organisasi</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {strukturOrganisasi.map((person, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                          <img 
                            src={person.foto} 
                            alt={person.nama}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{person.nama}</h4>
                          <p className="text-primary-600 font-medium">{person.jabatan}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bagan Organisasi */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Bagan Organisasi</h4>
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg mb-4">
                        Kepala TPA
                      </div>
                      <div className="flex justify-center space-x-8 mt-4">
                        <div className="text-center">
                          <div className="bg-islamic-green text-white px-4 py-2 rounded-lg mb-2">
                            Sekretaris
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-islamic-gold text-white px-4 py-2 rounded-lg mb-2">
                            Bendahara
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-2">
                            Koordinator Pengajaran
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Prestasi */}
            {activeTab === 'prestasi' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Prestasi Santri</h3>
                
                <div className="space-y-4">
                  {prestasi.map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-white to-primary-50 border border-primary-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.juara}</h4>
                            <p className="text-primary-600 font-medium">{item.peserta}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.tahun}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statistik Prestasi */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Statistik Prestasi</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-islamic-gold mb-1">15</div>
                      <div className="text-sm text-gray-600">Juara 1</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-500 mb-1">12</div>
                      <div className="text-sm text-gray-600">Juara 2</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">8</div>
                      <div className="text-sm text-gray-600">Juara 3</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-1">35</div>
                      <div className="text-sm text-gray-600">Total Prestasi</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}