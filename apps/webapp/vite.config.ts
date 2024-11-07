import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  optimizeDeps: {
    include: [
      '@ckm/db',
      '@ckm/contract',
      '@ckm/lib-api',
      '@ckm/types',
    ]
  },
  ssr: {
    noExternal: [
      '@ckm/db',
      '@ckm/contract',
      '@ckm/lib-api',
      '@ckm/types',
      '@prisma/client',
    ],
    external: ['@prisma/client'],

  },
});

