'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Berita {
  id: string
  judul: string
  isi: string
  foto?: string
  dipublikasi: boolean
  createdAt: string
}

export default function AdminBeritaPage() {
  const [berita, setBerita] = useState<Berita[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    dipublikasi: true
  })

  useEffect(() => {
    fetchBerita()
  }, [])

  const fetchBerita = async () => {
    try {
      const res = await fetch('/api/admin/berita')
      if (res.ok) {
        const data = await res.json()
        setBerita(data)
      }
    } catch (error) {
      console.error('Error fetching berita:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId ? `/api/admin/berita/${editingId}` : '/api/admin/berita'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchBerita()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving berita:', error)
    }
  }

  const handleEdit = (beritaData: Berita) => {
    setFormData({
      judul: beritaData.judul,
      isi: beritaData.isi,
      dipublikasi: beritaData.dipublikasi
    })
    setEditingId(beritaData.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        const res = await fetch(`/api/admin/berita/${id}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          fetchBerita()
        }
      } catch (error) {
        console.error('Error deleting berita:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      judul: '',
      isi: '',
      dipublikasi: true
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
                Berita & Pengumuman
              </h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Berita
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-6 border border-blue-200 w-full max-w-4xl shadow-2xl rounded-xl bg-white/95 backdrop-blur-lg">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingId ? 'Edit Berita' : 'Tambah Berita'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Judul</label>
                      <input
                        type="text"
                        required
                        value={formData.judul}
                        onChange={(e) => setFormData({...formData, judul: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Isi Berita</label>
                      <textarea
                        required
                        value={formData.isi}
                        onChange={(e) => setFormData({...formData, isi: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        rows={8}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.dipublikasi}
                        onChange={(e) => setFormData({...formData, dipublikasi: e.target.checked})}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Publikasikan berita
                      </label>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        {editingId ? 'Update' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          <div className="mt-6 space-y-4">
            {berita.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg">
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.judul}</h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.isi}</p>
                      <div className="flex items-center mt-4 space-x-4">
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('id-ID')}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.dipublikasi ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.dipublikasi ? 'Dipublikasi' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {berita.length === 0 && (
            <div className="mt-6 text-center py-12">
              <div className="text-gray-500">Belum ada berita</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Tambah Berita Pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}