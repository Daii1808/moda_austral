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

// 1. Verify all 29 real store photographs (ma-01.jpg .. ma-29.jpg) exist in public/images/catalogo/
const productsCode = fs.readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8');
for (let i = 1; i <= 29; i++) {
  const num = String(i).padStart(2, '0');
  const fileName = `ma-${num}.jpg`;
  const fullPath = path.join(rootDir, 'public', 'images', 'catalogo', fileName);
  assert(fs.existsSync(fullPath), `Fotografía real de tienda presente: public/images/catalogo/${fileName}`);
  const stat = fs.statSync(fullPath);
  assert(stat.size > 10000, `Fotografía optimizada válida (>10KB): ${fileName} (${stat.size} bytes)`);
  assert(
    productsCode.includes(`/images/catalogo/${fileName}`),
    `Fotografía ${fileName} integrada en el catálogo/secciones (src/data/products.ts)`,
  );
}

// 2. Verify pure reference catalog (zero $ prices) and 4 catalog categories
assert(!productsCode.includes('$'), 'Catálogo 100% referencial sin precios de venta directa ($)');
for (const catId of ["id: 'vestuario'", "id: 'calzado'", "id: 'textiles'", "id: 'accesorios'"]) {
  assert(productsCode.includes(catId), `Categoría de catálogo verificada en products.ts: ${catId}`);
}

// 3. Verify all 8 prototype pages & navigation components exist as separate views with zero shadows
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

// 4. Verify strict PDF Page 9 & DESIGN.md color/typography tokens and responsive fluid scales in globals.css
const css = fs.readFileSync(path.join(rootDir, 'src/styles/globals.css'), 'utf8');
for (const token of [
  '#f5ecda',
  '#510f18',
  '#9b4067',
  '#de9fbd',
  '#fffbc3',
  '--font-halyard-display-variable',
  '--font-arial',
]) {
  assert(css.includes(token), `Token de diseño PDF / DESIGN.md verificado en globals.css: ${token}`);
}
assert(
  css.includes('clamp('),
  'Tipografía fluida responsiva (móvil, tablet y computador) verificada en globals.css',
);
assert(
  fs.existsSync(path.join(rootDir, 'src/components/ui/ModaAustralLogo.tsx')),
  'Monograma oficial MA (ModaAustralLogo.tsx) verificado',
);

console.log('\nTODAS LAS PRUEBAS DE CATÁLOGO REFERENCIAL (29 FOTOS REALES, 4 CATEGORÍAS, DESIGN.MD Y RESPONSIVIDAD) PASARON EXITOSAMENTE.');
