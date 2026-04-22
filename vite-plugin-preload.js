export default function vitePreloadPlugin() {
  return {
    name: "vite-plugin-preload",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        let enhanced = html;

        // 1. Manejar CSS (solo si no está inlined)
        // Con cssCodeSplit: false, todo el CSS suele estar en un solo <style> inyectado por Vite.
        // Pero si queda algún link de CSS (por ejemplo de assets estáticos), lo hacemos no bloqueante.
        enhanced = enhanced.replace(
          /<link rel="stylesheet"([^>]*?) href="([^"]*)">/g,
          (match, attr, href) => {
            // Si ya tiene media="print" o algo similar, lo dejamos.
            if (attr.includes('media=')) return match;
            return `<link rel="preload" as="style" href="${href}"><link rel="stylesheet" media="print" onload="this.onload=null;this.media='all'" href="${href}">`;
          }
        );

        // 2. Preload del bundle principal (JavaScript)
        if (ctx.bundle) {
          const entries = Object.entries(ctx.bundle);
          
          // Encontrar el entry point principal (suele ser el archivo index-*.js más grande o el que tiene isEntry)
          const mainBundle = entries.find(
            ([name, bundle]) => 
              name.endsWith(".js") && 
              (bundle.isEntry || name.startsWith("assets/index-") || name.startsWith("index-"))
          );

          if (mainBundle) {
            const fileName = mainBundle[0];
            const preloadHint = `<link rel="preload" as="script" href="/${fileName}" fetchpriority="high">`;
            
            // Inyectar antes del primer tag script o al final del head
            if (enhanced.includes('<script')) {
              enhanced = enhanced.replace('<script', `${preloadHint}\n    <script`);
            } else {
              enhanced = enhanced.replace('</head>', `  ${preloadHint}\n</head>`);
            }
          }
        }

        // 3. Agregar Preconnects faltantes si es necesario
        // (Ya están en el index.html, pero podemos asegurar que estén al principio)

        return enhanced;
      },
    },
  };
}
