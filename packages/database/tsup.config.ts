import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // Generate TypeScript declaration files
  sourcemap: true,
  clean: true,
  external: ['@prisma/client'], // Exclude external dependencies
  outDir: 'dist',
  target: 'es2020',
  skipNodeModulesBundle: true,
});
