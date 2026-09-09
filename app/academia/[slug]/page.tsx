'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useParams } from 'next/navigation'

const articles = {
  'que-hace-especial-a-un-cafe-de-especialidad': {
    category: 'Estándar SCA',
    title: 'Qué hace especial a un café de especialidad',
    intro: 'Un café de especialidad no es solo una etiqueta; es el resultado de la precisión en cada etapa de la cadena.',
    body: [
      'Para obtener esta categoría, el lote debe superar los 80 puntos en la escala de cata de la SCA (Specialty Coffee Association).',
      'Se distingue por su trazabilidad total (saber exactamente la finca, lote, variedad y altura), una cosecha 100% manual de granos en su punto óptimo de maduración y la ausencia total de defectos primarios.',
      'En taza, esto se traduce en notas limpias, acidez brillante, cuerpo estructurado y sabores complejos sin necesidad de azúcares añadidos.'
    ]
  },
  'procesos-del-cafe-lavado-honey-y-natural': {
    category: 'Beneficio',
    title: 'Procesos del café: Lavado, Honey y Natural',
    intro: 'El método de beneficio define drásticamente el sabor final en tu taza:',
    body: [
      '1. Lavado: Se retira la pulpa y el mucílago antes de secar el grano. Produce una taza muy limpia, de acidez brillante, cuerpo ligero y alta claridad de notas.',
      '2. Honey: Se remueve la pulpa pero se deja parte del mucílago jugoso durante el secado. Aporta una dulzura acaramelada, cuerpo medio y acidez balanceada.',
      '3. Natural: El fruto se seca entero con la cáscara y la pulpa puestas. Genera perfiles intensos, frutales, altamente complejos, con cuerpo denso y notas vinosas o licorosas.'
    ]
  },
  'la-evolucion-de-la-cultura-colombiana-del-cafe': {
    category: 'Cultura & Territorio',
    title: 'La evolución de la cultura colombiana del café',
    intro: 'Colombia ha sido históricamente reconocida por producir uno de los mejores cafés suaves del mundo, pero tradicionalmente los mejores lotes eran exportados.',
    body: [
      'Hoy vivimos una revolución local: caficultores, tostadores y consumidores están redefiniendo la cultura del café en el país.',
      "Pasar de la 'pasilla' tradicional a consumir cafés de especialidad locales no solo nos conecta con el origen y el esfuerzo de la tierra, sino que nos permite disfrutar el verdadero estándar de calidad de nuestro propio territorio."
    ]
  },
} as const

export default function ArticlePage() {
  const { slug } = useParams<{ slug: keyof typeof articles }>()
  const article = (slug && articles[slug]) ? articles[slug] : articles['que-hace-especial-a-un-cafe-de-especialidad']

  return (
    <main className="article-page">
      <header className="site-header">
        <Link className="brand" href="/#inicio" aria-label="Volver a SPINTA">SPINTA<span>·</span></Link>
        <Link className="back-link" href="/#academia"><ArrowLeft size={15} /> Volver a la Academia</Link>
      </header>
      <article className="article-reader">
        <p className="eyebrow">{article.category} · Academia SPINTA</p>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.intro}</p>
        <div className="article-rule" />
        {article.body.map((paragraph) => (
          <p className="article-body" key={paragraph}>{paragraph}</p>
        ))}
        <Link className="text-link" href="/#tienda">Explorar cafés SPINTA <ArrowUpRight size={16} /></Link>
      </article>
      <footer>
        <div className="footer-brand">SPINTA<span>·</span></div>
        <p>Café de especialidad para días extraordinarios.</p>
        <small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small>
      </footer>
    </main>
  )
}
