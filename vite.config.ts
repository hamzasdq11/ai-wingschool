import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname, '')
  if (command === 'build' && !(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY)) {
    throw new Error(
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required to build — ' +
        'without them the forms cannot submit. Set them in .env.local ' +
        "(see .env.example) or in your hosting provider's env settings.",
    )
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
