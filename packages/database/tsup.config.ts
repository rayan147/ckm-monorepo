import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: true,
  treeshake: true,
  sourcemap: false,
  clean: true,
  dts: {
    resolve: true,
  },
  format: ['cjs', 'esm'],
  external: ['@prisma/client'],
  noExternal: ['zod-prisma-types'],
  minify: true,
  esbuildOptions(options) {
  }
});
