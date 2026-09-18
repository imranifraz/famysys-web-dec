import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function stripFrameGuards(proxyRes) {
  delete proxyRes.headers['x-frame-options']
  delete proxyRes.headers['X-Frame-Options']
  const cspKey = proxyRes.headers['content-security-policy']
    ? 'content-security-policy'
    : proxyRes.headers['Content-Security-Policy']
      ? 'Content-Security-Policy'
      : null
  if (!cspKey) return
  const csp = String(proxyRes.headers[cspKey] || '')
  proxyRes.headers[cspKey] = csp
    .replace(/frame-ancestors[^;]*;?/gi, '')
    .replace(/;;+/g, ';')
    .trim()
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local iframe preview for the corporate deck. Strips SAMEORIGIN so the
      // Studio deck can embed https://famysys.com/corporate/ during development.
      '/corporate-embed': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/corporate-embed/, '/corporate'),
        configure: (proxy) => {
          proxy.on('proxyRes', stripFrameGuards)
        },
      },
      '/_next': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
      },
      '/corporate/connect-qr.png': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    proxy: {
      '/corporate-embed': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/corporate-embed/, '/corporate'),
        configure: (proxy) => {
          proxy.on('proxyRes', stripFrameGuards)
        },
      },
      '/_next': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
      },
      '/corporate/connect-qr.png': {
        target: 'https://famysys.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
