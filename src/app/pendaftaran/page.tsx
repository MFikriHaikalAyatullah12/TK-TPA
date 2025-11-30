'use client'

import { useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PendaftaranPage() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki',
    alamat: '',
    namaAyah: '',
    namaIbu: '',
    pekerjaanAyah: '',
    pekerjaanIbu: '',
    noTelepon: '',
    kelasSebelumnya: '',
    targetHafalan: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/public/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setMessage('Pendaftaran berhasil! Data Anda telah tersimpan dan akan segera diproses oleh admin.')
        setIsSuccess(true)
        setFormData({
          namaLengkap: '',
          tempatLahir: '',
          tanggalLahir: '',
          jenisKelamin: 'Laki-laki',
          alamat: '',
          namaAyah: '',
          namaIbu: '',
          pekerjaanAyah: '',
          pekerjaanIbu: '',
          noTelepon: '',
          kelasSebelumnya: '',
          targetHafalan: ''
        })
      } else {
        const errorData = await res.json()
        setMessage(errorData.error || 'Terjadi kesalahan saat mendaftar')
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Terjadi kesalahan jaringan. Silakan coba lagi.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pendaftaran Santri Baru
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Daftarkan putra-putri Anda untuk bergabung dengan TK TPA kami. 
            Isi formulir di bawah ini dengan lengkap dan benar.
          </p>
        </div>

        {message && (
          <div className={`mb-8 p-6 rounded-xl ${isSuccess 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
          }`}>
            <div className={`flex items-center space-x-3 ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
              <div className={`w-5 h-5 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="font-medium">{message}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Formulir Pendaftaran</h2>
            <p className="text-blue-100 mt-2">Silakan lengkapi data calon santri dengan benar</p>
          </div>
          
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">Data Santri</h3>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jenis Kelamin *
                  </label>
                  <select
                    required
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 transition-all duration-300 hover:border-gray-400"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tempat Lahir *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({...formData, tempatLahir: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Masukkan tempat lahir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Lahir *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.alamat}
                    onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>

                <div className="sm:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200 mt-8">Data Orang Tua (Opsional)</h3>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    value={formData.namaAyah}
                    onChange={(e) => setFormData({...formData, namaAyah: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Masukkan nama ayah"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    value={formData.namaIbu}
                    onChange={(e) => setFormData({...formData, namaIbu: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Masukkan nama ibu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. Telepon/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.noTelepon}
                    onChange={(e) => setFormData({...formData, noTelepon: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target Hafalan
                  </label>
                  <input
                    type="text"
                    value={formData.targetHafalan}
                    onChange={(e) => setFormData({...formData, targetHafalan: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Contoh: Juz 30, An-Nas sampai Al-Fatihah"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-center"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Informasi Lanjutan</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Persyaratan:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Usia minimal 4 tahun</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Fotocopy akta kelahiran</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Fotocopy KK</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Pas foto 3x4 (2 lembar)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Jadwal:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Senin - Jumat: 15:30 - 17:00</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Sabtu: 08:00 - 10:00</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Minggu: Libur</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Catatan:</strong> Setelah pendaftaran, admin akan menghubungi Anda dalam 1-2 hari kerja 
              untuk konfirmasi dan informasi selanjutnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}