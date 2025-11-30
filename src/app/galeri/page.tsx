'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Camera, 
  Play, 
  Eye, 
  Download, 
  Share2,
  Filter,
  Grid3X3,
  List,
  Search,
  Heart,
  Calendar
} from 'lucide-react'

export default function GaleriPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<any>(null)

  const categories = [
    { id: 'all', label: 'Semua Media', count: 45 },
    { id: 'kegiatan', label: 'Kegiatan Harian', count: 18 },
    { id: 'phbi', label: 'Peringatan PHBI', count: 12 },
    { id: 'rihlah', label: 'Rihlah/Outing', count: 8 },
    { id: 'wisuda', label: 'Wisuda Santri', count: 7 }
  ]

  const galeriData = [
    {
      id: 1,
      type: 'image',
      title: 'Pembelajaran Iqra Kelas A',
      description: 'Suasana pembelajaran Iqra di kelas A dengan Ustadz Ahmad',
      url: '/placeholder-classroom.jpg',
      thumbnail: '/placeholder-classroom-thumb.jpg',
      category: 'kegiatan',
      date: '2024-11-25',
      likes: 24,
      downloads: 5
    },
    {
      id: 2,
      type: 'video',
      title: 'Hafalan Surat Al-Fatihah',
      description: 'Video santri menghafal Surat Al-Fatihah dengan fasih',
      url: '/placeholder-video.mp4',
      thumbnail: '/placeholder-video-thumb.jpg',
      category: 'kegiatan',
      date: '2024-11-24',
      duration: '3:45',
      likes: 31,
      downloads: 8
    },
    {
      id: 3,
      type: 'image',
      title: 'Peringatan Maulid Nabi Muhammad SAW',
      description: 'Acara peringatan Maulid Nabi dengan pembacaan Sholawat',
      url: '/placeholder-maulid.jpg',
      thumbnail: '/placeholder-maulid-thumb.jpg',
      category: 'phbi',
      date: '2024-11-20',
      likes: 42,
      downloads: 12
    },
    {
      id: 4,
      type: 'image',
      title: 'Rihlah ke Taman Safari',
      description: 'Kegiatan outing santri ke Taman Safari Bogor',
      url: '/placeholder-safari.jpg',
      thumbnail: '/placeholder-safari-thumb.jpg',
      category: 'rihlah',
      date: '2024-11-15',
      likes: 38,
      downloads: 15
    },
    {
      id: 5,
      type: 'video',
      title: 'Tahfidz Juz 30 - Ahmad Rizky',
      description: 'Santri Ahmad Rizky menghafal Juz 30 dengan lancar',
      url: '/placeholder-tahfidz.mp4',
      thumbnail: '/placeholder-tahfidz-thumb.jpg',
      category: 'kegiatan',
      date: '2024-11-12',
      duration: '8:20',
      likes: 56,
      downloads: 22
    },
    {
      id: 6,
      type: 'image',
      title: 'Wisuda Santri Khatam Al-Quran',
      description: 'Momen kebahagiaan wisuda santri yang telah khatam 30 juz',
      url: '/placeholder-wisuda.jpg',
      thumbnail: '/placeholder-wisuda-thumb.jpg',
      category: 'wisuda',
      date: '2024-11-10',
      likes: 67,
      downloads: 28
    },
    {
      id: 7,
      type: 'image',
      title: 'Pembelajaran Tahsin',
      description: 'Sesi pembelajaran tahsin dengan fokus pada makhraj huruf',
      url: '/placeholder-tahsin.jpg',
      thumbnail: '/placeholder-tahsin-thumb.jpg',
      category: 'kegiatan',
      date: '2024-11-08',
      likes: 19,
      downloads: 4
    },
    {
      id: 8,
      type: 'video',
      title: 'Lomba Qiroah Tingkat Provinsi',
      description: 'Aisyah Putri meraih juara 1 lomba qiroah tingkat provinsi',
      url: '/placeholder-qiroah.mp4',
      thumbnail: '/placeholder-qiroah-thumb.jpg',
      category: 'kegiatan',
      date: '2024-11-05',
      duration: '5:15',
      likes: 73,
      downloads: 34
    }
  ]

  const filteredData = galeriData
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const MediaModal = ({ media, onClose }: { media: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{media.title}</h3>
              <p className="text-gray-600 mt-1">{media.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            {media.type === 'image' ? (
              <img 
                src={media.url} 
                alt={media.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <video 
                controls 
                className="w-full h-96 rounded-lg"
                poster={media.thumbnail}
              >
                <source src={media.url} type="video/mp4" />
              </video>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(media.date).toLocaleDateString('id-ID')}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {media.likes} suka
              </span>
              <span className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {media.downloads} unduh
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Unduh</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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
              <h1 className="text-xl font-semibold text-gray-900">Galeri Foto & Video</h1>
              <p className="text-sm text-gray-600">Dokumentasi kegiatan TK TPA Al-Hidayah</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">32</div>
                <div className="text-sm text-gray-600">Total Foto</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-islamic-green/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-islamic-green" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">13</div>
                <div className="text-sm text-gray-600">Total Video</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-islamic-gold/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-islamic-gold" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">2.5k</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">347</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari foto atau video..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.count})
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'} transition-colors`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'} transition-colors`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((item) => (
                  <div 
                    key={item.id} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 rounded-full p-3">
                            <Play className="w-6 h-6 text-gray-900" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                            {item.duration}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                        <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {item.likes}
                          </span>
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {item.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredData.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {item.likes} suka
                        </span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {item.downloads} unduh
                        </span>
                        {item.type === 'video' && (
                          <span>{item.duration}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-primary-100 text-primary-600 p-2 rounded-lg hover:bg-primary-200 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Media</h3>
                <p className="text-gray-600">Tidak ada foto atau video untuk kategori yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Media Modal */}
      {selectedMedia && (
        <MediaModal 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}
    </div>
  )
}