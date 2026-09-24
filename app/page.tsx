'use client'

import Image from 'next/image'
import Script from 'next/script'
import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Download, Mail, MapPin, Menu, Minus, Plus, Send, Share2, ShoppingBag, Trash2, X } from 'lucide-react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'feed-id'?: string
      }
    }
  }
}

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

const phrases = [
  // Sección 1: Estoicismo, Disciplina y Autodominio
  "Ningún hombre es libre si no es dueño de sí mismo. — Epicteto",
  "No es porque las cosas son difíciles que no nos atrevemos, es porque no nos atrevemos que son difíciles. — Séneca",
  "La incomodidad es el precio de la admisión a una vida con significado.",
  "Tenemos dos vidas: la segunda comienza cuando nos damos cuenta de que solo tenemos una. — Confucio",
  "El obstáculo en el camino se convierte en el camino. — Marco Aurelio",
  "Sufres más en tu imaginación que en la realidad. — Séneca",
  "La disciplina es elegir entre lo que quieres ahora y lo que quieres más.",
  "No pidas una carga ligera, pide una espalda fuerte.",
  "Si quieres conquistar la ansiedad de la vida, vive en el momento, vive en la respiración.",
  "La suerte es el residuo del diseño. — Branch Rickey",
  "Un barco está seguro en el puerto, pero no es para eso que se construyen los barcos. — William S. Shedd",
  "La vida se encoge o se expande en proporción a tu coraje. — Anaïs Nin",
  "El hombre que mueve montañas empieza apartando piedrecitas. — Confucio",
  "Lo que haces todos los días importa más que lo que haces de vez en cuando.",
  "La excelencia no es un acto, es un hábito. — Aristóteles",
  "Quien tiene un porqué para vivir puede soportar casi cualquier cómo. — Friedrich Nietzsche",
  "No busques que las cosas pasen como tú quieres, sino quiere que las cosas pasen como pasan, y serás feliz. — Epicteto",
  "El mejor guerrero no es el que triunfa siempre, sino el que vuelve sin miedo a la batalla.",
  "Domínate a ti mismo y dominarás el mundo.",
  "La libertad no es hacer lo que quieres, es no tener que hacer lo que no quieres. — Jean-Jacques Rousseau",
  "Si estás libre de enemigos, el destino te ha olvidado. — Publilio Siro",
  "Nada noble se crea de la noche a la mañana. — Epicteto",
  "Aquel que teme sufrir, ya sufre por lo que teme. — Michel de Montaigne",
  "El valor no es la ausencia de miedo, sino el juicio de que algo es más importante que el miedo. — Ambrose Redmoon",
  "Cuanto mayor es la dificultad, mayor es la gloria en superarla. — Molière",
  // Sección 2: Fuego Interno, Acción y Movimiento
  "La acción es la llave fundamental de todo éxito. — Pablo Picasso",
  "El futuro depende de lo que hagas hoy. — Mahatma Gandhi",
  "No cuentes los días, haz que los días cuenten. — Muhammad Ali",
  "La inacción genera duda y miedo. La acción genera confianza y coraje.",
  "Si estás atravesando un infierno, sigue caminando. — Winston Churchill",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día. — Robert Collier",
  "No esperes. El tiempo nunca será el adecuado. — Napoleon Hill",
  "Tu tiempo es limitado, no lo desperdicies viviendo la vida de otro. — Steve Jobs",
  "La inspiración existe, pero tiene que encontrarte trabajando. — Pablo Picasso",
  "Haz lo que puedas, con lo que tengas, donde estés. — Theodore Roosevelt",
  "La duda mata más sueños que el fracaso. — Suzy Kassem",
  "Una vez que tomas una decisión, el universo conspira para hacerla realidad. — Ralph Waldo Emerson",
  "Coraje no es la ausencia de miedo, es la capacidad de actuar a pesar de él.",
  "La vida es un 10% lo que te ocurre y un 90% cómo reaccionas a ello. — Charles R. Swindoll",
  "Si no te gusta dónde estás, muévete. No eres un árbol. — Jim Rohn",
  "El secreto de avanzar es comenzar. — Mark Twain",
  "La energía fluye hacia donde va la atención. — Tony Robbins",
  "Sé el cambio que quieres ver en el mundo. — Mahatma Gandhi",
  "Mejor hecho que perfecto.",
  "La única forma de hacer un gran trabajo es amar lo que haces. — Steve Jobs",
  "El movimiento es la cura para la duda.",
  "No cuentes tus planes, muestra tus resultados.",
  "La fuerza no proviene de la capacidad física, sino de una voluntad indomable. — Mahatma Gandhi",
  "Caerse no es fracasar; fracasar es quedarse donde te caíste.",
  "Fuel your fire: la energía que buscas ya está dentro de ti.",
  // Sección 3: Mente, Perspectiva y Consciencia
  "No vemos las cosas como son, las vemos como somos. — Anaïs Nin",
  "La vida no examinada no merece ser vivida. — Sócrates",
  "La felicidad no es algo hecho. Proviene de tus propias acciones. — Dalai Lama",
  "El hombre rico es aquel cuyos placeres son los más baratos. — Henry David Thoreau",
  "La simplicidad es la máxima sofisticación. — Leonardo da Vinci",
  "Todo lo que te irrita de otros te puede llevar a un entendimiento de ti mismo. — Carl Jung",
  "Conócete a ti mismo. — Sócrates",
  "La paz viene de adentro. No la busques afuera. — Buda",
  "Aferrarse a la ira es como beber veneno y esperar que la otra persona muera. — Buda",
  "La única verdadera sabiduría es saber que no sabes nada. — Sócrates",
  "El viaje es la recompensa. — Proverbio chino",
  "No es lo que tienes, es lo que eres.",
  "La gratitud convierte lo que tenemos en suficiente. — Aesop",
  "La vida es un eco; si no te gusta lo que recibes, fíjate en lo que emites.",
  "La preocupación no elimina los problemas de mañana, elimina la paz de hoy.",
  "La belleza comienza en el momento en que decides ser tú mismo. — Coco Chanel",
  "Sé amable, porque cada persona que conoces está librando una batalla dura. — Platón",
  "La vida es muy simple, pero insistimos en hacerla complicada. — Confucio",
  "El momento presente es todo lo que tienes. — Eckhart Tolle",
  "Lo que niegas te somete, lo que aceptas te transforma. — Carl Jung",
  "Tu visión se volverá clara solo cuando puedas mirar en tu propio corazón. — Carl Jung",
  "El pensamiento es fácil, la acción es difícil, y poner los pensamientos en acción es lo más difícil del mundo. — Johann Wolfgang von Goethe",
  "La mente es su propio lugar, y en sí misma puede hacer un cielo del infierno o un infierno del cielo. — John Milton",
  "El hombre que no piensa por sí mismo no piensa en absoluto. — Oscar Wilde",
  "Cambia tus pensamientos y cambiarás tu mundo. — Norman Vincent Peale",
  // Sección 4: Resiliencia, Adversidad y Crecimiento
  "Cae siete veces, levántate ocho. — Proverbio japonés",
  "Los tiempos difíciles crean hombres fuertes. — Michael Hopf",
  "El roble más fuerte del bosque no es el que está protegido de la tormenta, es el que se ve obligado a luchar por su existencia. — Napoleon Hill",
  "En medio de la dificultad reside la oportunidad. — Albert Einstein",
  "Un mar tranquilo nunca hizo un buen marinero. — Proverbio inglés",
  "El dolor es inevitable, el sufrimiento es opcional. — Haruki Murakami",
  "Convierte tus heridas en sabiduría. — Oprah Winfrey",
  "Lo que no me mata, me hace más fuerte. — Friedrich Nietzsche",
  "La paciencia no es la capacidad de esperar, sino de mantener una buena actitud mientras esperas. — Joyce Meyer",
  "No tengas miedo de renunciar a lo bueno para ir a por lo grandioso. — John D. Rockefeller",
  "El fracaso es solo la oportunidad de comenzar de nuevo de forma más inteligente. — Henry Ford",
  "La adversidad te presenta a ti mismo.",
  "Si caminas solo, irás más rápido; si caminas acompañado, llegarás más lejos. — Proverbio africano",
  "La cima de una montaña es la base de la siguiente.",
  "Nada en el mundo puede tomar el lugar de la persistencia. — Calvin Coolidge",
  "El talento es más barato que la sal de mesa. Lo que separa al individuo talentoso del exitoso es un montón de trabajo duro. — Stephen King",
  "No te compares con nadie en este mundo. Si lo haces, te estás insultando a ti mismo. — Bill Gates",
  "La única persona que estás destinada a ser es la persona que decidas ser. — Ralph Waldo Emerson",
  "Cree que puedes y ya estarás a medio camino. — Theodore Roosevelt",
  "La mejor venganza es el éxito masivo. — Frank Sinatra",
  "Las cicatrices son pruebas de que el pasado fue real, pero no dictan tu futuro.",
  "Quien teme a las tormentas nunca aprenderá a navegar en mar abierto.",
  "Un diamante es solo un trozo de carbón que soportó una presión extraordinaria.",
  "La noche es más oscura justo antes del amanecer.",
  "Ninguna presión, ningún diamante. — Thomas Carlyle",
  // Sección 5: Filosofía del Tiempo y Existencia
  "Somos polvo de estrellas contemplando las estrellas. — Carl Sagan",
  "La vida es un sueño del que la muerte nos despierta. — Pedro Calderón de la Barca",
  "El hombre está condenado a ser libre. — Jean-Paul Sartre",
  "Al final, solo lamentamos las oportunidades que no tomamos.",
  "Vive como si fueras a morir mañana. Aprende como si fueras a vivir siempre. — Mahatma Gandhi",
  "La vida no se mide por las veces que respiras, sino por los momentos que te dejan sin aliento. — Maya Angelou",
  "Todo fluye, nada permanece. — Heráclito",
  "Nadie se baña en el río dos veces porque todo cambia en el río y en el que se baña. — Heráclito",
  "El propósito de la vida es una vida con propósito. — Robert Byrne",
  "La muerte no es lo opuesto a la vida, es parte de ella. — Haruki Murakami",
  "El universo no está obligado a tener sentido para ti. — Neil deGrasse Tyson",
  "Somos lo que hacemos para cambiar lo que somos. — Eduardo Galeano",
  "La normalidad es un camino pavimentado: es cómodo para caminar, pero no crecen flores en él. — Vincent van Gogh",
  "Quien mira hacia afuera, sueña; quien mira hacia adentro, despierta. — Carl Jung",
  "La vida es un lienzo en blanco, y tú eres el pintor.",
  "No cuentes los años, cuenta los recuerdos.",
  "La felicidad real es disfrutar el presente sin dependencia ansiosa del futuro. — Séneca",
  "El tiempo es la divisa de tu vida. Es la única divisa que tienes, y solo tú puedes determinar cómo será gastada. — Carl Sandburg",
  "La vida es aquello que te va sucediendo mientras te empeñas en hacer otros planes. — John Lennon",
  "El presente es el único momento en que se puede crear el futuro.",
  "Malgasté el tiempo, y ahora el tiempo me malgasta a mí. — William Shakespeare",
  "El tiempo es una ilusión provocada por la sucesión de nuestros estados de conciencia. — Helena Blavatsky",
  "Breve es la vida, pero la memoria de una vida bien empleada es eterna. — Cicerón",
  "Lo que dejamos atrás y lo que tenemos por delante son minucias comparado con lo que llevamos dentro. — Ralph Waldo Emerson",
  "Vivir es lo más raro del mundo. La mayoría de las personas existe, eso es todo. — Oscar Wilde",
  // Sección 6: Sabiduría Oriental y Saberes Milenarios
  "El viaje de mil millas comienza con un solo paso. — Lao Tse",
  "Aquel que pregunta es tonto por cinco minutos; quien no pregunta, es tonto para siempre. — Proverbio chino",
  "No temas ir despacio, teme solo detenerte. — Proverbio chino",
  "La paciencia es un árbol de raíz amarga pero de frutos muy dulces. — Proverbio persa",
  "Un camino sin obstáculos no suele llevar a ninguna parte importante.",
  "El mejor momento para plantar un árbol fue hace 20 años; el segundo mejor es ahora. — Proverbio chino",
  "La verdadera riqueza es no necesitar nada.",
  "Quien conquista a otros es fuerte; quien se conquista a sí mismo es poderoso. — Lao Tse",
  "Escucha lo que no se dice.",
  "La tensión es quien crees que debes ser; la relajación es quien eres. — Proverbio chino",
  "Si cambias la forma en que miras las cosas, las cosas que miras cambian. — Wayne Dyer",
  "El maestro aparece cuando el alumno está listo. — Proverbio zen",
  "No hay viento favorable para el barco que no sabe a dónde va. — Séneca",
  "Bebe el agua, pero recuerda la fuente. — Proverbio chino",
  "Controla tus emociones o ellas te controlarán a ti.",
  "La felicidad no es tener mucho, sino disfrutar mucho.",
  "Un diamante con un defecto es mejor que una piedra común perfecta. — Confucio",
  "Aprende a pausar, no a renunciar.",
  "Lo que la oruga llama el fin del mundo, el maestro lo llama mariposa. — Richard Bach",
  "Las grandes almas tienen voluntades; las débiles solo tienen deseos. — Proverbio chino",
  "El silencio es una fuente de gran fuerza. — Lao Tse",
  "Cuando el viento sopla, algunos construyen muros; otros, molinos. — Proverbio chino",
  "Aquel que sabe que tiene suficiente es rico. — Lao Tse",
  "La fluidez del agua vence a la dureza de la roca.",
  "Vacía tu copa para que pueda ser llenada; quédate sin nada para ganarlo todo. — Bruce Lee",
  // Sección 7: Verdad, Destino y Elección Personal
  "Tus decisiones, no tus condiciones, determinan tu destino. — Tony Robbins",
  "La verdad te hará libre, pero primero te hará enojar. — Joe Klaas",
  "No soy lo que me sucedió, soy lo que elijo ser. — Carl Jung",
  "El destino no es cuestión de suerte, es cuestión de elección. — William Jennings Bryan",
  "Quien busca la verdad corre el riesgo de encontrarla. — Isabel Allende",
  "Ser uno mismo en un mundo que constantemente intenta hacer de ti otra cosa es el mayor logro. — Ralph Waldo Emerson",
  "Si no te diseñas tu propio plan de vida, es probable que caigas en el plan de otra persona. — Jim Rohn",
  "La vida no se trata de encontrarte a ti mismo, sino de crearte a ti mismo. — George Bernard Shaw",
  "Las mejores cosas de la vida están al otro lado del miedo. — Will Smith",
  "Quien no tiene el valor de asumir riesgos no logrará nada en la vida. — Muhammad Ali",
  "El carácter es el destino. — Heráclito",
  "Tu vida cambia en el momento en que tomas una decisión nueva, correcta y comprometida. — Tony Robbins",
  "La libertad es lo que haces con lo que te han hecho. — Jean-Paul Sartre",
  "No prometas cuando estés feliz, no respondas cuando estés enojado, no decidas cuando estés triste.",
  "No puedes controlar los vientos, pero sí puedes ajustar tus velas.",
  "La mente no es un vaso por llenar, sino un fuego por encender. — Plutarco",
  "Si no defiendes algo, caerás por cualquier cosa. — Malcolm X",
  "Aquel que conoce a los demás es sabio; aquel que se conoce a sí mismo está iluminado. — Lao Tse",
  "Haz lo correcto, no lo fácil.",
  "El que no lucha por lo que quiere, no tiene derecho a lamentarse por lo que pierde.",
  "Tus hábitos formarán tu futuro.",
  "Lo único imposible es aquello que no intentas.",
  "Nadie puede hacerte sentir inferior sin tu consentimiento. — Eleanor Roosevelt",
  "Las palabras mueven, pero el ejemplo arrastra.",
  "No dejes que el ruido de las opiniones de los demás ahogue tu propia voz interior. — Steve Jobs",
  // Sección 8: Claridad, Enfoque y Maestría
  "La concentración es el secreto de la fuerza. — Ralph Waldo Emerson",
  "No temas al hombre que ha practicado 10,000 patadas una vez, teme al hombre que ha practicado una patada 10,000 veces. — Bruce Lee",
  "La maestría requiere paciencia, enfoque y repetición.",
  "Deshazte de lo innecesario para dar espacio a lo esencial.",
  "La claridad precede al éxito.",
  "La simplicidad no es la ausencia de desorden, sino la presencia de propósito.",
  "Enfócate en la señal, no en el ruido.",
  "El arte de ser sabio es el arte de saber qué ignorar. — William James",
  "No hagas muchas cosas a medias, haz una cosa con excelencia.",
  "El detalle no es un detalle, lo es todo. — Charles Eames",
  "La excelencia es hacer cosas comunes de manera extraordinaria. — John W. Gardner",
  "El dominio de uno mismo es el mayor de los imperios. — Séneca",
  "Donde va tu enfoque, fluye tu energía.",
  "La consistencia vence al talento cuando el talento no es consistente.",
  "La velocidad es irrelevante si vas en la dirección equivocada. — Mahatma Gandhi",
  "El trabajo duro supera al talento cuando el talento no trabaja duro. — Tim Notke",
  "Mantenlo simple, pero significativo.",
  "La calma es un superpoder.",
  "Estar ocupado no es lo mismo que ser productivo.",
  "La disciplina es el puente entre tus intenciones y tus logros.",
  "Haz del hábito tu aliado, no tu maestro.",
  "La agudeza mental se cultiva en el silencio y la reflexión.",
  "Cuida los pequeños pasos y la meta se cuidará sola.",
  "La preparación de hoy determina el impacto de mañana.",
  "Manteniendo tus sueños despiertos. — SPINTA CAFÉ",
]

function renderPhraseCanvas(name: string, date: string, quote: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const width = 1080
  const height = 1920
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // 1. Fondo oscuro cálido
  ctx.fillStyle = '#141311'
  ctx.fillRect(0, 0, width, height)

  // 2. Destellos radiales cálidos (arriba y abajo)
  const radialTop = ctx.createRadialGradient(width / 2, 400, 50, width / 2, 400, 700)
  radialTop.addColorStop(0, 'rgba(255, 61, 13, 0.20)')
  radialTop.addColorStop(1, 'rgba(20, 19, 17, 0)')
  ctx.fillStyle = radialTop
  ctx.fillRect(0, 0, width, height)

  const radialBottom = ctx.createRadialGradient(width / 2, 1600, 50, width / 2, 1600, 500)
  radialBottom.addColorStop(0, 'rgba(255, 61, 13, 0.08)')
  radialBottom.addColorStop(1, 'rgba(20, 19, 17, 0)')
  ctx.fillStyle = radialBottom
  ctx.fillRect(0, 0, width, height)

  // 3. Marco interior con márgenes seguros para Historias de Instagram
  const cardX = 70
  const cardY = 170
  const cardW = width - cardX * 2 // 940px
  const cardH = height - cardY * 2 // 1580px

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)'
  ctx.lineWidth = 2
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(cardX, cardY, cardW, cardH, 36)
  } else {
    ctx.rect(cardX, cardY, cardW, cardH)
  }
  ctx.stroke()

  // 4. Esquinas decorativas de acento naranja SPINTA
  ctx.strokeStyle = '#ff3d0d'
  ctx.lineWidth = 3
  const cl = 32

  // Superior izquierda
  ctx.beginPath()
  ctx.moveTo(cardX + 24, cardY + 24 + cl)
  ctx.lineTo(cardX + 24, cardY + 24)
  ctx.lineTo(cardX + 24 + cl, cardY + 24)
  ctx.stroke()

  // Superior derecha
  ctx.beginPath()
  ctx.moveTo(cardX + cardW - 24 - cl, cardY + 24)
  ctx.lineTo(cardX + cardW - 24, cardY + 24)
  ctx.lineTo(cardX + cardW - 24, cardY + 24 + cl)
  ctx.stroke()

  // Inferior izquierda
  ctx.beginPath()
  ctx.moveTo(cardX + 24, cardY + cardH - 24 - cl)
  ctx.lineTo(cardX + 24, cardY + cardH - 24)
  ctx.lineTo(cardX + 24 + cl, cardY + cardH - 24)
  ctx.stroke()

  // Inferior derecha
  ctx.beginPath()
  ctx.moveTo(cardX + cardW - 24 - cl, cardY + cardH - 24)
  ctx.lineTo(cardX + cardW - 24, cardY + cardH - 24)
  ctx.lineTo(cardX + cardW - 24, cardY + cardH - 24 - cl)
  ctx.stroke()

  // 5. Encabezado de marca SPINTA
  ctx.textAlign = 'center'
  ctx.font = 'italic 800 46px sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('SPINTA', width / 2 - 14, cardY + 130)
  ctx.fillStyle = '#ff3d0d'
  ctx.fillText('·', width / 2 + 70, cardY + 130)

  ctx.font = '600 16px sans-serif'
  ctx.fillStyle = '#9c978f'
  ctx.fillText('C A F É   D E   E S P E C I A L I D A D', width / 2, cardY + 175)

  // Línea divisoria superior
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cardX + 80, cardY + 220)
  ctx.lineTo(cardX + cardW - 80, cardY + 220)
  ctx.stroke()

  // 6. Dedicatoria con nombre y fecha
  ctx.font = 'italic bold 32px sans-serif'
  ctx.fillStyle = '#ff3d0d'
  ctx.fillText(`${name.toUpperCase()}, TU FRASE DE HOY`, width / 2, cardY + 310)

  ctx.font = '400 22px sans-serif'
  ctx.fillStyle = '#948f86'
  ctx.fillText(date, width / 2, cardY + 355)

  // Pequeño detalle estelar
  ctx.font = '20px sans-serif'
  ctx.fillStyle = 'rgba(255, 61, 13, 0.7)'
  ctx.fillText('✦', width / 2, cardY + 410)

  // 7. Texto de la frase centrado
  const quoteMaxWidth = cardW - 140
  let fontSize = 52
  if (quote.length > 130) fontSize = 44
  if (quote.length > 210) fontSize = 38
  const lineHeight = fontSize * 1.5

  ctx.font = `italic 400 ${fontSize}px Georgia, "Times New Roman", serif`
  ctx.fillStyle = '#fffdf9'

  const words = `“${quote}”`.split(' ')
  const lines: string[] = []
  let cur = words[0] || ''
  for (let i = 1; i < words.length; i++) {
    const w = words[i]
    if (ctx.measureText(cur + ' ' + w).width <= quoteMaxWidth) {
      cur += ' ' + w
    } else {
      lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)

  const totalTextHeight = lines.length * lineHeight
  const quoteAreaTop = cardY + 460
  const quoteAreaBottom = cardY + cardH - 240
  const availableCenter = (quoteAreaTop + quoteAreaBottom) / 2
  let startY = availableCenter - totalTextHeight / 2 + fontSize * 0.75

  for (const line of lines) {
    ctx.fillText(line, width / 2, startY)
    startY += lineHeight
  }

  // 8. Línea divisoria inferior
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.beginPath()
  ctx.moveTo(cardX + 80, cardY + cardH - 180)
  ctx.lineTo(cardX + cardW - 80, cardY + cardH - 180)
  ctx.stroke()

  // 9. Pie de página de la tarjeta
  ctx.font = '600 26px sans-serif'
  ctx.fillStyle = '#e2ded5'
  ctx.fillText('SPINTA CAFÉ — Síguenos en @spintacafe', width / 2, cardY + cardH - 115)

  ctx.font = '400 18px sans-serif'
  ctx.fillStyle = '#7a756d'
  ctx.fillText('spintacafe.com', width / 2, cardY + cardH - 72)

  return canvas
}

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
  const [phraseInput, setPhraseInput] = useState('')
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null)
  const [phraseUserName, setPhraseUserName] = useState('')
  const [phraseAnimating, setPhraseAnimating] = useState(false)

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

  const todayLabel = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })

  const generatePhrase = () => {
    if (!phraseInput.trim()) return
    setPhraseAnimating(true)
    setTimeout(() => {
      const random = phrases[Math.floor(Math.random() * phrases.length)]
      setCurrentPhrase(random)
      setPhraseUserName(phraseInput.trim())
      setPhraseAnimating(false)
    }, 350)
  }

  const handleDownload = () => {
    if (!currentPhrase || !phraseUserName) return
    const canvas = renderPhraseCanvas(phraseUserName, todayLabel, currentPhrase)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const cleanName = phraseUserName.toLowerCase().trim().replace(/[^a-z0-9]/gi, '-')
      a.href = url
      a.download = `spinta-frase-${cleanName || 'hoy'}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setToastMessage('¡Imagen guardada!')
    }, 'image/png')
  }

  const handleShare = async () => {
    if (!currentPhrase || !phraseUserName) return
    const canvas = renderPhraseCanvas(phraseUserName, todayLabel, currentPhrase)
    canvas.toBlob(async (blob) => {
      if (!blob) return
      const cleanName = phraseUserName.toLowerCase().trim().replace(/[^a-z0-9]/gi, '-')
      const file = new File([blob], `spinta-frase-${cleanName || 'hoy'}.png`, { type: 'image/png' })
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Frase de ${phraseUserName} — SPINTA CAFÉ`,
            text: `"${currentPhrase}" — SPINTA CAFÉ (@spintacafe)`,
          })
          return
        } catch {
          // Usuario canceló compartir
        }
      }
      // Si el navegador no soporta compartir archivos directamente, se descarga la imagen:
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `spinta-frase-${cleanName || 'hoy'}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setToastMessage('¡Imagen guardada para compartir!')
    }, 'image/png')
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
          <a href="#tienda">Tienda</a><a href="#academia">Academia</a><a href="#historia">Nuestra historia</a><a href="#contacto">Contacto</a>
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
      {menuOpen && <nav className="mobile-menu"><a href="#tienda" onClick={() => setMenuOpen(false)}>Tienda</a><a href="#academia" onClick={() => setMenuOpen(false)}>Academia</a><a href="#historia" onClick={() => setMenuOpen(false)}>Nuestra historia</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></nav>}
      {cartOpen && <><button className="drawer-backdrop" aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} /><aside className="cart-drawer" aria-label="Carrito de compras"><div className="cart-header"><div><p className="eyebrow">Tu selección</p><h2>Carrito <span>{cartCount}</span></h2></div><button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X size={20} /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={30} /><p>Tu carrito está esperando algo especial.</p><a href="#tienda" onClick={() => setCartOpen(false)}>Explorar tienda</a></div> : <><div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><div><strong>{item.name}</strong><small>{formatCOP(item.price)} c/u</small><div className="quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Disminuir ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumentar ${item.name}`}><Plus size={13} /></button><button className="remove-line" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name}`}><Trash2 size={14} /></button></div></div><strong>{formatCOP(item.price * item.quantity)}</strong></div>)}</div><div className="cart-summary"><p className="cart-notice">Tu pedido se finaliza y confirma directamente a través de WhatsApp con atención personalizada.</p><label className="cart-field">Código de descuento<input value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} placeholder="ZORROCAFETERO" /></label><div className="cart-totals"><div><span>Subtotal</span><strong>{formatCOP(cartSubtotal)}</strong></div>{discount > 0 && <div><span>Descuento (ZORROCAFETERO -10%)</span><strong>−{formatCOP(discount)}</strong></div>}<div className="final-total"><span>Total final</span><strong>{formatCOP(cartTotal)}</strong></div></div><label className="cart-field">Nombre completo<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" /></label><label className="cart-field">Dirección de entrega<input required value={customerAddress} onChange={(event) => setCustomerAddress(event.target.value)} placeholder="Medellín / Área Metropolitana" /></label><button className="dark-button cart-checkout" disabled={!customerName.trim() || !customerAddress.trim()} onClick={whatsapp}>Finalizar pedido por WhatsApp <ArrowUpRight size={16} /></button></div></>}</aside></>}

      <section id="inicio" className="hero-section">
        <div className="hero-bg-wrapper">
          <Image
            src="/hero-bg.jpg"
            alt="Cafetales de especialidad SPINTA"
            fill
            priority
            sizes="100vw"
            className="hero-bg-image"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-copy">
          <Image className="hero-fox" src="/spinta-isotipo.png" alt="Isotipo del zorro de SPINTA" width={170} height={170} priority />
          <p className="eyebrow hero-eyebrow">Café de especialidad · Colombia</p>
          <h1 className="hero-title">Manteniendo<br />tus sueños<br /><em>despiertos.</em></h1>
          <p className="hero-description">Café para quienes encuentran belleza en el ritual, precisión en el detalle y una buena excusa para quedarse despiertos.</p>
          <a className="hero-cta-btn" href="#tienda">
            <span>Explorar la tienda</span>
            <ArrowDown size={15} />
          </a>
        </div>
        <div className="bag-stage" aria-label="Bolsa de café SPINTA flotando" style={{ transform: `translateY(${Math.min(scrollY * 0.16, 85)}px) rotate(${scrollY * 0.018 - 3}deg)` }}>
          <Image className="hero-product-image" src="/images/spinta-huila.png" alt="Bolsa de café SPINTA Huila" fill priority sizes="(max-width: 760px) 245px, 330px" />
        </div>
        <div className="hero-foot"><span>01 — 03</span><span className="scroll-note"><span className="line" /> Desliza para descubrir</span></div>
      </section>

      {/* ── GENERADOR DE FRASES ── */}
      <section id="frases" className="phrase-section">
        <div className="phrase-inner">
          <div className="phrase-header">
            <p className="eyebrow phrase-eyebrow">Frase del día</p>
            <h2 className="phrase-title">Tu café, <em>tu frase.</em></h2>
            <p className="phrase-subtitle">Pon tu nombre y recibe la sabiduría que el universo tiene para ti hoy.</p>
          </div>

          <div className="phrase-form-row">
            <input
              className="phrase-name-input"
              type="text"
              placeholder="Escribe tu nombre..."
              value={phraseInput}
              onChange={(e) => setPhraseInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generatePhrase()}
              maxLength={40}
              aria-label="Tu nombre"
            />
            <button
              className="phrase-generate-btn"
              onClick={generatePhrase}
              disabled={!phraseInput.trim()}
            >
              Generar mi frase ✦
            </button>
          </div>

          <div className={`phrase-result-area ${currentPhrase ? 'has-phrase' : ''} ${phraseAnimating ? 'animating' : ''}`}>
            {currentPhrase ? (
              <>
                <p className="phrase-dedication">
                  {phraseUserName}, tu frase de hoy {todayLabel}
                </p>
                <blockquote className="phrase-quote">
                  &ldquo;{currentPhrase}&rdquo;
                </blockquote>
                <div className="phrase-card-footer">
                  <span>SPINTA CAFÉ — Síguenos en <a href="https://instagram.com/spintacafe" target="_blank" rel="noreferrer">@spintacafe</a></span>
                </div>
                <div className="phrase-actions">
                  <button className="phrase-action-btn primary" onClick={handleDownload} title="Guardar imagen en tu dispositivo">
                    <Download size={14} /> Guardar imagen
                  </button>
                  <button className="phrase-action-btn" onClick={handleShare} title="Compartir en Instagram, WhatsApp o redes">
                    <Share2 size={14} /> Compartir
                  </button>
                  <button className="phrase-again-btn" onClick={generatePhrase} title="Generar otra frase">
                    Generar otra ↺
                  </button>
                </div>
              </>
            ) : (
              <div className="phrase-placeholder">
                <span className="phrase-placeholder-icon">✦</span>
                <p>Tu frase aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>
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


      {/* ── SECCIÓN CONTACTO & SERVICIOS DE BARRA ── */}
      <section id="contacto" className="contact-section section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2>Tu evento merece<br /><em>un buen café.</em></h2>
          </div>
          <p className="section-intro">Barra de especialidad para eventos, oficinas y momentos que merecen más que café de máquina.</p>
        </div>

        <div className="contact-layout">
          {/* Grid de imágenes de servicios */}
          <div className="barra-grid">
            {[
              { label: 'Barra para eventos', sub: 'Bodas · Corporativos · Lanzamientos' },
              { label: 'Café de oficina', sub: 'Suscripción mensual de especialidad' },
              { label: 'Taller de barismo', sub: 'Experiencias educativas en tu espacio' },
              { label: 'Pop-up SPINTA', sub: 'Tu marca, nuestro café' },
              { label: 'Catas privadas', sub: 'Maridaje y exploración sensorial' },
              { label: 'Equipos & accesorios', sub: 'Asesoría para montar tu barra' },
            ].map((item) => (
              <div className="barra-tile" key={item.label}>
                <div className="barra-tile-img">
                  <div className="barra-placeholder-icon">☕</div>
                </div>
                <div className="barra-tile-meta">
                  <strong>{item.label}</strong>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Panel de contacto */}
          <div className="contact-panel">
            <p className="eyebrow">Hablemos</p>
            <h3>¿Listo para llevar <em>SPINTA</em> a tu espacio?</h3>
            <p className="contact-desc">Cuéntanos qué tienes en mente. Diseñamos la experiencia de café perfecta para tu evento o negocio.</p>

            <div className="contact-details">
              <div className="contact-item">
                <MapPin size={16} strokeWidth={1.8} />
                <span>Medellín, Antioquia · Colombia</span>
              </div>
              <div className="contact-item">
                <Mail size={16} strokeWidth={1.8} />
                <a href="mailto:spintacafe@gmail.com">spintacafe@gmail.com</a>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <a href="https://wa.me/573244122482?text=Hola%20SPINTA,%20quiero%20información%20sobre%20sus%20servicios%20de%20barra" target="_blank" rel="noreferrer">+57 324 412 2482</a>
              </div>
            </div>

            <a
              className="dark-button contact-cta"
              href="https://wa.me/573244122482?text=Hola%20SPINTA,%20quiero%20cotizar%20un%20servicio%20de%20barra%20para%20mi%20evento"
              target="_blank"
              rel="noreferrer"
            >
              Cotizar servicio de barra <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN INSTAGRAM FEED ── */}
      <section id="instagram" className="ig-section section-shell">
        <div className="ig-header">
          <div>
            <p className="eyebrow">Instagram</p>
            <h2>Síguenos en<br /><em>@spintacafe</em></h2>
          </div>
          <a
            className="text-link"
            href="https://instagram.com/spintacafe"
            target="_blank"
            rel="noreferrer"
          >
            Ver perfil completo <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Widget oficial de Behold.so conectado a @spintacafe */}
        <div className="ig-behold-wrapper">
          <behold-widget feed-id="daGqkZub0pnB7gMxdtjh"></behold-widget>
          <Script
            id="behold-script"
            src="https://w.behold.so/widget.js"
            type="module"
            strategy="afterInteractive"
          />
        </div>
      </section>

      <footer><div className="footer-brand">SPINTA<span>·</span></div><p>Café de especialidad para días extraordinarios.</p><div className="footer-links"><a href="#tienda">Tienda</a><a href="#academia">Academia</a><a href="#contacto">Contacto</a><a href="https://instagram.com/spintacafe" target="_blank" rel="noreferrer">@spintacafe</a></div><small>© 2026 SPINTA CAFÉ · Hecho en Colombia</small></footer>
    </main>
  )
}
