# Coolibreat | Eventos & Experiencia | Landing Page

## 🚀 | Cómo correr el proyecto

### Requisitos previos

- Node.js instalado (v18 o superior) → https://nodejs.org
- VS Code instalado → https://code.visualstudio.com

---

### Pasos para levantar el proyecto

**1. Abrí la carpeta en VS Code**

```
File > Open Folder > seleccioná la carpeta "coolibreat"
```

**2. Abrí la terminal integrada**

```
Ctrl + ` (o desde el menú: Terminal > New Terminal)
```

**3. Instalá las dependencias** (solo la primera vez)

```bash
npm install
```

**4. Corré el servidor de desarrollo**

```bash
npm run dev
```

**5. Abrí en el navegador**

```
http://localhost:5173
```

---

## 🖼️ Logo

Colocá el logo del cliente en la carpeta `/public/` con el nombre `logo.png`.
El archivo ya está referenciado en el código.

---

## 🏗️ Estructura del proyecto

```
coolibreat/
├── public/
│   └── logo.png          ← Poné el logo acá
├── src/
│   ├── App.tsx           ← Componente principal (toda la landing)
│   ├── main.tsx          ← Entry point
│   └── index.css         ← Tailwind CSS
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📦 Build para producción (cuando sea para entregar)

```bash
npm run build
```

Genera la carpeta `/dist` lista para subir al hosting.

---

## 🌐 Cómo subir al hosting

### Opción A – Netlify (gratis y fácil)

1. `npm run build`
2. Entrá a https://netlify.com
3. Arrastrá la carpeta `/dist` → ¡listo!

### Opción B – Vercel (gratis y fácil)

1. Entrá a https://vercel.com
2. Importá el proyecto desde GitHub o subí la carpeta

---

## ✏️ Modificaciones comunes

| Qué querés cambiar  | Dónde hacerlo                                         |
| ------------------- | ----------------------------------------------------- |
| Textos / contenido  | `src/App.tsx` → secciones de datos arriba del archivo |
| Colores             | `src/App.tsx` → estilos inline o variables CSS        |
| Logo                | Reemplazá `/public/logo.png`                          |
| Contacto / WhatsApp | `src/App.tsx` → sección `Contact`                     |
| Instagram           | Buscá `coolibreat` en `App.tsx`                       |
