'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Logo from '@/components/Logo'

export default function NuestraHistoriaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Volver a SPINTA Café">
          <Logo variant="naranja" width={140} height={36} />
        </Link>
        <Link className="back-link" href="/">
          <ArrowLeft size={15} /> Volver al inicio
        </Link>
      </header>

      {/* Hero / Banner de Nuestra Historia */}
      <section className="section-shell" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '14px' }}>Nuestra historia</p>
          <h1 className="hero-title" style={{ color: 'var(--foreground)', fontSize: 'clamp(42px, 6vw, 76px)', lineHeight: 0.98, margin: '0 auto 28px' }}>
            Café de especialidad,<br /><em>hecho con paciencia.</em>
          </h1>
          <p className="section-intro" style={{ margin: '0 auto', maxWidth: '560px' }}>
            Nacimos con el propósito de conectar a las personas con el origen y la riqueza del café colombiano a través de un ritual honesto.
          </p>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="manifesto" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <p className="eyebrow">Manifiesto SPINTA</p>
        <blockquote>
          “Una taza no cambia el mundo.<br />
          <em>Pero puede cambiar tu mañana.”</em>
        </blockquote>
        <div className="manifesto-line" />
        <p>Trabajamos con productores que cuidan la tierra y tostamos cada lote con paciencia. Porque el buen café no necesita prisa.</p>
      </section>

      {/* Relato detallado */}
      <section className="section-shell">
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '10px' }}>01 · El Origen</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 16px', color: 'var(--foreground)' }}>
              Honrar la tierra y sus manos
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '16.5px', lineHeight: 1.8, margin: 0 }}>
              Colombia ha sido históricamente reconocida por producir uno de los mejores cafés del mundo. En SPINTA seleccionamos cosechas frescas trabajando directamente con caficultores locales que realizan recolección 100% manual en su punto óptimo de maduración. Cada grano cuenta la historia de un microclima, una altura y la dedicación de quienes cuidan el cultivo.
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

          <div>
            <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '10px' }}>02 · El Tueste</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 16px', color: 'var(--foreground)' }}>
              Precisión en el perfil de taza
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '16.5px', lineHeight: 1.8, margin: 0 }}>
              No creemos en tuestes oscuros que enmascaran el sabor ni en procesos industriales acelerados. Tostamos en lotes pequeños ajustando cuidadosamente el perfil para resaltar las notas naturales dulces, cítricas o florales de cada origen. Nuestro compromiso es entregar siempre tueste fresco directamente a tu puerta o evento.
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

          <div>
            <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '10px' }}>03 · El Ritual</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '0 0 16px', color: 'var(--foreground)' }}>
              Manteniendo tus sueños despiertos
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '16.5px', lineHeight: 1.8, margin: 0 }}>
              SPINTA es para quienes buscan más que una dosis de cafeína: es para quienes disfrutan el ritual de moler, oler, filtrar y saborear. Diseñamos nuestras tres líneas por código de color (Naranja Estándar, Amarillo Impulso y Verde Élite) para acompañar tu jornada con la taza perfecta en cada momento.
            </p>
          </div>

          <div style={{ paddingTop: '20px', textAlign: 'center' }}>
            <Link className="dark-button" href="/#tienda" style={{ display: 'inline-flex' }}>
              Explorar nuestra tienda <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand"><Logo variant="negro" width={135} height={34} /></div>
        <p>Café de especialidad para días extraordinarios.</p>
        <div className="footer-links">
          <Link href="/#tienda">Tienda</Link>
          <Link href="/nuestra-historia">Nuestra historia</Link>
          <Link href="/#contacto">Contacto</Link>
          <a href="https://instagram.com/spintacafe" target="_blank" rel="noreferrer">@spintacafe</a>
        </div>
        <small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small>
      </footer>
    </main>
  )
}
