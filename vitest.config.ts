import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(async ({ mode }) => {
  // Get the resolved Vite config
  const resolvedViteConfig = await viteConfig({ mode, command: 'serve' })

  // Return merged configuration
  return {
    ...resolvedViteConfig,
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
