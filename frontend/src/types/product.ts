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
  name: string;
  category: CategoryId;
  categoryLabel: string;
  size: string;
  condition: string;
  branch: 'Lenca' | 'Puerto Montt';
  availabilityNote: string;
  measurements: string;
  conversationalDescription: string;
  primaryImage: string;
  featured?: boolean;
}

export interface CategoryShowcase {
  id: CategoryId;
  numberLabel: string;
  title: string;
  subtitle: string;
  conversationalBody: string;
  examplesList: string[];
  inspectionTips: string[];
  buttonLabel: string;
  imageUrl: string;
  imageAlt: string;
  badgeText: string;
}

export interface BranchInfo {
  id: 'Lenca' | 'Puerto Montt';
  name: string;
  sector: string;
  address: string;
  schedule: string;
  reference: string;
  featuredCategories: string;
  statusNote: string;
  mapQueryUrl: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
}

export interface HowToBuyStep {
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  highlightNote: string;
}
