'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import Logo from '@/components/Logo'
import { useCart } from '@/context/CartContext'

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const {
    items,
    cartCount,
    cartSubtotal,
    discount,
    cartTotal,
    discountCode,
    customerName,
    customerAddress,
    cartOpen,
    cartBumping,
    toastMessage,
    changeQuantity,
    removeFromCart,
    setDiscountCode,
    setCustomerName,
    setCustomerAddress,
    setCartOpen,
    sendWhatsApp,
    formatCOP,
  } = useCart()

  return (
    <>
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="cart-toast-icon"><Check size={12} strokeWidth={2.5} /></span>
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="site-header">
        <Link className="brand" href="/" aria-label="SPINTA Café inicio">
          <Logo variant="naranja" width={140} height={36} />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link href="/tienda">Tienda</Link>
          <Link href="/nuestra-historia">Nuestra historia</Link>
          <Link href="/#contacto">Contacto</Link>
        </nav>
        <div className="header-actions">
          <button
            className={`bag-button ${cartBumping ? 'bump' : ''}`}
            onClick={() => setCartOpen(true)}
            aria-label={`Ver carrito, ${cartCount} productos`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>{cartCount}</span>
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link href="/tienda" onClick={() => setMenuOpen(false)}>Tienda</Link>
          <Link href="/nuestra-historia" onClick={() => setMenuOpen(false)}>Nuestra historia</Link>
          <Link href="/#contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </nav>
      )}

      {cartOpen && (
        <>
          <button className="drawer-backdrop" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} />
          <aside className="cart-drawer" aria-label="Carrito de compras">
            <div className="cart-header">
              <div>
                <p className="eyebrow">Tu selección</p>
                <h2>Carrito <span>{cartCount}</span></h2>
              </div>
              <button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={30} />
                <p>Tu carrito está esperando algo especial.</p>
                <Link href="/tienda" onClick={() => setCartOpen(false)}>Explorar tienda</Link>
              </div>
            ) : (
              <>
                <div className="cart-lines">
                  {items.map((item) => (
                    <div className="cart-line" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <small>{formatCOP(item.price)} c/u</small>
                        <div className="quantity">
                          <button onClick={() => changeQuantity(item.id, -1)} aria-label={`Disminuir ${item.name}`}>
                            <Minus size={13} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumentar ${item.name}`}>
                            <Plus size={13} />
                          </button>
                          <button className="remove-line" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name}`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <strong>{formatCOP(item.price * item.quantity)}</strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <p className="cart-notice">Tu pedido se finaliza directamente a través de WhatsApp con atención personalizada.</p>
                  <label className="cart-field">
                    Código de descuento
                    <input
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="ZORROCAFETERO"
                    />
                  </label>
                  <div className="cart-totals">
                    <div><span>Subtotal</span><strong>{formatCOP(cartSubtotal)}</strong></div>
                    {discount > 0 && (
                      <div><span>Descuento (ZORROCAFETERO -10%)</span><strong>−{formatCOP(discount)}</strong></div>
                    )}
                    <div className="final-total"><span>Total final</span><strong>{formatCOP(cartTotal)}</strong></div>
                  </div>
                  <label className="cart-field">
                    Nombre completo
                    <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tu nombre" />
                  </label>
                  <label className="cart-field">
                    Dirección de entrega
                    <input required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Medellín / Área Metropolitana" />
                  </label>
                  <button
                    className="dark-button cart-checkout"
                    disabled={!customerName.trim() || !customerAddress.trim()}
                    onClick={sendWhatsApp}
                  >
                    Finalizar pedido por WhatsApp <ArrowUpRight size={16} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}
    </>
  )
}
