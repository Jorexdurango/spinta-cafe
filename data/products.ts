export interface TechSpecs {
  origin: string
  altitude: string
  process: string
  roast: string
  notes: string[]
  suggestedMethods: string[]
}

export interface AccessorySpecs {
  material: string
  capacity: string
  idealFor: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: 'cafe' | 'accesorio'
  price: number
  detail: string
  description: string
  tag: string
  image: string
  techSpecs?: TechSpecs
  accessorySpecs?: AccessorySpecs
  recommendedIds: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'estandar',
    slug: 'estandar',
    name: 'SPINTA Estándar',
    category: 'cafe',
    price: 35000,
    tag: 'Estándar',
    detail: '250 g · Categoría Naranja',
    description: 'Perfiles clásicos, limpios y balanceados. Tu café de todos los días con cuerpo suave y dulce nota acaramelada.',
    image: '/images/spinta-huila.png',
    techSpecs: {
      origin: 'Huila, Colombia',
      altitude: '1.600 - 1.800 msnm',
      process: 'Lavado tradicional',
      roast: 'Medio balanceado',
      notes: ['Chocolate con leche', 'Panela', 'Nuez moscada', 'Manzana roja'],
      suggestedMethods: ['Cafetera de filtro', 'Prensa francesa', 'Espresso'],
    },
    recommendedIds: ['v60', 'press', 'filters'],
  },
  {
    id: 'impulso',
    slug: 'impulso',
    name: 'SPINTA Impulso',
    category: 'cafe',
    price: 48000,
    tag: 'Impulso',
    detail: '250 g · Categoría Amarilla',
    description: 'Sabores y procesos diferenciados (Natural, Honey y fermentación controlada) con notas frutales intensas.',
    image: '/images/spinta-narino.png',
    techSpecs: {
      origin: 'Nariño, Colombia',
      altitude: '1.900 - 2.100 msnm',
      process: 'Honey amarillo y fermentación prolongada',
      roast: 'Medio claro',
      notes: ['Miel de caña', 'Melocotón', 'Jazmín', 'Cítricos dulces'],
      suggestedMethods: ['V60', 'Aeropress', 'Chemex'],
    },
    recommendedIds: ['v60', 'server', 'kettle'],
  },
  {
    id: 'elite',
    slug: 'elite',
    name: 'SPINTA Élite',
    category: 'cafe',
    price: 60000,
    tag: 'Élite',
    detail: '250 g · Categoría Verde',
    description: 'Varietales exóticos y microlotes raros seleccionados a mano para paladares exigentes que buscan una taza extraordinaria.',
    image: '/images/spinta-sierra.png',
    techSpecs: {
      origin: 'Sierra Nevada de Santa Marta, Colombia',
      altitude: '1.750 - 2.050 msnm',
      process: 'Natural anaeróbico 72h',
      roast: 'Claro artesanal',
      notes: ['Frutos rojos', 'Cacao nibs', 'Maracuyá', 'Vino dulce'],
      suggestedMethods: ['V60', 'Origami Dripper', 'Filtrados de precisión'],
    },
    recommendedIds: ['v60', 'kettle', 'filters'],
  },
  {
    id: 'press',
    slug: 'prensa-francesa',
    name: 'Prensa Francesa 350ml',
    category: 'accesorio',
    price: 30000,
    tag: 'Accesorio',
    detail: 'Vidrio borosilicato y acero inoxidable',
    description: 'Cuerpo generoso y extracción sin prisa. Permite conservar todos los aceites naturales del café para una textura densa y reconfortante.',
    image: '/images/accessory-prensa.png',
    accessorySpecs: {
      material: 'Vidrio borosilicato + acero inoxidable 304',
      capacity: '350 ml (2 - 3 tazas)',
      idealFor: 'Cafés con tueste medio a oscuro como SPINTA Estándar',
    },
    recommendedIds: ['estandar', 'impulso'],
  },
  {
    id: 'v60',
    slug: 'v60-hario',
    name: 'V60 Hario Cerámica',
    category: 'accesorio',
    price: 60000,
    tag: 'Accesorio',
    detail: 'Cerámica · Blanco mate (02)',
    description: 'Control y claridad para empezar tu ritual. Su diseño cónico en 60 grados con estrías en espiral resalta los matices más complejos.',
    image: '/images/accessory-v60.png',
    accessorySpecs: {
      material: 'Cerámica japonesa de alta temperatura',
      capacity: 'Tamaño 02 (1 - 4 tazas)',
      idealFor: 'Cafés de perfil frutal o floral como SPINTA Impulso y Élite',
    },
    recommendedIds: ['impulso', 'filters', 'kettle'],
  },
  {
    id: 'filters',
    slug: 'filtros-v60',
    name: 'Filtros V60 x100und',
    category: 'accesorio',
    price: 45000,
    tag: 'Accesorio',
    detail: 'Papel de filtrado blanqueado natural (02)',
    description: 'Papel de alta densidad para una extracción limpia, sin residuos de sedimentos ni sabores indeseados.',
    image: '/images/accessory-filters.png',
    accessorySpecs: {
      material: 'Celulosa natural de papel blanqueado con oxígeno',
      capacity: '100 unidades · Tamaño 02',
      idealFor: 'Goteadores V60 y métodos cónicos',
    },
    recommendedIds: ['v60', 'impulso', 'server'],
  },
  {
    id: 'server',
    slug: 'server-600ml',
    name: 'Server 600ml',
    category: 'accesorio',
    price: 60000,
    tag: 'Accesorio',
    detail: 'Vidrio borosilicato resistente al calor',
    description: 'Transparencia y precisión para recibir y servir tus métodos de filtrado. Compatible con goteadores V60.',
    image: '/images/accessory-server.png',
    accessorySpecs: {
      material: 'Vidrio borosilicato térmico',
      capacity: '600 ml con marcas de volumen',
      idealFor: 'Servir filtrados en mesa para compartir',
    },
    recommendedIds: ['v60', 'kettle', 'elite'],
  },
  {
    id: 'kettle',
    slug: 'kettle-cuello-de-cisne',
    name: 'Cuello de Cisne con Termómetro',
    category: 'accesorio',
    price: 120000,
    tag: 'Accesorio',
    detail: 'Acero inoxidable · 1 Litro',
    description: 'Control absoluto del flujo de agua y temperatura integrada en la tapa para extracciones consistentes y profesionales.',
    image: '/images/accessory-kettle.png',
    accessorySpecs: {
      material: 'Acero inoxidable de calidad alimentaria',
      capacity: '1.0 Litro con termómetro análogo',
      idealFor: 'Métodos vertidos como V60, Chemex y Kalita',
    },
    recommendedIds: ['v60', 'elite', 'impulso'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug)
}

export function getRecommendedProducts(product: Product): Product[] {
  return product.recommendedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
}
