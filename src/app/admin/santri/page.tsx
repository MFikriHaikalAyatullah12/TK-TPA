'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, PlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import * as XLSX from 'xlsx'

interface Santri {
  id: string
  nama: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  alamat: string
  namaAyah: string
  namaIbu: string
  pekerjaanAyah: string
  pekerjaanIbu: string
  nomorTelepon: string
  pendidikanTerakhir?: string
  alamatEmail?: string
  statusPendaftaran: string
  keterangan?: string
  foto?: string
  createdAt: string
}

export default function AdminSantriPage() {
  const [santri, setSantri] = useState<Santri[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki',
    alamat: '',
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    nomorTelepon: '',
    pendidikanTerakhir: '',
    alamatEmail: '',
    statusPendaftaran: 'DITERIMA',
    keterangan: ''
  })

  useEffect(() => {
    fetchSantri()
  }, [])

  const fetchSantri = async () => {
    try {
      const res = await fetch('/api/admin/santri')
      if (res.ok) {
        const data = await res.json()
        setSantri(data)
      }
    } catch (error) {
      console.error('Error fetching santri:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId ? `/api/admin/santri/${editingId}` : '/api/admin/santri'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchSantri()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving santri:', error)
    }
  }

  const handleEdit = (santriData: Santri) => {
    setFormData({
      nama: santriData.nama,
      tempatLahir: santriData.tempatLahir,
      tanggalLahir: santriData.tanggalLahir.split('T')[0],
      jenisKelamin: santriData.jenisKelamin,
      alamat: santriData.alamat,
      namaAyah: santriData.namaAyah,
      namaIbu: santriData.namaIbu,
      pekerjaanAyah: santriData.pekerjaanAyah,
      pekerjaanIbu: santriData.pekerjaanIbu,
      nomorTelepon: santriData.nomorTelepon,
      pendidikanTerakhir: santriData.pendidikanTerakhir || '',
      alamatEmail: santriData.alamatEmail || '',
      statusPendaftaran: santriData.statusPendaftaran,
      keterangan: santriData.keterangan || ''
    })
    setEditingId(santriData.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data santri ini?')) {
      try {
        const res = await fetch(`/api/admin/santri/${id}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          fetchSantri()
        }
      } catch (error) {
        console.error('Error deleting santri:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: 'Laki-laki',
      alamat: '',
      namaAyah: '',
      namaIbu: '',
      pekerjaanAyah: '',
      pekerjaanIbu: '',
      nomorTelepon: '',
      pendidikanTerakhir: '',
      alamatEmail: '',
      statusPendaftaran: 'DITERIMA',
      keterangan: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  const exportToExcel = () => {
    const exportData = santri.map(s => ({
      'Nama': s.nama,
      'Tempat Lahir': s.tempatLahir,
      'Tanggal Lahir': new Date(s.tanggalLahir).toLocaleDateString('id-ID'),
      'Jenis Kelamin': s.jenisKelamin,
      'Alamat': s.alamat,
      'Nama Ayah': s.namaAyah,
      'Nama Ibu': s.namaIbu,
      'Pekerjaan Ayah': s.pekerjaanAyah,
      'Pekerjaan Ibu': s.pekerjaanIbu,
      'Nomor Telepon': s.nomorTelepon,
      'Pendidikan Terakhir': s.pendidikanTerakhir || '',
      'Email': s.alamatEmail || '',
      'Status Pendaftaran': s.statusPendaftaran,
      'Keterangan': s.keterangan || '',
      'Tanggal Daftar': new Date(s.createdAt).toLocaleDateString('id-ID')
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data Santri')
    
    const fileName = `data-santri-${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, fileName)
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
                className="mr-4 inline-flex items-center px-4 py-2 border border-blue-200 shadow-sm text-sm leading-4 font-medium rounded-lg text-blue-700 bg-white/80 backdrop-blur-lg hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Kembali
              </Link>
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Data Santri
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportToExcel}
                className="inline-flex items-center px-4 py-2 border border-blue-200 shadow-lg text-sm font-medium rounded-lg text-blue-700 bg-white/80 backdrop-blur-lg hover:bg-blue-50 transition-all duration-200"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Export Excel
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Tambah Santri
              </button>
            </div>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingId ? 'Edit Santri' : 'Tambah Santri'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={formData.nama}
                          onChange={(e) => setFormData({...formData, nama: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                        <input
                          type="text"
                          required
                          value={formData.tempatLahir}
                          onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input
                          type="date"
                          required
                          value={formData.tanggalLahir}
                          onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                        <select
                          value={formData.jenisKelamin}
                          onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea
                          required
                          value={formData.alamat}
                          onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Ayah</label>
                        <input
                          type="text"
                          value={formData.namaAyah}
                          onChange={(e) => setFormData({...formData, namaAyah: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                        <input
                          type="text"
                          value={formData.namaIbu}
                          onChange={(e) => setFormData({...formData, namaIbu: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pekerjaan Ayah</label>
                        <input
                          type="text"
                          value={formData.pekerjaanAyah}
                          onChange={(e) => setFormData({...formData, pekerjaanAyah: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pekerjaan Ibu</label>
                        <input
                          type="text"
                          value={formData.pekerjaanIbu}
                          onChange={(e) => setFormData({...formData, pekerjaanIbu: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                        <input
                          type="text"
                          required
                          value={formData.nomorTelepon}
                          onChange={(e) => setFormData({...formData, nomorTelepon: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pendidikan Terakhir</label>
                        <input
                          type="text"
                          value={formData.pendidikanTerakhir}
                          onChange={(e) => setFormData({...formData, pendidikanTerakhir: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={formData.alamatEmail}
                          onChange={(e) => setFormData({...formData, alamatEmail: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status Pendaftaran</label>
                        <select
                          value={formData.statusPendaftaran}
                          onChange={(e) => setFormData({...formData, statusPendaftaran: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="DITERIMA">Diterima</option>
                          <option value="DITOLAK">Ditolak</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                        <textarea
                          value={formData.keterangan}
                          onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm px-3 py-2 border"
                          rows={2}
                        />
                      </div>
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
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TTL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orang Tua
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kontak
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {santri.map((s) => (
                      <tr key={s.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{s.nama}</div>
                          <div className="text-sm text-gray-500">{s.jenisKelamin}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {s.tempatLahir}, {new Date(s.tanggalLahir).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Ayah: {s.namaAyah}</div>
                          <div className="text-sm text-gray-500">Ibu: {s.namaIbu}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{s.nomorTelepon}</div>
                          <div className="text-sm text-gray-500">{s.alamatEmail || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            s.statusPendaftaran === 'DITERIMA' ? 'bg-green-100 text-green-800' :
                            s.statusPendaftaran === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {s.statusPendaftaran === 'DITERIMA' ? 'Diterima' : 
                             s.statusPendaftaran === 'PENDING' ? 'Pending' : 'Ditolak'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(s)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
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

          {santri.length === 0 && (
            <div className="mt-6 text-center py-12">
              <div className="text-gray-500">Belum ada data santri</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Tambah Santri Pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}