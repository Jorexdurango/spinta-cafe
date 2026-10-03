'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Eye, Minus, Plus, X } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import Logo from '@/components/Logo'
import { PRODUCTS, getRecommendedProducts, Product } from '@/data/products'
import { useCart } from '@/context/CartContext'

const formatCOP = (value: number) =>
  `$COP ${new Intl.NumberFormat('es-CO').format(value)}`

type Filter = 'todos' | 'cafe' | 'accesorio'

function RecommendedBlock({
  products,
  onQuickView,
}: {
  products: Product[]
  onQuickView: (p: Product) => void
}) {
  const { addToCart } = useCart()
  if (products.length === 0) return null
  return (
    <div className="recommended-block">
      <p className="eyebrow" style={{ marginBottom: '24px', color: 'var(--coffee)' }}>
        Completa tu ritual
      </p>
      <div className="recommended-grid">
        {products.map((p) => (
          <div key={p.id} className="recommended-card">
            <div className="recommended-art">
              <Image
                src={p.image}
                alt={p.name}
                width={120}
                height={120}
                className="recommended-img"
              />
            </div>
            <div className="recommended-meta">
              <span className="eyebrow" style={{ fontSize: '9px', marginBottom: '4px', display: 'block' }}>
                {p.tag}
              </span>
              <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{p.name}</strong>
              <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>{formatCOP(p.price)}</span>
            </div>
            <div className="recommended-actions">
              <button className="outline-button" style={{ padding: '8px 12px', fontSize: '10px' }} onClick={() => onQuickView(p)}>
                <Eye size={12} /> Ver
              </button>
              <button
                className="dark-button"
                style={{ padding: '8px 12px', fontSize: '10px' }}
                onClick={() => addToCart({ id: p.id, name: p.name, price: p.price })}
              >
                + Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickViewModal({
  product,
  onClose,
  onQuickView,
}: {
  product: Product
  onClose: () => void
  onQuickView: (p: Product) => void
}) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const recommended = getRecommendedProducts(product)

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price: product.price }, qty)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Image */}
          <div className="modal-image-side">
            <div className="modal-img-wrap">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={340}
                className="modal-product-img"
              />
            </div>
            <span className="product-tag-pill">{product.tag}</span>
          </div>

          {/* Info */}
          <div className="modal-info-side">
            <p className="eyebrow" style={{ marginBottom: '8px', color: 'var(--coffee)' }}>
              {product.category === 'cafe' ? 'Café de Especialidad' : 'Accesorio & Método'}
            </p>
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-detail">{product.detail}</p>
            <p className="modal-desc">{product.description}</p>

            {/* Tech specs for café */}
            {product.techSpecs && (
              <div className="modal-specs">
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
              <div className="modal-specs">
                <div className="spec-row"><span>Material</span><strong>{product.accessorySpecs.material}</strong></div>
                <div className="spec-row"><span>Capacidad</span><strong>{product.accessorySpecs.capacity}</strong></div>
                <div className="spec-row"><span>Ideal para</span><strong>{product.accessorySpecs.idealFor}</strong></div>
              </div>
            )}

            <div className="modal-price">{formatCOP(product.price)}</div>

            {/* Quantity + Add */}
            <div className="modal-add-row">
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

            <Link className="text-link" href={`/tienda/${product.slug}`} style={{ marginTop: '12px', fontSize: '11px' }}>
              Ver página completa del producto <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Recommended */}
        {recommended.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '28px 32px 24px' }}>
            <RecommendedBlock products={recommended} onQuickView={(p) => { onClose(); setTimeout(() => onQuickView(p), 120) }} />
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  onQuickView,
}: {
  product: Product
  onQuickView: (p: Product) => void
}) {
  const { addToCart } = useCart()

  return (
    <div className="product-card tienda-card">
      <div className="product-art tienda-art">
        <span>{product.tag}</span>
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={260}
          className="catalog-product-image tienda-product-image"
        />
        <button
          className="quick-view-btn"
          onClick={() => onQuickView(product)}
          aria-label={`Vista rápida de ${product.name}`}
        >
          <Eye size={14} /> Vista rápida
        </button>
      </div>
      <div className="product-meta" style={{ display: 'block', paddingTop: '14px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>{product.name}</h3>
        <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', margin: '0 0 10px', lineHeight: 1.5 }}>
          {product.detail}
        </p>
        <strong style={{ display: 'block', fontSize: '13px', marginBottom: '14px' }}>{formatCOP(product.price)}</strong>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          className="outline-button"
          style={{ flex: 1, fontSize: '10px', padding: '10px' }}
          onClick={() => onQuickView(product)}
        >
          Ver detalles
        </button>
        <button
          className="dark-button"
          style={{ flex: 1, fontSize: '10px', padding: '10px', justifyContent: 'center' }}
          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default function TiendaPage() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'todos') return true
    return p.category === filter
  })

  const cafes = PRODUCTS.filter((p) => p.category === 'cafe')

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero banner de tienda */}
      <section
        className="section-shell"
        style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f6f4ef' }}
      >
        <div style={{ maxWidth: '800px' }}>
          <p className="eyebrow" style={{ color: 'var(--coffee)', marginBottom: '14px' }}>
            Tienda SPINTA
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-proxima-bold)',
              fontSize: 'clamp(48px, 6vw, 84px)',
              lineHeight: 0.95,
              letterSpacing: '-.045em',
              margin: '0 0 24px',
              fontWeight: 700,
            }}
          >
            Café que cuenta<br />
            <em style={{ fontFamily: 'var(--font-proxima)', fontStyle: 'italic', color: 'var(--coffee)' }}>
              una historia.
            </em>
          </h1>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: 1.65, maxWidth: '460px', margin: 0 }}>
            Selección de cafés de especialidad colombianos y accesorios de extracción para completar tu ritual diario.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="tienda-filters-bar">
        {(['todos', 'cafe', 'accesorio'] as Filter[]).map((f) => (
          <button
            key={f}
            className={`tienda-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'todos' ? 'Todos' : f === 'cafe' ? 'Cafés de Especialidad' : 'Accesorios & Métodos'}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <section className="section-shell" style={{ paddingTop: '50px' }}>
        {/* Category headers */}
        {(filter === 'todos' || filter === 'cafe') && (
          <>
            <div className="tienda-category-header">
              <p className="eyebrow" style={{ color: 'var(--coffee)' }}>Cafés de Especialidad</p>
              <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginTop: '12px', marginBottom: '36px' }} />
            </div>
            <div className="product-grid tienda-grid" style={{ marginBottom: '70px' }}>
              {PRODUCTS.filter((p) => p.category === 'cafe').map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </>
        )}

        {(filter === 'todos' || filter === 'accesorio') && (
          <>
            <div className="tienda-category-header">
              <p className="eyebrow" style={{ color: 'var(--coffee)' }}>Accesorios & Métodos</p>
              <div style={{ width: '100%', height: '1px', background: 'var(--border)', marginTop: '12px', marginBottom: '36px' }} />
            </div>
            <div className="product-grid tienda-grid">
              {PRODUCTS.filter((p) => p.category === 'accesorio').map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </>
        )}

        {/* Sección recomendados footer de tienda */}
        {filter === 'todos' && (
          <div style={{ marginTop: '90px', borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
            <RecommendedBlock
              products={cafes.slice(0, 3)}
              onQuickView={setQuickViewProduct}
            />
          </div>
        )}
      </section>

      {/* Modal de vista rápida */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onQuickView={setQuickViewProduct}
        />
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
