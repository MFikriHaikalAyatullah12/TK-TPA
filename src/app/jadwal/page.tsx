'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus
} from 'lucide-react'

export default function JadwalPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Semua Kegiatan', color: 'gray' },
    { id: 'mengaji', label: 'Mengaji Rutin', color: 'primary' },
    { id: 'ujian', label: 'Ujian Kenaikan', color: 'islamic-green' },
    { id: 'phbi', label: 'PHBI', color: 'islamic-gold' },
    { id: 'rihlah', label: 'Rihlah/Outing', color: 'purple' },
    { id: 'wisuda', label: 'Wisuda', color: 'pink' }
  ]

  const jadwalMengaji = [
    { hari: 'Senin', waktu: '15:00-17:00', program: 'Iqra 1-3', ustadz: 'Ust. Ahmad Yusuf', tempat: 'Kelas A', peserta: 25 },
    { hari: 'Selasa', waktu: '15:00-17:00', program: 'Iqra 4-6', ustadz: 'Ustadzah Fatimah', tempat: 'Kelas B', peserta: 22 },
    { hari: 'Rabu', waktu: '15:00-17:00', program: 'Al-Quran', ustadz: 'Ust. Muhammad Ali', tempat: 'Kelas C', peserta: 18 },
    { hari: 'Kamis', waktu: '15:00-17:00', program: 'Tahfidz', ustadz: 'Ustadzah Khadijah', tempat: 'Kelas D', peserta: 15 },
    { hari: 'Jumat', waktu: '15:00-17:00', program: 'Tahsin', ustadz: 'Ust. Abdullah', tempat: 'Kelas A', peserta: 20 },
    { hari: 'Sabtu', waktu: '08:00-11:00', program: 'Program Khusus', ustadz: 'Tim Ustadz', tempat: 'Aula', peserta: 50 }
  ]

  const kegiatan = [
    {
      id: 1,
      tanggal: '2024-12-15',
      waktu: '08:00-11:00',
      judul: 'Ujian Kenaikan Jilid Iqra',
      kategori: 'ujian',
      deskripsi: 'Ujian kenaikan jilid untuk santri Iqra 1-6',
      tempat: 'Semua Kelas',
      peserta: 'Santri Iqra',
      status: 'upcoming'
    },
    {
      id: 2,
      tanggal: '2024-12-20',
      waktu: '07:00-16:00',
      judul: 'Rihlah Santri ke Taman Safari',
      kategori: 'rihlah',
      deskripsi: 'Kegiatan outing untuk refreshing santri',
      tempat: 'Taman Safari Bogor',
      peserta: 'Semua Santri',
      status: 'upcoming'
    },
    {
      id: 3,
      tanggal: '2024-12-25',
      waktu: '19:30-21:00',
      judul: 'Peringatan Maulid Nabi Muhammad SAW',
      kategori: 'phbi',
      deskripsi: 'Acara peringatan Maulid Nabi dengan pembacaan Sholawat',
      tempat: 'Aula Utama',
      peserta: 'Santri + Wali Santri',
      status: 'upcoming'
    },
    {
      id: 4,
      tanggal: '2025-01-10',
      waktu: '08:00-12:00',
      judul: 'Ujian Semester Ganjil',
      kategori: 'ujian',
      deskripsi: 'Ujian akhir semester untuk semua program',
      tempat: 'Semua Kelas',
      peserta: 'Semua Santri',
      status: 'upcoming'
    },
    {
      id: 5,
      tanggal: '2025-01-20',
      waktu: '08:00-15:00',
      judul: 'Wisuda Santri Khatam Al-Quran',
      kategori: 'wisuda',
      deskripsi: 'Wisuda untuk santri yang telah khatam 30 juz',
      tempat: 'Aula Utama',
      peserta: 'Santri Khatam + Keluarga',
      status: 'upcoming'
    }
  ]

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.color || 'gray'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-islamic-green/20 text-islamic-green'
      case 'completed': return 'bg-gray-100 text-gray-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredKegiatan = selectedCategory === 'all' 
    ? kegiatan 
    : kegiatan.filter(k => k.kategori === selectedCategory)

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
              <h1 className="text-xl font-semibold text-gray-900">Jadwal & Kalender</h1>
              <p className="text-sm text-gray-600">Jadwal kegiatan TK TPA Al-Hidayah</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Hari Mengaji</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-islamic-green/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-islamic-green" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">150</div>
                <div className="text-sm text-gray-600">Total Santri</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-islamic-gold/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-islamic-gold" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Kegiatan Bulan Ini</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Jam/Minggu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Jadwal Mengaji Rutin */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Jadwal Mengaji Rutin</h2>
            <p className="text-gray-600 mt-1">Jadwal pembelajaran harian di TK TPA Al-Hidayah</p>
          </div>
          <div className="p-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {jadwalMengaji.map((jadwal, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{jadwal.hari}</h3>
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                      {jadwal.peserta} santri
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {jadwal.waktu}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {jadwal.tempat}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {jadwal.ustadz}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="bg-islamic-green/20 text-islamic-green px-3 py-1 rounded-full text-sm font-medium">
                      {jadwal.program}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter & Kalender Kegiatan */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Kalender Kegiatan</h2>
                <p className="text-gray-600 mt-1">Agenda dan kegiatan khusus TPQ</p>
              </div>
              
              {/* Filter Category */}
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah Kegiatan</span>
              </button>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredKegiatan.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          getCategoryColor(event.kategori) === 'primary' ? 'bg-primary-500' :
                          getCategoryColor(event.kategori) === 'islamic-green' ? 'bg-islamic-green' :
                          getCategoryColor(event.kategori) === 'islamic-gold' ? 'bg-islamic-gold' :
                          getCategoryColor(event.kategori) === 'purple' ? 'bg-purple-500' :
                          getCategoryColor(event.kategori) === 'pink' ? 'bg-pink-500' : 'bg-gray-500'
                        }`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{event.judul}</h4>
                          <p className="text-gray-600 text-sm mt-1">{event.deskripsi}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(event.tanggal).toLocaleDateString('id-ID', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.waktu}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.tempat}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.peserta}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status === 'upcoming' ? 'Akan Datang' :
                         event.status === 'ongoing' ? 'Berlangsung' : 'Selesai'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getCategoryColor(event.kategori) === 'primary' ? 'bg-primary-100 text-primary-800' :
                        getCategoryColor(event.kategori) === 'islamic-green' ? 'bg-islamic-green/20 text-islamic-green' :
                        getCategoryColor(event.kategori) === 'islamic-gold' ? 'bg-islamic-gold/20 text-yellow-800' :
                        getCategoryColor(event.kategori) === 'purple' ? 'bg-purple-100 text-purple-800' :
                        getCategoryColor(event.kategori) === 'pink' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === event.kategori)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredKegiatan.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Kegiatan</h3>
                <p className="text-gray-600">Tidak ada kegiatan untuk kategori yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}