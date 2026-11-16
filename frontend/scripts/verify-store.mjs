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

// 3. Verify Favicon & SEO Meta Descriptions in index.html
const faviconPath = path.join(rootDir, 'public', 'favicon.svg');
assert(fs.existsSync(faviconPath), 'Favicon oficial SVG presente en public/favicon.svg');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
assert(indexHtml.includes('href="/favicon.svg"'), 'Favicon enlazado correctamente en index.html');
assert(indexHtml.includes('name="description"'), 'Meta descripción SEO presente en index.html');
assert(indexHtml.includes('property="og:description"'), 'Open Graph meta descripción presente en index.html');
assert(indexHtml.includes('application/ld+json'), 'Datos estructurados Schema.org JSON-LD presentes en index.html');

// 4. Verify Manual de Identidad Visual Typography (Arcifom) & Color Palette in globals.css
const css = fs.readFileSync(path.join(rootDir, 'src/styles/globals.css'), 'utf8');
for (const token of ['#F6EBD7', '#FFFABB', '#E89BBD', '#A73668', '#590516', '--font-arcifom']) {
  assert(css.includes(token), `Token del Manual de Identidad Visual verificado en globals.css: ${token}`);
}

// 5. Verify Senior-Accessible Typography in ConsultationSection.tsx
const consultationCode = fs.readFileSync(
  path.join(rootDir, 'src/components/sections/ConsultationSection.tsx'),
  'utf8',
);
assert(
  consultationCode.includes('text-[19px]') && consultationCode.includes('min-h-[58px]'),
  'Tamaños de letra grandes y botones accesibles para adultos mayores verificados en ConsultationSection.tsx',
);

// 6. Verify all 8 prototype pages & navigation components exist with zero shadows
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
}

console.log('\nTODAS LAS PRUEBAS DEL MANUAL DE IDENTIDAD VISUAL, TIPOGRAFÍA ARCIFOM, ACCESIBILIDAD, FAVICON Y SEO PASARON EXITOSAMENTE.');
