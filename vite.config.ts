import { createHash } from 'node:crypto'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Adds a Content-Security-Policy <meta> tag to the production build.
 * GitHub Pages cannot send response headers, so the policy has to live in the HTML.
 * Inline scripts (the theme bootstrap in index.html) are allowed by their SHA-256 hash,
 * computed from the final HTML so the hash can never drift from the script.
 * Build only: the dev server needs inline scripts and a websocket for hot reload.
 */
function contentSecurityPolicy(): Plugin {
  return {
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const inline = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g
        // Browsers hash the parsed script text, where CRLF has already become LF
        // (index.html is checked out with CRLF on Windows when core.autocrlf is on).
        const hashes = [...html.matchAll(inline)].map(
          ([, body]) =>
            `'sha256-${createHash('sha256').update(body.replace(/\r\n?/g, '\n')).digest('base64')}'`,
        )
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(' ')}`.trim(),
          // React, Motion and the WebGL components set style attributes at runtime.
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "worker-src 'self' blob:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          'upgrade-insecure-requests',
        ].join('; ')
        return html.replace(
          /<meta charset="UTF-8" \/>/,
          match => `${match}\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`,
        )
      },
    },
  }
}

// VITE_BASE is the path the site is served from: "/" on a root domain,
// "/portfolio/" on GitHub Pages. Set by `npm run deploy`.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss(), contentSecurityPolicy()],
})
