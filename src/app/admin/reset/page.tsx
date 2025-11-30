'use client'

import { useState } from 'react'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminResetPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [message, setMessage] = useState('')
  const [resetType, setResetType] = useState('')

  const handleReset = async (type: string) => {
    if (confirmText !== 'RESET') {
      alert('Silakan ketik "RESET" untuk konfirmasi')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/reset-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type })
      })

      if (res.ok) {
        setMessage('Data berhasil direset!')
        setConfirmText('')
      } else {
        const data = await res.json()
        setMessage('Error: ' + (data.error || 'Reset failed'))
      }
    } catch (error) {
      setMessage('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  const resetOptions = [
    {
      id: 'santri',
      title: 'Reset Data Santri',
      description: 'Menghapus semua data santri',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      id: 'pengajar',
      title: 'Reset Data Pengajar',
      description: 'Menghapus semua data pengajar',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      id: 'berita',
      title: 'Reset Data Berita',
      description: 'Menghapus semua berita',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 'galeri',
      title: 'Reset Data Galeri',
      description: 'Menghapus semua foto di galeri',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: 'jadwal',
      title: 'Reset Data Jadwal',
      description: 'Menghapus semua jadwal kegiatan',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      id: 'prestasi',
      title: 'Reset Data Prestasi',
      description: 'Menghapus semua data prestasi',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'all',
      title: 'Reset Semua Data',
      description: 'Menghapus SEMUA data (kecuali profil TPA)',
      color: 'bg-red-50 border-red-200 text-red-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-5 border-b border-gray-200 flex items-center">
            <Link
              href="/admin"
              className="mr-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Kembali
            </Link>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              Reset Data
            </h1>
          </div>

          {/* Warning */}
          <div className="mt-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Peringatan!
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Fungsi reset akan menghapus data secara permanen dan tidak dapat dikembalikan.
                      Pastikan Anda telah membackup data penting sebelum melakukan reset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-md ${
              message.includes('berhasil') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Reset Options */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resetOptions.map((option) => (
              <div
                key={option.id}
                className={`border-2 rounded-lg p-6 ${option.color}`}
              >
                <h3 className="text-lg font-medium mb-2">{option.title}</h3>
                <p className="text-sm mb-4">{option.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ketik "RESET" untuk konfirmasi:
                    </label>
                    <input
                      type="text"
                      value={resetType === option.id ? confirmText : ''}
                      onChange={(e) => {
                        setResetType(option.id)
                        setConfirmText(e.target.value)
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Ketik RESET"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleReset(option.id)}
                    disabled={isLoading || confirmText !== 'RESET' || resetType !== option.id}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                      option.id === 'all' 
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                        : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                    }`}
                  >
                    {isLoading && resetType === option.id ? 'Memproses...' : `Reset ${option.title.replace('Reset Data ', '').replace('Reset ', '')}`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Petunjuk Penggunaan
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Pilih jenis data yang ingin direset</p>
              <p>2. Ketik "RESET" pada kolom konfirmasi</p>
              <p>3. Klik tombol reset yang sesuai</p>
              <p>4. Data akan terhapus secara permanen</p>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Tips:</strong> Gunakan fitur export data sebelum melakukan reset untuk membuat backup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}