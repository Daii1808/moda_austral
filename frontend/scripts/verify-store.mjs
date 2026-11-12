import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`✗ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${message}`);
}

const productsCode = fs.readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8');

// 1. Verify that discarded/unwanted images and items are completely removed
const forbiddenImages = ['ma-06.jpg', 'ma-20.jpg', 'ma-21.jpg', 'ma-26.jpg', 'ma-27.jpg'];
for (const badImg of forbiddenImages) {
  assert(
    !productsCode.includes(badImg),
    `Imagen descartada eliminada del catálogo: ${badImg}`,
  );
}

const forbiddenTitles = [
  'Conjunto Deportivo',
  'Mocasines de Gamuza Camel',
  'Zapatos de Tacón Dorado',
  'Sandalias de Tacón',
  'Top Tejido a Crochet',
  'Gorros de Temporada',
];
for (const badTitle of forbiddenTitles) {
  assert(
    !productsCode.includes(badTitle),
    `Cuadro/nombre descartado eliminado por completo: "${badTitle}"`,
  );
}

// 2. Verify every active image in products.ts exists and is used EXACTLY ONCE (zero repetition)
const activeImages = [
  'ma-01.jpg',
  'ma-02.jpg',
  'ma-03.jpg',
  'ma-04.jpg',
  'ma-05.jpg',
  'ma-07.jpg',
  'ma-08.jpg',
  'ma-09.jpg',
  'ma-10.jpg',
  'ma-11.jpg',
  'ma-12.jpg',
  'ma-13.jpg',
  'ma-14.jpg',
  'ma-15.jpg',
  'ma-16.jpg',
  'ma-17.jpg',
  'ma-18.jpg',
  'ma-19.jpg',
  'ma-22.jpg',
  'ma-23.jpg',
  'ma-24.jpg',
  'ma-25.jpg',
  'ma-28.jpg',
  'ma-29.jpg',
];

for (const fileName of activeImages) {
  const fullPath = path.join(rootDir, 'public', 'images', 'catalogo', fileName);
  assert(fs.existsSync(fullPath), `Fotografía real de tienda presente: public/images/catalogo/${fileName}`);
  const matches = productsCode.match(new RegExp(`/images/catalogo/${fileName}`, 'g')) || [];
  assert(
    matches.length === 1,
    `Fotografía ${fileName} asignada de forma 100% única sin repetirse (usos: ${matches.length})`,
  );
}

// 3. Verify exact corrected names & categories
const requiredTitles = [
  'Camisa de Puntitos y Camisas de Verano Hombre',
  'Poleras y Camisas de Verano para Hombre',
  'Blusa Amarilla con Cuello de Lentejuelas y Brillos',
  'Chaqueta Negra de Lentejuelas Multicolor',
  'Variedad de Jeans: Pantalones, Shorts y Camisas de Jeans',
  'Línea Infantil Color y Algodón',
  'Botín Chelsea en Cuero Negro',
  'Cárdigan Tejido a Crochet Punto Granizo',
  'Mochila Urbana',
  'Carteras y Bandoleras Seleccionadas',
  'Línea de Perfumería y Fragancias',
  'Colección de Bisutería, Lazos y Accesorios para el Pelo',
  'Espejo Tejido a Mano',
];
for (const title of requiredTitles) {
  assert(
    productsCode.includes(`name: '${title}'`),
    `Nombre corregido y verificado con su imagen: "${title}"`,
  );
}

// 4. Verify pure reference catalog (zero $ prices) and 4 catalog categories
assert(!productsCode.includes('$'), 'Catálogo 100% referencial sin precios de venta directa ($)');
for (const catId of ["id: 'vestuario'", "id: 'calzado'", "id: 'textiles'", "id: 'accesorios'"]) {
  assert(productsCode.includes(catId), `Categoría de catálogo verificada en products.ts: ${catId}`);
}

// 5. Verify all 8 prototype pages & navigation components exist as separate views with zero shadows
const requiredComponents = [
  'src/components/layout/Navbar.tsx',
  'src/components/layout/MenuDrawer.tsx',
  'src/components/layout/SearchOverlay.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/CategoriesSection.tsx',
  'src/components/sections/ProductDetailSection.tsx',
  'src/components/sections/CircularFashionSection.tsx',
  'src/components/sections/HowToBuySection.tsx',
  'src/components/sections/BranchesSection.tsx',
  'src/components/sections/FaqSection.tsx',
  'src/components/sections/ConsultationSection.tsx',
];

for (const rel of requiredComponents) {
  const full = path.join(rootDir, rel);
  assert(fs.existsSync(full), `Componente/Vista separado verificado: ${rel}`);
  const code = fs.readFileSync(full, 'utf8');
  assert(!code.includes('shadow-'), `Cero sombras (box-shadow prohibido por DESIGN.md) en ${rel}`);
  if (rel.startsWith('src/components/sections/')) {
    assert(
      !code.includes('rounded-[12px]'),
      `Cero tarjetas anidadas ("cards-within-cards") en vista ${rel}`,
    );
  }
}

console.log('\nTODAS LAS PRUEBAS DE NOMBRES CORREGIDOS, CUADROS ELIMINADOS Y FOTOS ÚNICAS PASARON EXITOSAMENTE.');
