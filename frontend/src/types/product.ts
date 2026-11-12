export type CategoryId = 'vestuario' | 'calzado' | 'textiles' | 'accesorios';

export type CategoryFilter = 'all' | CategoryId;

export type BranchId = 'Lenca' | 'Puerto Montt' | 'Por definir';

export type PageRoute =
  | 'inicio'
  | 'categorias'
  | 'prenda'
  | 'moda-circular'
  | 'como-comprar'
  | 'sucursales'
  | 'preguntas-frecuentes'
  | 'consulta';

export interface GarmentItem {
  id: string;
  refCode: string;
  category: CategoryId;
  categoryLabel: string;
  name: string;
  subtitle: string;
  conversationalDescription: string;
  size: string;
  measurements: string;
  composition: string;
  condition: 'EXCELENTE' | 'MUY BUENA' | 'SELECCIÓN TIENDA';
  branch: 'Lenca' | 'Puerto Montt';
  availabilityNote: string;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  featured?: boolean;
}

export interface CategoryInfo {
  id: CategoryId;
  serialCode: string;
  title: string;
  buttonLabel: string;
  headline: string;
  shortDescription: string;
  conversationalBody: string;
  imageUrl: string;
  secondaryImageUrl: string;
  compositionNote: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  highlightNote: string;
}

export interface BranchInfo {
  id: 'Lenca' | 'Puerto Montt';
  name: string;
  badge: string;
  address: string;
  schedule: string;
  statusNote: string;
  conversationalIntro: string;
  imageUrl: string;
  secondaryImageUrl: string;
  mapQueryUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
}
