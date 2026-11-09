# Moda Austral — Arquitectura Frontend & Sistema de Diseño

Este proyecto implementa el prototipo web responsivo (teléfonos, tablets y computadores) de **Moda Austral** (venta de vestuario, calzado y textiles reutilizados), integrando la arquitectura de información de los **8 frames de Figma** y la presentación **Unidad 2 — Proyecto Integrado** bajo las reglas visuales estrictas de [`docs/DESIGN.md`](./DESIGN.md).

---

## 1. Stack Tecnológico

- **Bundler & Dev Server:** [Vite 6](https://vite.dev/) + `@vitejs/plugin-react-swc` (compilación instantánea con SWC).
- **UI Runtime:** React 19 + TypeScript 5.
- **Estilos & Tokens:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) configurado 1:1 con los tokens de [`docs/DESIGN.md`](./DESIGN.md).

---

## 2. Estructura de Carpetas

```text
modo_austral/
├── docs/
│   ├── DESIGN.md                                         # Sistema de diseño (colores, tipografía, espaciado, superficies)
│   ├── ARCHITECTURE.md                                   # Documentación de arquitectura y mapeo Figma → Código
│   └── Moda Austral_Unidad 2_Proyecto Integrado.pdf      # Presentación del proyecto, investigación UX y fotografías de marca
└── frontend/
    ├── public/
    │   └── images/                                       # Fotografías reales extraídas del proyecto + arte editorial
    │       ├── hero-rack.jpg                             # Fotografía principal de perchero
    │       ├── vestuario-poleron.jpg                     # Polerón bordado MA (Categoría Vestuario)
    │       ├── calzado-editorial.jpg                     # Botín cuero/lona en fondo Walnut Shadow (Categoría Calzado)
    │       ├── textiles-totebag.jpg                      # Tote bag lienzo MA (Categoría Textiles)
    │       ├── etiqueta-prenda.jpg                       # Etiqueta con Talla, Medidas, Condición y Ref. LEN-0042
    │       ├── etiqueta-reciclaje.jpg                    # Etiqueta kraft de ciclo textil (Moda Circular)
    │       ├── moda-circular-empaque.jpg                 # Empaque reutilizable top-down (Moda Circular)
    │       ├── empaque-bolsa.jpg                         # Bolsa kraft MA (Preguntas Frecuentes)
    │       ├── sucursal-lenca.jpg                        # Vitrina Lenca · Casa matriz con horario y QR
    │       └── sucursal-puerto-montt.jpg                 # Letrero exterior Moda Austral (Sucursal Puerto Montt)
    ├── src/
    │   ├── components/
    │   │   ├── ui/                                       # Primitivas estrictas de docs/DESIGN.md:
    │   │   │   ├── PillButton.tsx                        # Botón sólido (radio 36px, #382416, máx 1 por sección)
    │   │   │   ├── GhostButton.tsx                       # Botón secundario (radio 22.5px, borde 1px #ffedd7)
    │   │   │   ├── UnderlineLink.tsx                     # Enlaces inline y de navegación (radio 0px)
    │   │   │   ├── UnderlineInput.tsx                    # Campo editable con borde inferior 1px #ffedd7 (radio 0px)
    │   │   │   └── SectionDivider.tsx                    # Separador dashed de 1px (#40372e / #6c5f51)
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx                            # Barra superior fija + disparador del menú
    │   │   │   ├── MenuDrawer.tsx                        # Frame 09_Menu_Movil 1 (menú completo adaptable)
    │   │   │   ├── VerticalSidebar.tsx                   # Etiqueta serial vertical rotada 90° en margen derecho
    │   │   │   └── Footer.tsx                            # Pie de página presente en los 8 frames de Figma
    │   │   └── sections/
    │   │       ├── HeroSection.tsx                       # Frame 01_Inicio 1 ("Un nuevo encuentro")
    │   │       ├── CategoriesSection.tsx                 # Frame 02_Categorias 1 (Vestuario, Calzado, Textiles)
    │   │       ├── CircularFashionSection.tsx            # Frame 07_Moda_Circular 1 ("Qué puedes encontrar / Antes de elegir")
    │   │       ├── HowToBuySection.tsx                   # Frame 04_Como_Comprar 1 (4 pasos: Elige, Consulta, Espera confirmación, Coordina)
    │   │       ├── BranchesSection.tsx                   # Frame 05_Sucursales 1 (Lenca · Casa matriz y Puerto Montt · Sucursal)
    │   │       ├── FaqSection.tsx                        # Frame 06_Preguntas_Frecuentes 1 (Stock, Tallas, Reserva, Pago/Retiro)
    │   │       └── ConsultationSection.tsx               # Frame 08_Preparar_Consulta 1 (Preparador interactivo de WhatsApp)
    │   ├── data/
    │   │   └── products.ts                               # Datos estructurados de categorías, pasos, sucursales y FAQ
    │   ├── styles/
    │   │   └── globals.css                               # Tokens @theme y voces tipográficas de docs/DESIGN.md
    │   ├── types/
    │   │   └── product.ts                                # Tipos TypeScript
    │   ├── App.tsx                                       # Estado global de navegación y consulta
    │   └── main.tsx                                      # Entrada React 19
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## 3. Mejoras de Usabilidad Aplicadas (Página 14 del PDF)

1. **Separar "Moda circular" de los productos:** Las categorías de producto son exclusivamente `Vestuario`, `Calzado` y `Textiles`, mientras que `Moda Circular` cuenta con su propia sección conceptual dedicada (`#moda-circular`).
2. **Aclarar los botones:** Cada categoría utiliza llamadas a la acción explícitas (`CONSULTAR VESTUARIO`, `CONSULTAR CALZADO`, `CONSULTAR TEXTILES`).
3. **Hacer visibles los campos editables:** En `Tu Consulta` (`#consulta`), los campos de referencia y mensaje llevan etiquetas explícitas `CAMPO EDITABLE` e inputs `UnderlineInput` con línea inferior `#ffedd7`.
4. **Cambiar "Confirma" por "Espera la confirmación":** El Paso 03 de `Cómo comprar` se titula `03 · ESPERA LA CONFIRMACIÓN` para dejar claro que enviar un mensaje no reserva automáticamente la prenda.
5. **Facilitar el regreso a categorías:** Se incluye el enlace directo `← VOLVER A CATEGORÍAS` y selectores rápidos de categoría dentro del preparador de consulta.
