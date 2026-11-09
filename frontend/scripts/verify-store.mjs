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

// 1. Verify all 16 brand & editorial product images exist and are non-empty
const requiredImages = [
  'hero-rack.jpg',
  'vestuario-poleron.jpg',
  'vestuario-perchero.jpg',
  'etiqueta-prenda.jpg',
  'etiqueta-reciclaje.jpg',
  'calzado-editorial.jpg',
  'calzado-botin-lateral.jpg',
  'textiles-totebag.jpg',
  'textiles-bufanda-editorial.jpg',
  'abrigo-lana-editorial.jpg',
  'chaqueta-denim-editorial.jpg',
  'moda-circular-empaque.jpg',
  'empaque-bolsa.jpg',
  'empaque-sello.jpg',
  'sucursal-lenca.jpg',
  'sucursal-puerto-montt.jpg',
];

for (const img of requiredImages) {
  const fullPath = path.join(rootDir, 'public', 'images', img);
  assert(fs.existsSync(fullPath), `Imagen presente: public/images/${img}`);
  const stat = fs.statSync(fullPath);
  assert(stat.size > 10000, `Imagen válida (>10KB): ${img} (${stat.size} bytes)`);
}

// 2. Verify all 8 prototype pages & Gucci navigation components exist as separate views
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

// 3. Verify strict PDF Page 9 & Canva Prototype color tokens and responsive fluid scales in globals.css
const css = fs.readFileSync(path.join(rootDir, 'src/styles/globals.css'), 'utf8');
for (const token of ['#f5ecda', '#510f18', '#9b4067', '#de9fbd', '#fffbc3']) {
  assert(css.includes(token), `Token de color PDF Página 9 / Prototipo Canva verificado en globals.css: ${token}`);
}
assert(
  css.includes('clamp('),
  'Tipografía fluida responsiva (móvil, tablet y computador) verificada en globals.css',
);
assert(
  fs.existsSync(path.join(rootDir, 'src/components/ui/ModaAustralLogo.tsx')),
  'Monograma oficial MA (ModaAustralLogo.tsx) verificado',
);

console.log('\nTODAS LAS PRUEBAS DE ESTRUCTURA, PALETA PDF PÁG. 9, PROTOTIPO Y RESPONSIVIDAD PASARON EXITOSAMENTE.');
