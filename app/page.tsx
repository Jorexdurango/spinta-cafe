'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Menu, Minus, Plus, Send, ShoppingBag, Trash2, X } from 'lucide-react'

const formatCOP = (value: number) => `$COP ${new Intl.NumberFormat('es-CO').format(value)}`

const origins = [
  { id: 'verde', name: 'Verde', note: 'Chocolate · nuez · caramelo', price: 45000, color: 'sierra', image: '/images/spinta-sierra.png' },
  { id: 'naranja', name: 'Naranja', note: 'Cítrico · panela · cacao', price: 48000, color: 'huila', image: '/images/spinta-huila.png' },
  { id: 'amarillo', name: 'Amarillo', note: 'Floral · frutos rojos · miel', price: 52000, color: 'narino', image: '/images/spinta-narino.png' },
]

const products = [
  { id: 'porce', name: 'SPINTA Porce Blend', detail: '250 g · Antioquia', description: 'Chocolate, caramelo, mandarina y maracuyá. El combustible diario con carácter.', price: 35000, tag: 'Diario', image: '/images/spinta-huila.png' },
  { id: 'impulso', name: 'SPINTA Impulso', detail: '250 g · Selección especial', description: 'Un perfil elegante y balanceado para sostener tu enfoque todos los días.', price: 48000, tag: 'Premium', image: '/images/spinta-narino.png' },
  { id: 'elite', name: 'SPINTA Élite', detail: '250 g · Microlote de temporada', description: 'La cima de nuestra selección: complejo, dinámico y extraordinario.', price: 60000, tag: 'Exclusivo', image: '/images/spinta-sierra.png' },
  { id: 'press', name: 'Prensa francesa 350ml', detail: 'Vidrio borosilicato', description: 'Cuerpo generoso y extracción sin prisa.', price: 30000, tag: 'Accesorio', image: '/images/accessory-prensa.png' },
  { id: 'v60', name: 'V60 Hario', detail: 'Cerámica · Blanco mate', description: 'Control y claridad para empezar tu ritual.', price: 60000, tag: 'Accesorio', image: '/images/accessory-v60.png' },
  { id: 'filters', name: 'Filtros V60 x100und', detail: 'Papel de filtrado', description: 'Papel limpio para tazas brillantes.', price: 45000, tag: 'Accesorio', image: '/images/accessory-filters.png' },
  { id: 'server', name: 'Server 600ml', detail: 'Vidrio borosilicato', description: 'Transparencia y precisión para servir tu café.', price: 60000, tag: 'Accesorio', image: '/images/accessory-server.png' },
  { id: 'kettle', name: 'Cuello de cisne termómetro', detail: 'Acero inoxidable · 1L', description: 'Temperatura y control en cada hilo de agua.', price: 120000, tag: 'Accesorio', image: '/images/accessory-kettle.png' },
]

const articles = [
  {
    slug: 'que-hace-especial-a-un-cafe-de-especialidad',
    category: 'Estándar SCA',
    title: 'Qué hace especial a un café de especialidad',
    text: 'Un café de especialidad no es solo una etiqueta; es el resultado de la precisión en cada etapa de la cadena. Para obtener esta categoría, el lote debe superar los 80 puntos en la escala de cata de la SCA (Specialty Coffee Association). Se distingue por su trazabilidad total (saber exactamente la finca, lote, variedad y altura), una cosecha 100% manual de granos en su punto óptimo de maduración y la ausencia total de defectos primarios. En taza, esto se traduce en notas limpias, acidez brillante, cuerpo estructurado y sabores complejos sin necesidad de azúcares añadidos.',
  },
  {
    slug: 'procesos-del-cafe-lavado-honey-y-natural',
    category: 'Beneficio',
    title: 'Procesos del café: Lavado, Honey y Natural',
    text: `El método de beneficio define drásticamente el sabor final en tu taza:\n1. Lavado: Se retira la pulpa y el mucílago antes de secar el grano. Produce una taza muy limpia, de acidez brillante, cuerpo ligero y alta claridad de notas.\n2. Honey: Se remueve la pulpa pero se deja parte del mucílago jugoso durante el secado. Aporta una dulzura acaramelada, cuerpo medio y acidez balanceada.\n3. Natural: El fruto se seca entero con la cáscara y la pulpa puestas. Genera perfiles intensos, frutales, altamente complejos, con cuerpo denso y notas vinosas o licorosas.`,
  },
  {
    slug: 'la-evolucion-de-la-cultura-colombiana-del-cafe',
    category: 'Cultura & Territorio',
    title: 'La evolución de la cultura colombiana del café',
    text: "Colombia ha sido históricamente reconocida por producir uno de los mejores cafés suaves del mundo, pero tradicionalmente los mejores lotes eran exportados. Hoy vivimos una revolución local: caficultores, tostadores y consumidores están redefiniendo la cultura del café en el país. Pasar de la 'pasilla' tradicional a consumir cafés de especialidad locales no solo nos conecta con el origen y el esfuerzo de la tierra, sino que nos permite disfrutar el verdadero estándar de calidad de nuestro propio territorio.",
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([])
  const [discountCode, setDiscountCode] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [origin, setOrigin] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [cartBumping, setCartBumping] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => {
      setToastMessage(null)
    }, 2400)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
  const cartSubtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])
  const isDiscountValid = discountCode.trim().toUpperCase() === 'ZORROCAFETERO'
  const discount = isDiscountValid ? Math.round(cartSubtotal * 0.1) : 0
  const cartTotal = cartSubtotal - discount

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id)
      if (existing) return current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line)
      return [...current, { ...item, quantity: 1 }]
    })
    setCartBumping(true)
    setToastMessage('¡Agregado al carrito!')
    setTimeout(() => setCartBumping(false), 450)
  }

  const addOriginToCart = () => addToCart({ id: `coffee-${origins[origin].id}`, name: `Bolsa de café · ${origins[origin].name}`, price: origins[origin].price })
  const changeQuantity = (id: string, amount: number) => setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: Math.max(0, line.quantity + amount) } : line).filter((line) => line.quantity > 0))
  const removeFromCart = (id: string) => setCart((current) => current.filter((line) => line.id !== id))

  const directWhatsApp = () => window.open('https://wa.me/573244122482?text=Hola%20SPINTA,%20quiero%20hacer%20un%20pedido', '_blank', 'noopener,noreferrer')
  const whatsapp = () => {
    if (!customerName.trim() || !customerAddress.trim() || cart.length === 0) return
    const lines = cart.map((item) => `• ${item.name} x${item.quantity} — ${formatCOP(item.price * item.quantity)}`).join('%0A')
    const discountLine = discount > 0 ? `%0ADescuento (ZORROCAFETERO -10%): -${formatCOP(discount)}` : ''
    const message = `Hola SPINTA,%0A%0AQuiero hacer este pedido:%0A${lines}%0A%0ASubtotal: ${formatCOP(cartSubtotal)}${discountLine}%0ATotal: ${formatCOP(cartTotal)}%0A%0ANombre: ${encodeURIComponent(customerName.trim())}%0ADirección en Medellín / Área Metropolitana: ${encodeURIComponent(customerAddress.trim())}`
    window.open(`https://wa.me/573244122482?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const addComment = () => {
    if (!comment.trim()) return
    setComments((current) => [comment.trim(), ...current])
    setComment('')
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="cart-toast-icon"><Check size={12} strokeWidth={2.5} /></span>
          <span>{toastMessage}</span>
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="SPINTA Café inicio">SPINTA<span>·</span></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#tienda">Tienda</a><a href="#academia">Academia</a><a href="#historia">Nuestra historia</a>
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
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {menuOpen && <nav className="mobile-menu"><a href="#tienda" onClick={() => setMenuOpen(false)}>Tienda</a><a href="#academia" onClick={() => setMenuOpen(false)}>Academia</a><a href="#historia" onClick={() => setMenuOpen(false)}>Nuestra historia</a></nav>}
      {cartOpen && <><button className="drawer-backdrop" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} /><aside className="cart-drawer" aria-label="Carrito de compras"><div className="cart-header"><div><p className="eyebrow">Tu selección</p><h2>Carrito <span>{cartCount}</span></h2></div><button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X size={20} /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={30} /><p>Tu carrito está esperando algo especial.</p><a href="#tienda" onClick={() => setCartOpen(false)}>Explorar tienda</a></div> : <><div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><div><strong>{item.name}</strong><small>{formatCOP(item.price)} c/u</small><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Disminuir ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumentar ${item.name}`}><Plus size={13} /></button><button className="remove-line" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name}`}><Trash2 size={14} /></button></div></div><strong>{formatCOP(item.price * item.quantity)}</strong></div>)}</div><div className="cart-summary"><p className="cart-notice">Tu pedido se finaliza y confirma directamente a través de WhatsApp con atención personalizada.</p><label className="cart-field">Código de descuento<input value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} placeholder="ZORROCAFETERO" /></label><div className="cart-totals"><div><span>Subtotal</span><strong>{formatCOP(cartSubtotal)}</strong></div>{discount > 0 && <div><span>Descuento (ZORROCAFETERO -10%)</span><strong>−{formatCOP(discount)}</strong></div>}<div className="final-total"><span>Total final</span><strong>{formatCOP(cartTotal)}</strong></div></div><label className="cart-field">Nombre completo<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" /></label><label className="cart-field">Dirección de entrega<input required value={customerAddress} onChange={(event) => setCustomerAddress(event.target.value)} placeholder="Medellín / Área Metropolitana" /></label><button className="dark-button cart-checkout" disabled={!customerName.trim() || !customerAddress.trim()} onClick={whatsapp}>Finalizar pedido por WhatsApp <ArrowUpRight size={16} /></button></div></>}</aside></>}

      <section id="inicio" className="hero-section">
        <div className="hero-copy"><Image className="hero-fox" src="/spinta-isotipo.png" alt="Isotipo del zorro de SPINTA" width={170} height={170} priority /><p className="eyebrow">Café de especialidad · Colombia</p><h1>Manteniendo<br />tus sueños<br /><em>despiertos.</em></h1><p className="hero-description">Café para quienes encuentran belleza en el ritual, precisión en el detalle y una buena excusa para quedarse despiertos.</p><a className="text-link" href="#tienda">Explorar la tienda <ArrowDown size={16} /></a></div>
        <div className="bag-stage" aria-label="Bolsa de café SPINTA flotando" style={{ transform: `translateY(${Math.min(scrollY * 0.16, 85)}px) rotate(${scrollY * 0.018 - 3}deg)` }}>
          <div className="coffee-shadow" /><Image className="hero-product-image" src="/images/spinta-huila.png" alt="Bolsa de café SPINTA Huila" fill priority sizes="(max-width: 760px) 245px, 330px" />
        </div>
        <div className="hero-foot"><span>01 — 03</span><span className="scroll-note"><span className="line" /> Desliza para descubrir</span></div>
      </section>

      <section id="tienda" className="shop-section section-shell"><div className="section-heading"><div><p className="eyebrow">La tienda</p><h2>Herramientas para<br /><em>hacerlo tuyo.</em></h2></div><p className="section-intro">Objetos honestos para preparar café excepcional, todos los días.</p></div>
        <div className="origin-feature"><div className={`origin-art ${origins[origin].color}`}><Image className="origin-product-image" src={origins[origin].image} alt={`Bolsa de café SPINTA ${origins[origin].name}`} fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="origin-info"><p className="eyebrow">Bolsas de café · 250 g</p><h3>Un origen, <em>tres formas</em><br />de despertar.</h3><p className="muted">Tueste fresco, trazable y enviado desde nuestro tostador hasta tu puerta.</p><div className="origin-tabs">{origins.map((item, i) => <button key={item.name} className={origin === i ? 'active' : ''} onClick={() => setOrigin(i)}><span>0{i + 1}</span>{item.name}</button>)}</div><div className="origin-detail"><span>{origins[origin].note}</span><strong>{formatCOP(origins[origin].price)}</strong></div><div className="product-actions"><button className="dark-button" onClick={addOriginToCart}>Agregar al carrito <ShoppingBag size={16} /></button><button className="text-link" onClick={directWhatsApp}>Pedir por WhatsApp <ArrowUpRight size={16} /></button></div></div></div>
        <div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className="product-art"><span>{product.tag}</span><Image className="catalog-product-image" src={product.image} alt={product.name} fill sizes="(max-width: 760px) 45vw, 240px" /></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.detail}</p><small>{product.description}</small></div><strong>{formatCOP(product.price)}</strong></div><button className="outline-button" onClick={() => addToCart(product)}>Agregar al carrito <ShoppingBag size={15} /></button><button className="product-whatsapp" onClick={directWhatsApp}>Pedir por WhatsApp <ArrowUpRight size={15} /></button></article>)}</div>
      </section>

      <section id="historia" className="manifesto"><p className="eyebrow">Por qué SPINTA</p><blockquote>“Una taza no cambia el mundo.<br /><em>Pero puede cambiar tu mañana.”</em></blockquote><div className="manifesto-line" /><p>Trabajamos con productores que cuidan la tierra y tostamos cada lote con paciencia. Porque el buen café no necesita prisa.</p></section>

      <section id="academia" className="academy-section section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">La academia</p>
            <h2>Aprende a<br /><em>saborear.</em></h2>
          </div>
          <a className="text-link" href="#comentarios">Comunidad y notas <ArrowUpRight size={16} /></a>
        </div>
        <div className="article-grid">
          {articles.map((article, i) => (
            <article className="article-card" key={article.title}>
              <div className="article-card-header">
                <div className={`article-number number-${i}`}>0{i + 1}</div>
                <p className="eyebrow">{article.category}</p>
                <h3>{article.title}</h3>
              </div>
              <p className="article-summary">{article.text}</p>
              <a className="arrow-link" href={`/academia/${article.slug}`}>
                Leer artículo <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
        <div id="comentarios" className="comment-box"><div><p className="eyebrow">Conversación abierta</p><h3>¿Qué estás preparando<br />hoy?</h3></div><div className="comment-form"><textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comparte una nota, una pregunta o un ritual..." aria-label="Escribe un comentario" /><button onClick={addComment} aria-label="Publicar comentario"><Send size={17} /></button></div>{comments.length > 0 && <div className="comment-list">{comments.map((item, i) => <p key={`${item}-${i}`}><Check size={14} /> {item}</p>)}</div>}</div>
      </section>

      <footer><div className="footer-brand">SPINTA<span>·</span></div><p>Café de especialidad para días extraordinarios.</p><div className="footer-links"><a href="#tienda">Tienda</a><a href="#academia">Academia</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></div><small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small></footer>
    </main>
  )
}
