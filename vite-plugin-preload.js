/**
 * Plugin de Vite para optimizar preload de recursos críticos
 * - Convierte CSS bloqueante a CSS no bloqueante usando media="print"
 * - Inyecta preload hints para recursos principales
 */
export default function vitPreloadPlugin() {
  return {
    name: "vite-plugin-preload",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        let enhanced = html;

        // Convertir CSS bloqueante a no bloqueante
        // Cambiar <link rel="stylesheet" href="..."> a versión con media="print"
        enhanced = enhanced.replace(
          /<link rel="stylesheet"([^>]*?) href="([^"]*)">/g,
          '<link rel="preload" as="style" href="$2"><link rel="stylesheet" media="print" onload="this.onload=null;this.media=\'all\'" href="$2">',
        );

        // Agregar preload hints para scripts principales
        if (ctx.bundle) {
          const entries = Object.entries(ctx.bundle);

          // Encontrar el bundle principal
          const mainBundle = entries.find(
            ([name]) => name.startsWith("index-") && name.endsWith(".js"),
          );

          if (mainBundle) {
            const preloadHint = `<link rel="preload" as="script" href="/${mainBundle[0]}" fetchpriority="high">`;
            enhanced = enhanced.replace(
              '<script type="module"',
              `${preloadHint}\n  <script type="module"`,
            );
          }
        }

        return enhanced;
      },
    },
  };
}
