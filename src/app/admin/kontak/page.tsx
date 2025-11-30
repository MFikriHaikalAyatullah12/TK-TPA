'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface KontakInfo {
  alamat: string
  telepon: string
  email: string
  whatsapp: string
  jamOperasional: string
  maps?: string
}

export default function AdminKontakPage() {
  const [kontakInfo, setKontakInfo] = useState<KontakInfo>({
    alamat: '',
    telepon: '',
    email: '',
    whatsapp: '',
    jamOperasional: '',
    maps: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchKontakInfo()
  }, [])

  const fetchKontakInfo = async () => {
    try {
      const res = await fetch('/api/admin/kontak')
      if (res.ok) {
        const data = await res.json()
        setKontakInfo(data)
      }
    } catch (error) {
      console.error('Error fetching kontak info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const res = await fetch('/api/admin/kontak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(kontakInfo)
      })

      if (res.ok) {
        setIsEditing(false)
        alert('Informasi kontak berhasil disimpan!')
      }
    } catch (error) {
      console.error('Error saving kontak info:', error)
      alert('Gagal menyimpan informasi kontak')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6 border-b border-blue-200 flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="mr-4 inline-flex items-center px-4 py-2 border border-blue-200 shadow-lg text-sm leading-4 font-medium rounded-lg text-blue-700 bg-white/80 backdrop-blur-lg hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Kembali
              </Link>
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Informasi Kontak
              </h1>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
            )}
          </div>

          {/* Content */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Alamat</label>
                      <textarea
                        value={kontakInfo.alamat}
                        onChange={(e) => setKontakInfo({...kontakInfo, alamat: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                      <input
                        type="text"
                        value={kontakInfo.telepon}
                        onChange={(e) => setKontakInfo({...kontakInfo, telepon: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={kontakInfo.email}
                        onChange={(e) => setKontakInfo({...kontakInfo, email: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                      <input
                        type="text"
                        value={kontakInfo.whatsapp}
                        onChange={(e) => setKontakInfo({...kontakInfo, whatsapp: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        placeholder="62812345678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Jam Operasional</label>
                      <input
                        type="text"
                        value={kontakInfo.jamOperasional}
                        onChange={(e) => setKontakInfo({...kontakInfo, jamOperasional: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        placeholder="Senin - Jumat: 08:00 - 16:00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Link Google Maps</label>
                      <input
                        type="url"
                        value={kontakInfo.maps || ''}
                        onChange={(e) => setKontakInfo({...kontakInfo, maps: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                      >
                        {isSaving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Alamat</h3>
                      <p className="text-gray-700">{kontakInfo.alamat || 'Belum diatur'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Telepon</h3>
                      <p className="text-gray-700">{kontakInfo.telepon || 'Belum diatur'}</p>
                    </div>
                    {kontakInfo.email && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-700">{kontakInfo.email}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">WhatsApp</h3>
                      <p className="text-gray-700">{kontakInfo.whatsapp || 'Belum diatur'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Jam Operasional</h3>
                      <p className="text-gray-700">{kontakInfo.jamOperasional || 'Belum diatur'}</p>
                    </div>
                    {kontakInfo.maps && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Google Maps</h3>
                        <a href={kontakInfo.maps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Lihat Lokasi</a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}