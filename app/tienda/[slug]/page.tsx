'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Eye, Minus, Plus } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import Logo from '@/components/Logo'
import { getProductBySlug, getRecommendedProducts, PRODUCTS, Product } from '@/data/products'
import { useCart } from '@/context/CartContext'

const formatCOP = (value: number) =>
  `$COP ${new Intl.NumberFormat('es-CO').format(value)}`

function RecommendedCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  return (
    <div className="recommended-card tienda-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="recommended-art" style={{ marginBottom: '14px' }}>
        <Image src={product.image} alt={product.name} width={140} height={140} className="recommended-img" />
      </div>
      <span className="eyebrow" style={{ fontSize: '9px', marginBottom: '4px', display: 'block', color: 'var(--coffee)' }}>
        {product.tag}
      </span>
      <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>{product.name}</strong>
      <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '0 0 14px', lineHeight: 1.5, flex: 1 }}>
        {product.detail}
      </p>
      <strong style={{ fontSize: '13px', display: 'block', marginBottom: '14px' }}>{formatCOP(product.price)}</strong>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link
          href={`/tienda/${product.slug}`}
          className="outline-button"
          style={{ flex: 1, fontSize: '10px', padding: '9px 10px', textAlign: 'center', justifyContent: 'center' }}
        >
          <Eye size={12} /> Ver
        </Link>
        <button
          className="dark-button"
          style={{ flex: 1, fontSize: '10px', padding: '9px 10px', justifyContent: 'center' }}
          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addToCart } = useCart()

  const product = getProductBySlug(slug ?? '') ?? PRODUCTS[0]
  const recommended = getRecommendedProducts(product)

  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price: product.price }, qty)
  }

  const handleWhatsApp = () => {
    const message = `Hola SPINTA,%0AEstoy interesado en: ${encodeURIComponent(product.name)} x${qty}.%0ATotal: ${encodeURIComponent(formatCOP(product.price * qty))}`
    window.open(`https://wa.me/573244122482?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Breadcrumb */}
      <div className="section-shell" style={{ paddingTop: '100px', paddingBottom: '0' }}>
        <Link className="back-link" href="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <ArrowLeft size={14} /> Volver a la Tienda
        </Link>
      </div>

      {/* Product detail */}
      <section className="section-shell" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
        <div className="product-detail-layout">
          {/* Image */}
          <div className="product-detail-image-side">
            <div className="product-detail-img-wrap">
              <Image
                src={product.image}
                alt={product.name}
                width={480}
                height={520}
                className="product-detail-img"
                priority
              />
            </div>
            <span className="product-tag-pill">{product.tag}</span>
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '10px' }}>
              {product.category === 'cafe' ? 'Café de Especialidad' : 'Accesorio & Método'}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-proxima-bold)',
                fontSize: 'clamp(36px, 5vw, 62px)',
                lineHeight: 0.95,
                letterSpacing: '-.04em',
                margin: '0 0 16px',
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--muted-foreground)',
                margin: '0 0 8px',
              }}
            >
              {product.detail}
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'var(--foreground)',
                margin: '0 0 24px',
                maxWidth: '460px',
              }}
            >
              {product.description}
            </p>

            {/* Tech specs for café */}
            {product.techSpecs && (
              <div className="modal-specs" style={{ marginBottom: '28px' }}>
                <div className="spec-row"><span>Origen</span><strong>{product.techSpecs.origin}</strong></div>
                <div className="spec-row"><span>Altitud</span><strong>{product.techSpecs.altitude}</strong></div>
                <div className="spec-row"><span>Proceso</span><strong>{product.techSpecs.process}</strong></div>
                <div className="spec-row"><span>Tueste</span><strong>{product.techSpecs.roast}</strong></div>
                <div className="spec-row">
                  <span>Notas de cata</span>
                  <strong>{product.techSpecs.notes.join(' · ')}</strong>
                </div>
                <div className="spec-row">
                  <span>Métodos sugeridos</span>
                  <strong>{product.techSpecs.suggestedMethods.join(', ')}</strong>
                </div>
              </div>
            )}

            {/* Accessory specs */}
            {product.accessorySpecs && (
              <div className="modal-specs" style={{ marginBottom: '28px' }}>
                <div className="spec-row"><span>Material</span><strong>{product.accessorySpecs.material}</strong></div>
                <div className="spec-row"><span>Capacidad</span><strong>{product.accessorySpecs.capacity}</strong></div>
                <div className="spec-row"><span>Ideal para</span><strong>{product.accessorySpecs.idealFor}</strong></div>
              </div>
            )}

            <div className="modal-price" style={{ marginBottom: '20px' }}>
              {formatCOP(product.price)}
            </div>

            {/* Qty + Add */}
            <div className="modal-add-row" style={{ marginBottom: '12px' }}>
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Disminuir">
                  <Minus size={14} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">
                  <Plus size={14} />
                </button>
              </div>
              <button className="dark-button" style={{ flex: 1 }} onClick={handleAdd}>
                Agregar al carrito <ArrowUpRight size={15} />
              </button>
            </div>

            <button
              onClick={handleWhatsApp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: 'transparent',
                border: 'none',
                color: 'var(--coffee)',
                fontSize: '12px',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              Pedir directamente por WhatsApp <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Sección Recomendados */}
      {recommended.length > 0 && (
        <section
          className="section-shell"
          style={{ paddingTop: '60px', paddingBottom: '80px', borderTop: '1px solid var(--border)', background: '#f6f4ef' }}
        >
          <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '8px' }}>
            Completa tu ritual
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              letterSpacing: '-.04em',
              margin: '0 0 44px',
            }}
          >
            Lo que va bien con <em style={{ color: 'var(--coffee)' }}>{product.name}</em>
          </h2>
          <div className="recommended-grid recommended-grid--large">
            {recommended.map((p) => (
              <RecommendedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <Logo variant="naranja" width={140} height={36} />
        </div>
        <p>Café de especialidad para días extraordinarios.</p>
        <div className="footer-links">
          <Link href="/tienda">Tienda</Link>
          <Link href="/nuestra-historia">Nuestra historia</Link>
          <Link href="/#contacto">Contacto</Link>
          <a href="https://instagram.com/spintacafe" target="_blank" rel="noreferrer">@spintacafe</a>
        </div>
        <small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small>
      </footer>
    </main>
  )
}
