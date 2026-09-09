import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const proximaNova = localFont({
  src: './fonts/proxima-nova-bold-italic.otf',
  variable: '--font-proxima',
  weight: '700',
  style: 'italic',
})
const proximaNovaExtraBold = localFont({
  src: './fonts/proxima-nova-extrabold-italic.otf',
  variable: '--font-proxima-extra',
  weight: '800',
  style: 'italic',
})
const proximaNovaBold = localFont({
  src: './fonts/proxima-nova-bold.otf',
  variable: '--font-proxima-bold',
  weight: '700',
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'SPINTA CAFÉ — Manteniendo tus sueños despiertos',
  description: 'Café de especialidad colombiano, herramientas y conocimiento para preparar una mejor taza.',
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#fbfbf9', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className="bg-background"><body className={`${inter.variable} ${proximaNova.variable} ${proximaNovaExtraBold.variable} ${proximaNovaBold.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
