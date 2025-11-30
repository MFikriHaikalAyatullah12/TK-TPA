'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Jadwal {
  id: string
  hari: string
  waktuMulai: string
  waktuSelesai: string
  kegiatan: string
  keterangan?: string
  createdAt: string
}

export default function AdminJadwalPage() {
  const [jadwal, setJadwal] = useState<Jadwal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    hari: 'Senin',
    waktuMulai: '',
    waktuSelesai: '',
    kegiatan: '',
    keterangan: ''
  })

  useEffect(() => {
    fetchJadwal()
  }, [])

  const fetchJadwal = async () => {
    try {
      const res = await fetch('/api/admin/jadwal')
      if (res.ok) {
        const data = await res.json()
        setJadwal(data)
      }
    } catch (error) {
      console.error('Error fetching jadwal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId ? `/api/admin/jadwal/${editingId}` : '/api/admin/jadwal'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchJadwal()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving jadwal:', error)
    }
  }

  const handleEdit = (jadwalData: Jadwal) => {
    setFormData({
      hari: jadwalData.hari,
      waktuMulai: jadwalData.waktuMulai,
      waktuSelesai: jadwalData.waktuSelesai,
      kegiatan: jadwalData.kegiatan,
      keterangan: jadwalData.keterangan || ''
    })
    setEditingId(jadwalData.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        const res = await fetch(`/api/admin/jadwal/${id}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          fetchJadwal()
        }
      } catch (error) {
        console.error('Error deleting jadwal:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      hari: 'Senin',
      waktuMulai: '',
      waktuSelesai: '',
      kegiatan: '',
      keterangan: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

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
                Jadwal Kegiatan
              </h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Jadwal
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-6 border border-blue-200 w-full max-w-2xl shadow-2xl rounded-xl bg-white/95 backdrop-blur-lg">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingId ? 'Edit Jadwal' : 'Tambah Jadwal'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hari</label>
                      <select
                        value={formData.hari}
                        onChange={(e) => setFormData({...formData, hari: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      >
                        {hariOptions.map(hari => (
                          <option key={hari} value={hari}>{hari}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Waktu Mulai</label>
                        <input
                          type="time"
                          required
                          value={formData.waktuMulai}
                          onChange={(e) => setFormData({...formData, waktuMulai: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Waktu Selesai</label>
                        <input
                          type="time"
                          required
                          value={formData.waktuSelesai}
                          onChange={(e) => setFormData({...formData, waktuSelesai: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Kegiatan</label>
                      <input
                        type="text"
                        required
                        value={formData.kegiatan}
                        onChange={(e) => setFormData({...formData, kegiatan: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                      <textarea
                        value={formData.keterangan}
                        onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        rows={3}
                      />
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

          {/* Table */}
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hari
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waktu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kegiatan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Keterangan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jadwal.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.hari}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.waktuMulai} - {item.waktuSelesai}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.kegiatan}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.keterangan || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {jadwal.length === 0 && (
            <div className="mt-6 text-center py-12">
              <div className="text-gray-500">Belum ada jadwal kegiatan</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Tambah Jadwal Pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}