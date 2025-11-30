import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TK TPA Al-Hidayah - Tempat Pendidikan Al-Quran Terbaik',
  description: 'TK TPA Al-Hidayah menyediakan pendidikan Al-Quran berkualitas dengan metode pembelajaran modern untuk anak-anak',
  keywords: 'TK TPA, TPQ, Al-Quran, Pendidikan Islam, Iqra, Tahfidz, Tahsin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-primary antialiased">
        {children}
      </body>
    </html>
  )
}