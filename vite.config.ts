import { defineConfig } from 'vite'
import { esmExternalRequirePlugin } from 'rolldown/plugins'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    esmExternalRequirePlugin({
      external: ['react'],
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    dts({
      entryRoot: 'src',
      outDirs: 'dist',
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'NJ Digital React UI',
      formats: ['es'],
      fileName: 'index.es',
    },

    rolldownOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
