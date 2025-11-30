'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Galeri {
  id: string
  judul: string
  deskripsi?: string
  foto: string
  createdAt: string
}

export default function AdminGaleriPage() {
  const [galeri, setGaleri] = useState<Galeri[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: ''
  })

  useEffect(() => {
    fetchGaleri()
  }, [])

  const fetchGaleri = async () => {
    try {
      const res = await fetch('/api/admin/galeri')
      if (res.ok) {
        const data = await res.json()
        setGaleri(data)
      }
    } catch (error) {
      console.error('Error fetching galeri:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      judul: '',
      deskripsi: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Galeri
              </h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Foto
            </button>
          </div>

          {/* Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galeri.map((item) => (
                <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                  {item.foto && (
                    <img
                      className="w-full h-48 object-cover"
                      src={item.foto}
                      alt={item.judul}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{item.judul}</h3>
                    {item.deskripsi && (
                      <p className="text-sm text-gray-500 mt-1">{item.deskripsi}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-sm text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {galeri.length === 0 && (
            <div className="mt-6 text-center py-12">
              <div className="text-gray-500">Belum ada foto di galeri</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Tambah Foto Pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}