'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminProfilePage() {
  const [tpaInfo, setTpaInfo] = useState({
    tpaName: '',
    logo: '',
    heroImage: '',
    sejarah: '',
    visi: '',
    misi: '',
    strukturOrganisasi: '',
    alamat: '',
    telepon: '',
    whatsapp: '',
    email: '',
    jamOperasional: '',
    instagram: '',
    facebook: '',
    kurikulum: '',
    metodePembelajaran: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTpaInfo()
  }, [])

  const fetchTpaInfo = async () => {
    try {
      const res = await fetch('/api/admin/profile')
      if (res.ok) {
        const data = await res.json()
        if (data.tpaInfo) {
          setTpaInfo(data.tpaInfo)
        }
      }
    } catch (error) {
      console.error('Error fetching TPA info:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/tpa-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tpaInfo)
      })

      if (res.ok) {
        setMessage('Informasi TPA berhasil diperbarui!')
      } else {
        setMessage('Gagal memperbarui informasi')
      }
    } catch (error) {
      setMessage('Error: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'heroImage') => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    try {
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        setTpaInfo({...tpaInfo, [type]: data.url})
      }
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6 border-b border-blue-200 flex items-center">
            <Link
              href="/admin"
              className="mr-4 inline-flex items-center px-4 py-2 border border-blue-200 shadow-lg text-sm leading-4 font-medium rounded-lg text-blue-700 bg-white/80 backdrop-blur-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Kembali
            </Link>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Profil TPA
            </h1>
          </div>

          {/* Form */}
          <div className="mt-8">
            <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-xl border border-blue-100">
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {message && (
                  <div className={`p-4 rounded-md ${
                    message.includes('berhasil') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama TPA
                    </label>
                    <input
                      type="text"
                      value={tpaInfo.tpaName || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, tpaName: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="Masukkan nama TPA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email TPA
                    </label>
                    <input
                      type="email"
                      value={tpaInfo.email || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, email: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="email@tpa.com"
                    />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Logo TPA
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    {tpaInfo.logo && (
                      <img src={tpaInfo.logo} alt="Logo" className="h-16 w-16 object-cover rounded-md" />
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Hero Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Foto Utama TPA
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    {tpaInfo.heroImage && (
                      <img src={tpaInfo.heroImage} alt="Hero" className="h-20 w-32 object-cover rounded-md" />
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'heroImage')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telepon
                    </label>
                    <input
                      type="text"
                      value={tpaInfo.telepon || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, telepon: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="0812-3456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={tpaInfo.whatsapp || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, whatsapp: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="62812345678901"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 62 + nomor tanpa 0 (contoh: 62812345678901)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alamat
                  </label>
                  <textarea
                    value={tpaInfo.alamat || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, alamat: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Alamat lengkap TPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Jam Operasional
                  </label>
                  <input
                    type="text"
                    value={tpaInfo.jamOperasional || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, jamOperasional: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Senin-Jumat: 15:00-17:00, Sabtu: 08:00-10:00"
                  />
                </div>

                {/* Social Media */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={tpaInfo.instagram || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, instagram: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="@tpa_username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={tpaInfo.facebook || ''}
                      onChange={(e) => setTpaInfo({...tpaInfo, facebook: e.target.value})}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      placeholder="https://facebook.com/tpa"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sejarah TPA
                  </label>
                  <textarea
                    value={tpaInfo.sejarah || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, sejarah: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Ceritakan sejarah berdirinya TPA..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Visi
                  </label>
                  <textarea
                    value={tpaInfo.visi || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, visi: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Visi TPA..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Misi
                  </label>
                  <textarea
                    value={tpaInfo.misi || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, misi: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Misi TPA... (pisahkan dengan enter untuk setiap poin)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Struktur Organisasi
                  </label>
                  <textarea
                    value={tpaInfo.strukturOrganisasi || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, strukturOrganisasi: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Ketua: Nama
Sekretaris: Nama
Bendahara: Nama"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kurikulum
                  </label>
                  <textarea
                    value={tpaInfo.kurikulum || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, kurikulum: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Deskripsi kurikulum yang digunakan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Metode Pembelajaran
                  </label>
                  <textarea
                    value={tpaInfo.metodePembelajaran || ''}
                    onChange={(e) => setTpaInfo({...tpaInfo, metodePembelajaran: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                    placeholder="Metode yang digunakan: Ummi, Baghdadiyah, dll..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}