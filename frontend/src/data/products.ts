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
 * Banners y vistas editoriales exclusivas (sin usar las fotos descartadas del maniquí con pestañas ni zapatos repetidos)
 */
export const EXCLUSIVE_SECTION_IMAGES = {
  heroBanner: '/images/catalogo/ma-03.jpg',
  circularBanner: '/images/catalogo/ma-25.jpg',
  circularFind: '/images/catalogo/ma-11.jpg',
  circularChoose: '/images/catalogo/ma-29.jpg',
  faqSignage: '/images/catalogo/ma-19.jpg',
} as const;

/**
 * Catálogo Referencial depurado con los 13 ítems verificados visualmente imagen por imagen.
 */
export const GARMENT_CATALOG: GarmentItem[] = [
  // ==================== 1. VESTUARIO ====================
  {
    id: 'camisa-puntitos-verano-hombre',
    refCode: 'MA-02',
    name: 'Camisa de Puntitos y Camisas de Verano Hombre',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M / L',
    condition: 'Selección verano hombre',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Manga corta y manga larga · Cortes frescos de algodón',
    conversationalDescription:
      'Camisa burdeo con diseño de puntitos blancos en maniquí, acompañada de camisa negra texturizada y camisa blanca estampada de hojas para verano.',
    primaryImage: '/images/catalogo/ma-02.jpg',
    featured: true,
  },
  {
    id: 'poleras-camisas-verano-hombre',
    refCode: 'MA-05',
    name: 'Poleras y Camisas de Verano para Hombre',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'S / M / L',
    condition: 'Prendas seleccionadas',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Musculosas, poleras de algodón y camisas livianas',
    conversationalDescription:
      'Perchero de vestuario masculino para verano con poleras sin mangas, camisas estampadas de manga corta y poleras de algodón en distintos colores.',
    primaryImage: '/images/catalogo/ma-05.jpg',
  },
  {
    id: 'blusa-amarilla-cuello-brillos',
    refCode: 'MA-18',
    name: 'Blusa Amarilla con Cuello de Lentejuelas y Brillos',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M',
    condition: 'Pieza única seleccionada',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Manga corta · Aplicación de pedrería en cuello y delantero',
    conversationalDescription:
      'Blusa abotonada en tono amarillo con cuello decorado con cristales y brillos, exhibida junto a prendas de temporada en nuestro perchero principal.',
    primaryImage: '/images/catalogo/ma-18.jpg',
  },
  {
    id: 'chaqueta-negra-lentejuelas',
    refCode: 'MA-22',
    name: 'Chaqueta Negra de Lentejuelas Multicolor',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'M / L',
    condition: 'Pieza única',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Manga larga en tela negra · Frente completo de lentejuelas',
    conversationalDescription:
      'Chaqueta negra con paneles frontales de lentejuelas multicolores brillantes, ideal para combinar en ocasiones de noche o eventos.',
    primaryImage: '/images/catalogo/ma-22.jpg',
  },
  {
    id: 'variedad-jeans-pantalones-camisas',
    refCode: 'MA-08',
    name: 'Variedad de Jeans: Pantalones, Shorts y Camisas de Jeans',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: 'Varias tallas',
    condition: 'Rotación continua',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Pantalón jeans, camisas de mezclilla, chaquetas y shorts',
    conversationalDescription:
      'Amplia variedad de prendas en mezclilla: pantalones jeans en distintos lavados y cortes, camisas y chaquetas de jeans, además de shorts para temporada.',
    primaryImage: '/images/catalogo/ma-08.jpg',
  },
  {
    id: 'linea-infantil-color-algodon',
    refCode: 'MA-28',
    name: 'Línea Infantil Color y Algodón',
    category: 'vestuario',
    categoryLabel: 'Vestuario',
    size: '4 a 6 años (110/116)',
    condition: '100% Algodón',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Tejido suave de algodón puro · Diseños coloridos infantiles',
    conversationalDescription:
      'Prendas infantiles en 100% algodón con diseños coloridos y tejidos suaves pensados para la comodidad de niños y niñas.',
    primaryImage: '/images/catalogo/ma-28.jpg',
  },

  // ==================== 2. CALZADO ====================
  {
    id: 'botin-chelsea-cuero-negro',
    refCode: 'MA-01',
    name: 'Botín Chelsea en Cuero Negro',
    category: 'calzado',
    categoryLabel: 'Calzado',
    size: 'Consultar número',
    condition: 'Suela firme · Excelente estado',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Caña baja al tobillo · Elástico lateral · Taco bajo cómodo',
    conversationalDescription:
      'Botín clásico estilo Chelsea en cuero negro con elásticos laterales y suela firme ideal para uso diario en el sur. Consulta disponibilidad por WhatsApp.',
    primaryImage: '/images/catalogo/ma-01.jpg',
    featured: true,
  },

  // ==================== 3. TEXTILES & BOLSOS ====================
  {
    id: 'cardigan-crochet-punto-granizo',
    refCode: 'MA-17',
    name: 'Cárdigan Tejido a Crochet Punto Granizo',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'M / L',
    condition: 'Tejido artesanal',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Tejido calado en hilo color crudo · Botones delanteros',
    conversationalDescription:
      'Cárdigan tejido a crochet en punto granizo color crudo con botones al frente y terminaciones caladas hechas con dedicación artesanal.',
    primaryImage: '/images/catalogo/ma-17.jpg',
    featured: true,
  },
  {
    id: 'mochila-urbana',
    refCode: 'MA-14',
    name: 'Mochila Urbana',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Formato mediano',
    condition: 'Excelente estado',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Compartimento principal y bolsillo frontal con cierre',
    conversationalDescription:
      'Mochila urbana en tono rosa viejo con aplicaciones de brillos frontales, cierres metálicos y correas ajustables para uso diario.',
    primaryImage: '/images/catalogo/ma-14.jpg',
  },
  {
    id: 'carteras-bandoleras-seleccionadas',
    refCode: 'MA-13',
    name: 'Carteras y Bandoleras Seleccionadas',
    category: 'textiles',
    categoryLabel: 'Textiles & Bolsos',
    size: 'Varios formatos',
    condition: 'Selección en tienda',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Carteras acolchadas con cadena y bandoleras estructuradas',
    conversationalDescription:
      'Selección de carteras de mano y bandoleras en tonos rosa acolchado con cadena dorada y camel clásico. Consulta por modelos disponibles en sucursal.',
    primaryImage: '/images/catalogo/ma-13.jpg',
  },

  // ==================== 4. ACCESORIOS & BELLEZA ====================
  {
    id: 'linea-perfumeria-fragancias',
    refCode: 'MA-23',
    name: 'Línea de Perfumería y Fragancias',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Varios formatos',
    condition: 'Disponibles en tienda',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Perfumes en caja, brumas corporales, cremas y neceseres',
    conversationalDescription:
      'Repisa de perfumería y cuidado personal con fragancias en caja, sprays corporales, cremas y neceseres acolchados en distintos colores.',
    primaryImage: '/images/catalogo/ma-23.jpg',
    featured: true,
  },
  {
    id: 'coleccion-bisuteria-lazos-pelo',
    refCode: 'MA-24',
    name: 'Colección de Bisutería, Lazos y Accesorios para el Pelo',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Única',
    condition: 'Variedad en tienda',
    branch: 'Puerto Montt',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Lazos, colet, collares, pulseras, labiales y esponjas de maquillaje',
    conversationalDescription:
      'Mural de accesorios para el cabello (lazos, colet y pinches), collares, pulseras de perlas y artículos de belleza y maquillaje.',
    primaryImage: '/images/catalogo/ma-24.jpg',
  },
  {
    id: 'espejo-tejido-a-mano',
    refCode: 'MA-09',
    name: 'Espejo Tejido a Mano',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Belleza',
    size: 'Formato circular',
    condition: 'Artesanal hecho a mano',
    branch: 'Lenca',
    availabilityNote: 'EJEMPLO REFERENCIAL',
    measurements: 'Marco circular tejido a mano en fibra natural con forma de sol',
    conversationalDescription:
      'Espejo decorativo artesanal con marco tejido a mano en forma de sol, ideal para dar calidez e identidad a tus espacios.',
    primaryImage: '/images/catalogo/ma-09.jpg',
  },
];

export const CATEGORIES_DATA: CategoryShowcase[] = [
  {
    id: 'vestuario',
    numberLabel: 'CATEGORÍA 01',
    title: 'VESTUARIO',
    subtitle: 'Camisas de verano, blusas con brillos, chaquetas, variedad de jeans y línea infantil.',
    conversationalBody:
      'Prendas seleccionadas para hombre, mujer e infantil: camisas de verano, pantalones y camisas de jeans, chaquetas de lentejuelas y algodón infantil.',
    examplesList: [
      'Camisas de puntitos y poleras de verano para hombre',
      'Blusas con brillos y chaquetas de lentejuelas',
      'Variedad de pantalones jeans, camisas de mezclilla, shorts y línea infantil',
    ],
    inspectionTips: [
      'Revisa la talla referencial y descripción en cada ficha',
      'Consulta disponibilidad actual por WhatsApp antes de viajar',
    ],
    buttonLabel: 'CONSULTAR VESTUARIO',
    imageUrl: '/images/catalogo/ma-07.jpg',
    imageAlt: 'Camisa estampada de verano y prendas de mezclilla en Moda Austral',
    badgeText: 'VESTUARIO · CATÁLOGO REFERENCIAL',
  },
  {
    id: 'calzado',
    numberLabel: 'CATEGORÍA 02',
    title: 'CALZADO',
    subtitle: 'Botines en cuero negro y calzado seleccionado en tienda.',
    conversationalBody:
      'Calzado revisado en suela, costuras y horma para acompañarte con comodidad y estilo. Consulta por tu número antes de ir a la tienda.',
    examplesList: [
      'Botín Chelsea en cuero negro con elástico lateral',
      'Pares seleccionados según rotación de temporada',
    ],
    inspectionTips: [
      'Confirma tu número disponible directamente por WhatsApp',
      'Consulta en qué sucursal se encuentra el calzado de tu interés',
    ],
    buttonLabel: 'CONSULTAR CALZADO',
    imageUrl: '/images/catalogo/ma-04.jpg',
    imageAlt: 'Exhibición de calzado y mezclilla en tienda Moda Austral',
    badgeText: 'CALZADO · PARES SELECCIONADOS',
  },
  {
    id: 'textiles',
    numberLabel: 'CATEGORÍA 03',
    title: 'TEXTILES & BOLSOS',
    subtitle: 'Cárdigan tejido a crochet punto granizo, mochila urbana, carteras y bandoleras.',
    conversationalBody:
      'Reúne tejidos artesanales a crochet punto granizo junto a nuestra selección de mochilas urbanas, carteras acolchadas y bandoleras.',
    examplesList: [
      'Cárdigan tejido a crochet punto granizo',
      'Mochila urbana con detalles de brillos',
      'Carteras y bandoleras seleccionadas en distintos colores',
    ],
    inspectionTips: [
      'Revisa el tipo de tejido y formato del bolso o cartera',
      'Pregunta por disponibilidad actual en Lenca o Puerto Montt',
    ],
    buttonLabel: 'CONSULTAR TEXTILES',
    imageUrl: '/images/catalogo/ma-16.jpg',
    imageAlt: 'Tejido a crochet y carteras en tienda Moda Austral',
    badgeText: 'TEXTILES & BOLSOS · TEJIDO Y MARROQUINERÍA',
  },
  {
    id: 'accesorios',
    numberLabel: 'CATEGORÍA 04',
    title: 'ACCESORIOS & BELLEZA',
    subtitle: 'Perfumería y fragancias, bisutería y accesorios para el pelo, y espejos tejidos a mano.',
    conversationalBody:
      'Complementos de cuidado personal, línea de perfumería, accesorios para el cabello, bisutería y espejos decorativos tejidos a mano.',
    examplesList: [
      'Línea de perfumería, fragancias y neceseres acolchados',
      'Colección de bisutería, lazos y accesorios para el pelo',
      'Espejos decorativos tejidos a mano en fibra natural',
    ],
    inspectionTips: [
      'Consulta por aromas de perfumes o accesorios disponibles',
      'Ideal para complementar tu visita o elegir un regalo',
    ],
    buttonLabel: 'CONSULTAR ACCESORIOS',
    imageUrl: '/images/catalogo/ma-10.jpg',
    imageAlt: 'Espejo tejido a mano en tienda Moda Austral',
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
    featuredCategories: 'Vestuario, Calzado, Textiles a Crochet y Espejos Tejidos a Mano',
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
    featuredCategories: 'Vestuario, Jeans, Calzado, Mochilas, Carteras y Accesorios para el Pelo',
    statusNote: 'PUNTO URBANO · PUERTO MONTT',
    mapQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Puerto+Montt+Centro+Chile',
    imageUrl: '/images/catalogo/ma-15.jpg',
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
      'Contamos con camisas y poleras de verano, variedad de jeans, chaquetas de lentejuelas, calzado en cuero, cárdigans tejidos a crochet, mochilas urbanas, carteras, perfumería, accesorios para el pelo y espejos tejidos a mano.',
  },
  {
    id: 'sucursales',
    question: '¿Cómo sé en qué sucursal está una prenda o artículo?',
    shortAnswer: 'Cada ficha indica una sucursal referencial (Lenca o Puerto Montt).',
    detailedAnswer:
      'En el catálogo puedes filtrar por Lenca o Puerto Montt y consultar directamente por WhatsApp al +56 9 4470 4389 antes de programar tu visita.',
  },
];
