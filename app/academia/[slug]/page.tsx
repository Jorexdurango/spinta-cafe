'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useParams } from 'next/navigation'

const articles = {
  'ritmo-lento-v60': { category: 'Métodos', title: 'El ritmo lento del V60', intro: 'Una guía breve para encontrar claridad, dulzor y equilibrio en cada vertido.', body: ['El V60 recompensa la atención. Empieza con agua entre 92 y 96 °C, una molienda media y un vertido circular que mantenga el lecho de café uniformemente húmedo.', 'La pausa inicial permite que el café libere sus aromas antes de continuar. Más que perseguir una receta perfecta, observa el ritmo: el sonido del agua, la velocidad del goteo y la fragancia que aparece en cada etapa.'] },
  'el-origen-tambien-se-escucha': { category: 'Cultura', title: 'El origen también se escucha', intro: 'Historias de las montañas, las manos y las decisiones detrás de cada taza.', body: ['Cada origen tiene una voz. La altura, la variedad, el suelo y el trabajo de quienes cultivan transforman la semilla en una experiencia irrepetible.', 'Probar café de especialidad es aprender a reconocer esas diferencias sin prisa. En SPINTA seleccionamos lotes trazables para acercarte a las historias que viven detrás de cada etiqueta.'] },
  'como-probar-cafe-en-casa': { category: 'Notas', title: 'Cómo probar café en casa', intro: 'Cinco sentidos, una taza y la curiosidad suficiente para descubrir algo nuevo.', body: ['Sirve una taza limpia y deja que se enfríe unos minutos. Primero huele el café, luego observa su textura y finalmente prueba pequeños sorbos.', 'Busca dulzor, acidez, cuerpo y persistencia. No necesitas palabras complicadas: una libreta y la curiosidad bastan para construir tu propio lenguaje del café.'] },
} as const

export default function ArticlePage() {
  const { slug } = useParams<{ slug: keyof typeof articles }>()
  const article = articles[slug] ?? articles['ritmo-lento-v60']

  return <main className="article-page"><header className="site-header"><Link className="brand" href="/#inicio" aria-label="Volver a SPINTA">SPINTA<span>·</span></Link><Link className="back-link" href="/#academia"><ArrowLeft size={15} /> Volver a la Academia</Link></header><article className="article-reader"><p className="eyebrow">{article.category} · Academia SPINTA</p><h1>{article.title}</h1><p className="article-lead">{article.intro}</p><div className="article-rule" />{article.body.map((paragraph) => <p className="article-body" key={paragraph}>{paragraph}</p>)}<Link className="text-link" href="/#tienda">Explorar cafés SPINTA <ArrowUpRight size={16} /></Link></article><footer><div className="footer-brand">SPINTA<span>·</span></div><p>Café de especialidad para días extraordinarios.</p><small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small></footer></main>
}
