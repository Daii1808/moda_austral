import type {
  BranchInfo,
  CategoryShowcase,
  FaqItem,
  GarmentItem,
  HowToBuyStep,
} from '@/types/product';

/**
 * Datos reales de contacto de la tienda tomados del cartel en puerta (MA_19_111126.png)
 */
export const STORE_CONTACT = {
  whatsappNumber: '56944704389',
  whatsappDisplay: '+56 9 4470 4389',
  instagramHandle: '@modaaus',
  instagramUrl: 'https://www.instagram.com/modaaus',
  tiktokHandle: '@modaaus',
  facebookName: 'ModaAus Navarro',
};

/**
 * Banners y vistas editoriales exclusivas (11 imágenes únicas que NO se repiten en ningún ítem del catálogo):
 * - ma-03.jpg: Hero Banner Principal (Inicio)
 * - ma-26.jpg: Portada Categoría 01 Vestuario
 * - ma-22.jpg: Portada Categoría 02 Calzado
 * - ma-16.jpg: Portada Categoría 03 Textiles & Bolsos
 * - ma-10.jpg: Portada Categoría 04 Accesorios & Belleza
 * - ma-25.jpg: Banner Moda Circular (Inicio)
 * - ma-18.jpg: Vista Moda Circular — Qué puedes encontrar
 * - ma-29.jpg: Vista Moda Circular — Antes de elegir
 * - ma-12.jpg: Vista Sucursal Lenca
 * - ma-07.jpg: Vista Sucursal Puerto Montt
 * - ma-19.jpg: Vista Preguntas Frecuentes (Cartel QR y contacto oficial)
 */
export const EXCLUSIVE_SECTION_IMAGES = {
  heroBanner: '/images/catalogo/ma-03.jpg',
  circularBanner: '/images/catalogo/ma-25.jpg',
  circularFind: '/images/catalogo/ma-18.jpg',
  circularChoose: '/images/catalogo/ma-29.jpg',
  faqSignage: '/images/catalogo/ma-19.jpg',
} as const;

/**
 * Catálogo Referencial de 18 Ejemplos Reales (18 imágenes únicas: ma-01, ma-02, ma-04, ma-05, ma-06,
 * ma-08, ma-09, ma-11, ma-13, ma-14, ma-15, ma-17, ma-20, ma-21, ma-23, ma-24, ma-27, ma-28).
 * CERO imágenes repetidas entre productos ni con banners/categorías.
 */
export const GARMENT_CATALOG: GarmentItem[] = [
  // 1. VESTUARIO (7 fotografías exclusivas: ma-02, ma-05, ma-06, ma-04, ma-08, ma-27, ma-28)
  {
    id: 'vestido-estampado-azul',
    refCode: 'MA-02',
    name: 'Vestido Largo Estampado Botánico Azul',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M',
    condition: 'Pieza única seleccionada',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Largo 128 cm · Busto 94 cm · Cintura fluida',
    conversationalDescription:
      'Vestido largo de caída fluida con estampado botánico en tonos azul profundo y crema. Ejemplo referencial de vestuario en tienda; disponibilidad sujeta a confirmación.',
    primaryImage: '/images/catalogo/ma-02.jpg',
    featured: true,
  },
  {
    id: 'enterito-terracota-lino',
    refCode: 'MA-05',
    name: 'Enterito Terracota & Blusas de Temporada',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'S / M',
    condition: 'Selección circular',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Tiro medio · Corte holgado · Tela liviana',
    conversationalDescription:
      'Enterito en tono terracota acompañado de blusas livianas de temporada en nuestro perchero principal. Ejemplo referencial para orientar tu consulta por WhatsApp.',
    primaryImage: '/images/catalogo/ma-05.jpg',
  },
  {
    id: 'camisa-amarilla-strass',
    refCode: 'MA-06',
    name: 'Camisa Amarilla con Cuello de Cristales',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M',
    condition: 'Excelente estado',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Hombros 41 cm · Pecho 52 cm · Largo 66 cm',
    conversationalDescription:
      'Camisa abotonada en tono amarillo pastel con aplicaciones brillantes en el cuello. Prenda única de moda circular; consulta disponibilidad antes de visitar.',
    primaryImage: '/images/catalogo/ma-06.jpg',
  },
  {
    id: 'denim-jeans-seleccion',
    refCode: 'MA-04',
    name: 'Selección Denim & Jeans Clasificados',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: '36 a 44',
    condition: 'Rotación continua',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Cortes recto, mom fit y tiro alto · Varios lavados',
    conversationalDescription:
      'Estantería de pantalones de mezclilla y denim seleccionados en distintos lavados y tallas. Puedes consultar por tu talla y corte buscado directamente con la tienda.',
    primaryImage: '/images/catalogo/ma-04.jpg',
  },
  {
    id: 'chaqueta-lentejuelas-nocturna',
    refCode: 'MA-08',
    name: 'Chaqueta Nocturna de Lentejuelas',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M / L',
    condition: 'Pieza única',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Hombros 43 cm · Largo 62 cm · Forro interior suave',
    conversationalDescription:
      'Chaqueta con textura de lentejuelas negras y destellos multicolores junto a selección de prendas de vestir. Ejemplo referencial del catálogo de vestuario.',
    primaryImage: '/images/catalogo/ma-08.jpg',
  },
  {
    id: 'vestuario-deportivo-calzas',
    refCode: 'MA-27',
    name: 'Conjunto Deportivo & Calzas Active',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'S / M / L',
    condition: 'Selección deportiva',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Telas elásticas de secado rápido · Varios colores',
    conversationalDescription:
      'Línea de calzas, tops y prendas deportivas cómodas para entrenamiento o uso diario. Consulta colores y tallas disponibles en sucursal.',
    primaryImage: '/images/catalogo/ma-27.jpg',
  },
  {
    id: 'vestuario-infantil-color',
    refCode: 'MA-28',
    name: 'Línea Infantil Color & Algodón',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'Tallas Niño/a',
    condition: 'Excelente estado',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Poleras, vestidos y prendas infantiles seleccionadas',
    conversationalDescription:
      'Sección de vestuario infantil en algodón y colores vivos, revisada prenda por prenda para prolongar su vida útil.',
    primaryImage: '/images/catalogo/ma-28.jpg',
  },

  // 2. CALZADO (4 fotografías exclusivas: ma-01, ma-11, ma-20, ma-21)
  {
    id: 'botin-chelsea-cuero',
    refCode: 'MA-01',
    name: 'Botín Chelsea en Cuero Negro',
    category: 'calzado',
    categoryLabel: 'Calzado',
    size: '38',
    condition: 'Suela firme · Excelente estado',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Plantilla 24.5 cm · Caña media con elástico lateral',
    conversationalDescription:
      'Botín clásico estilo Chelsea en cuero negro con elásticos laterales, tirador trasero y suela resistente para el clima del sur. Ejemplo referencial de calzado.',
    primaryImage: '/images/catalogo/ma-01.jpg',
    featured: true,
  },
  {
    id: 'mocasines-gamuza-perlas',
    refCode: 'MA-11',
    name: 'Mocasines de Gamuza Camel con Perlas',
    category: 'calzado',
    categoryLabel: 'Calzado',
    size: '37',
    condition: 'Pieza seleccionada',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Plantilla 24 cm · Capellada suave con aplicaciones',
    conversationalDescription:
      'Mocasines bajos en gamuza tono camel decorados con perlas en el empeine. Parte de la vitrina referencial de calzado de temporada.',
    primaryImage: '/images/catalogo/ma-11.jpg',
  },
  {
    id: 'zapatos-tacon-dorado',
    refCode: 'MA-20',
    name: 'Zapatos de Tacón Dorado con Pulsera Strass',
    category: 'calzado',
    categoryLabel: 'Calzado',
    size: '37 / 38',
    condition: 'Casi sin uso',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Tacón medio-alto · Correa con hebilla brillante',
    conversationalDescription:
      'Zapatos de vestir en acabado dorado metalizado con pulsera de strass en el tobillo. Ejemplo referencial para ocasiones especiales; confirma disponibilidad por WhatsApp.',
    primaryImage: '/images/catalogo/ma-20.jpg',
  },
  {
    id: 'sandalias-fiesta-doradas',
    refCode: 'MA-21',
    name: 'Sandalias de Tacón & Fiesta Doradas',
    category: 'calzado',
    categoryLabel: 'Calzado',
    size: '36 a 39',
    condition: 'Selección calzado',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Modelos de fiesta y calzado urbano en exhibición',
    conversationalDescription:
      'Vista lateral de calzado de fiesta con detalles de brillo junto a pares casuales disponibles para prueba en tienda física.',
    primaryImage: '/images/catalogo/ma-21.jpg',
  },

  // 3. TEXTILES & BOLSOS (4 fotografías exclusivas: ma-17, ma-13, ma-14, ma-15)
  {
    id: 'chaqueta-crochet-artesanal',
    refCode: 'MA-17',
    name: 'Cardigan Tejido a Crochet Punto Granny',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Única (M / L)',
    condition: 'Tejido artesanal',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Ancho 55 cm · Largo 64 cm · Algodón y lana multicolor',
    conversationalDescription:
      'Prenda tejida a crochet con cuadros multicolores sobre base negra. Ejemplo representativo de nuestra línea de textiles artesanales y tejidos con identidad.',
    primaryImage: '/images/catalogo/ma-17.jpg',
    featured: true,
  },
  {
    id: 'mochila-brillos-top-crochet',
    refCode: 'MA-13',
    name: 'Top Tejido a Crochet & Mochila Brillos',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Única',
    condition: 'Selección especial',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Mochila compacta con cierre · Top crochet calado en algodón',
    conversationalDescription:
      'Combinación de textil artesanal tejido a mano en algodón crudo junto a mochila negra con destellos y textiles decorativos en macramé.',
    primaryImage: '/images/catalogo/ma-13.jpg',
  },
  {
    id: 'mochilas-urbanas-gorros',
    refCode: 'MA-14',
    name: 'Mochilas Urbanas & Gorros de Temporada',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Única',
    condition: 'Rotación continua',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Mochilas con bolsillos múltiples · Gorros ajustables',
    conversationalDescription:
      'Rincón de mochilas con texturas brillantes, bolsos de hombro y gorros tejidos para complementar tu tenida.',
    primaryImage: '/images/catalogo/ma-14.jpg',
  },
  {
    id: 'carteras-bandoleras-seleccion',
    refCode: 'MA-15',
    name: 'Carteras & Bandoleras Seleccionadas',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Varios formatos',
    condition: 'Excelente estado',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Bandoleras, bolsos de mano y carteras con correa ajustable',
    conversationalDescription:
      'Exhibidor vertical de carteras y bolsos en distintos colores y materiales. Consulta por formatos disponibles en tienda.',
    primaryImage: '/images/catalogo/ma-15.jpg',
  },

  // 4. ACCESORIOS & BELLEZA (3 fotografías exclusivas: ma-09, ma-23, ma-24)
  {
    id: 'perfumeria-fragancias-seleccion',
    refCode: 'MA-09',
    name: 'Línea de Perfumería & Fragancias',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Varios formatos',
    condition: 'Nuevo en caja',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Fragancias florales, dulces y cítricas en presentación regalo',
    conversationalDescription:
      'Estantería de perfumería, brumas corporales y aromas seleccionados disponibles en tienda para complementar tu visita.',
    primaryImage: '/images/catalogo/ma-09.jpg',
  },
  {
    id: 'bisuteria-lazos-accesorios',
    refCode: 'MA-23',
    name: 'Colección de Bisutería, Lazos & Cabello',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Única',
    condition: 'Variedad en tienda',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Collares, aros, pinches, lazos satinados y cepillos',
    conversationalDescription:
      'Mural de accesorios de cabello, lazos, bisutería y detalles de cuidado personal. Ejemplo referencial de la categoría Accesorios y Belleza.',
    primaryImage: '/images/catalogo/ma-23.jpg',
    featured: true,
  },
  {
    id: 'espejos-artesanales-madera',
    refCode: 'MA-24',
    name: 'Espejos Artesanales Sol en Madera',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Formatos S / M / L',
    condition: 'Hecho a mano',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Marcos tallados en madera natural con diseño de rayos',
    conversationalDescription:
      'Espejos decorativos tallados artesanalmente en madera con identidad del sur. Consulta disponibilidad de tamaños directamente por WhatsApp.',
    primaryImage: '/images/catalogo/ma-24.jpg',
  },
];

export const CATEGORIES_DATA: CategoryShowcase[] = [
  {
    id: 'vestuario',
    numberLabel: 'CATEGORÍA 01',
    title: 'VESTUARIO',
    subtitle: 'Vestidos, camisas, denim, chaquetas y vestuario infantil seleccionado.',
    conversationalBody:
      'Prendas únicas de moda circular y temporada revisadas pieza por pieza. Ejemplos referenciales sujetos a disponibilidad en tienda.',
    examplesList: [
      'Vestidos largos, enteritos y blusas de temporada',
      'Camisas con detalles, chaquetas y abrigos',
      'Pantalones denim, ropa deportiva y línea infantil',
    ],
    inspectionTips: [
      'Revisa la talla referencial y medidas en cada ficha',
      'Consulta disponibilidad actual por WhatsApp antes de viajar',
    ],
    buttonLabel: 'CONSULTAR VESTUARIO',
    imageUrl: '/images/catalogo/ma-26.jpg',
    imageAlt: 'Perchero de vestuario en tienda Moda Austral',
    badgeText: 'VESTUARIO · CATÁLOGO REFERENCIAL',
  },
  {
    id: 'calzado',
    numberLabel: 'CATEGORÍA 02',
    title: 'CALZADO',
    subtitle: 'Botines en cuero, mocasines de gamuza, zapatos de tacón y sandalias.',
    conversationalBody:
      'Pares seleccionados en cuero, gamuza y diseños de fiesta revisados en suela, costuras y horma.',
    examplesList: [
      'Botines Chelsea y calzado cerrado para el sur',
      'Mocasines de gamuza con detalles y calzado casual',
      'Zapatos de tacón dorados y sandalias de fiesta',
    ],
    inspectionTips: [
      'Confirma tu número y largo de plantilla en centímetros',
      'Consulta en qué sucursal se encuentra el par de tu interés',
    ],
    buttonLabel: 'CONSULTAR CALZADO',
    imageUrl: '/images/catalogo/ma-22.jpg',
    imageAlt: 'Repisa de calzado en tienda Moda Austral',
    badgeText: 'CALZADO · PARES SELECCIONADOS',
  },
  {
    id: 'textiles',
    numberLabel: 'CATEGORÍA 03',
    title: 'TEXTILES & BOLSOS',
    subtitle: 'Tejidos artesanales a crochet, mochilas, carteras y bandoleras.',
    conversationalBody:
      'Reúne tejidos hechos a mano en punto crochet, macramé y nuestra selección de mochilas, carteras y bolsos.',
    examplesList: [
      'Chaquetas y tops tejidos a crochet artesanal',
      'Mochilas urbanas con brillos y gorros de temporada',
      'Carteras de hombro y bandoleras seleccionadas',
    ],
    inspectionTips: [
      'Revisa el tipo de tejido, textura y formato del bolso',
      'Pregunta por nuevos ingresos de tejidos y carteras',
    ],
    buttonLabel: 'CONSULTAR TEXTILES',
    imageUrl: '/images/catalogo/ma-16.jpg',
    imageAlt: 'Chaqueta tejida a crochet en tienda Moda Austral',
    badgeText: 'TEXTILES & BOLSOS · TEJIDO ARTESANAL',
  },
  {
    id: 'accesorios',
    numberLabel: 'CATEGORÍA 04',
    title: 'ACCESORIOS & BELLEZA',
    subtitle: 'Perfumería, neceseres, bisutería, accesorios de cabello y espejos en madera.',
    conversationalBody:
      'Complementos de cuidado personal, fragancias, neceseres acolchados, bisutería y espejos tallados en madera.',
    examplesList: [
      'Perfumería, fragancias y neceseres acolchados',
      'Bisutería, collares, lazos y accesorios de cabello',
      'Espejos artesanales tallados en madera natural',
    ],
    inspectionTips: [
      'Consulta por aromas, colores de neceseres o tamaños de espejos',
      'Ideal para complementar tu visita o armar un regalo',
    ],
    buttonLabel: 'CONSULTAR ACCESORIOS',
    imageUrl: '/images/catalogo/ma-10.jpg',
    imageAlt: 'Repisa de neceseres y belleza en Moda Austral',
    badgeText: 'ACCESORIOS & BELLEZA · COMPLEMENTOS',
  },
];

export const HOW_TO_BUY_STEPS: HowToBuyStep[] = [
  {
    number: '01',
    title: '01 · EXPLORA EL CATÁLOGO',
    shortLabel: 'Paso 1',
    description:
      'Revisa las 4 categorías del catálogo (Vestuario, Calzado, Textiles & Bolsos y Accesorios & Belleza) como guía referencial antes de consultar o ir a la tienda.',
    highlightNote: 'Catálogo referencial sin stock garantizado',
  },
  {
    number: '02',
    title: '02 · ELIGE TU REFERENCIA',
    shortLabel: 'Paso 2',
    description:
      'Selecciona la categoría o el código de referencia (ej. REF. MA-02) que te interesa y elige la sucursal de consulta (Lenca o Puerto Montt).',
    highlightNote: 'Identifica categoría, talla y sucursal',
  },
  {
    number: '03',
    title: '03 · CONSULTA POR WHATSAPP',
    shortLabel: 'Paso 3',
    description:
      'Envía tu consulta por WhatsApp (+56 9 4470 4389) con el mensaje prellenado editable para que la tienda confirme disponibilidad real.',
    highlightNote: 'Atención directa con la tienda',
  },
  {
    number: '04',
    title: '04 · CONFIRMA VISITA O COMPRA',
    shortLabel: 'Paso 4',
    description:
      'La disponibilidad, las reservas y las condiciones de compra se confirman directamente con el equipo de Moda Austral en Lenca o Puerto Montt.',
    highlightNote: 'El mensaje no reserva automáticamente la prenda',
  },
];

export const BRANCHES_DATA: BranchInfo[] = [
  {
    id: 'Lenca',
    name: 'Sucursal Lenca',
    sector: 'Carretera Austral · Km 33, Sector Lenca',
    address: 'Ruta 7 (Carretera Austral) Km 33, Lenca, Puerto Montt',
    schedule: 'Martes a Sábado: 11:00 a 19:00 hrs · Domingo: 11:30 a 17:30 hrs',
    reference: 'A pasos del cruce costero de Lenca, camino al Parque Alerce Andino.',
    featuredCategories: 'Vestuario, Calzado, Textiles a Crochet y Espejos en Madera',
    statusNote: 'CASA MATRIZ · RUTA AUSTRAL',
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Lenca+Puerto+Montt+Chile',
    imageUrl: '/images/catalogo/ma-12.jpg',
  },
  {
    id: 'Puerto Montt',
    name: 'Sucursal Puerto Montt',
    sector: 'Sector Urbano · Puerto Montt',
    address: 'Sector Centro / Barrio Puerto, Puerto Montt, Región de Los Lagos',
    schedule: 'Lunes a Sábado: 10:30 a 19:30 hrs · Domingo: Cerrado',
    reference: 'Acceso expedito desde el centro de Puerto Montt; confirma dirección exacta por WhatsApp.',
    featuredCategories: 'Vestuario, Denim, Calzado, Bolsos y Accesorios de Belleza',
    statusNote: 'PUNTO URBANO · PUERTO MONTT',
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Puerto+Montt+Centro+Chile',
    imageUrl: '/images/catalogo/ma-07.jpg',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'stock',
    question: '¿Las fotos del catálogo garantizan stock inmediato?',
    shortAnswer: 'Son ejemplos referenciales; el stock se confirma por WhatsApp.',
    detailedAnswer:
      'Al trabajar con moda circular y prendas únicas, el catálogo muestra ejemplos reales y referenciales de lo que ofrece la tienda. Antes de ir, escríbenos por WhatsApp para confirmar disponibilidad.',
  },
  {
    id: 'reserva',
    question: '¿El mensaje de WhatsApp reserva automáticamente un producto?',
    shortAnswer: 'No; la reserva se confirma cuando la tienda responde tu mensaje.',
    detailedAnswer:
      'Enviar la consulta abre la conversación con la tienda indicando qué categoría o referencia te interesa, pero la reserva y condiciones de compra se confirman directamente con el equipo.',
  },
  {
    id: 'categorias',
    question: '¿Qué categorías puedo encontrar en Moda Austral?',
    shortAnswer: 'Vestuario, Calzado, Textiles & Bolsos, y Accesorios & Belleza.',
    detailedAnswer:
      'Contamos con vestuario de temporada y denim, calzado en cuero y gamuza, tejidos artesanales a crochet, mochilas, carteras, perfumería, bisutería y espejos tallados en madera.',
  },
  {
    id: 'sucursales',
    question: '¿Cómo sé en qué sucursal está una prenda o artículo?',
    shortAnswer: 'Cada ficha indica una sucursal referencial (Lenca o Puerto Montt).',
    detailedAnswer:
      'En el catálogo puedes filtrar por Lenca o Puerto Montt y consultar directamente por WhatsApp al +56 9 4470 4389 antes de programar tu visita.',
  },
];
