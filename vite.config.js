import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const settingsFilePath = path.resolve(__dirname, 'config/app-settings.json')

function settingsApiPlugin() {
  const handleRequest = async (req, res) => {
    if (!req.url?.startsWith('/api/settings')) {
      return false
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    if (req.method === 'GET') {
      try {
        const raw = await fs.readFile(settingsFilePath, 'utf8')
        res.end(raw)
      } catch {
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Failed to read settings file' }))
      }

      return true
    }

    if (req.method === 'POST') {
      try {
        let body = ''

        for await (const chunk of req) {
          body += chunk
        }

        const parsed = JSON.parse(body)
        await fs.mkdir(path.dirname(settingsFilePath), { recursive: true })
        await fs.writeFile(settingsFilePath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8')
        res.end(JSON.stringify({ ok: true }))
      } catch {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Invalid settings payload' }))
      }

      return true
    }

    res.statusCode = 405
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return true
  }

  return {
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handleRequest(req, res).then((handled) => {
          if (!handled) {
            next()
          }
        })
      })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleRequest(req, res).then((handled) => {
          if (!handled) {
            next()
          }
        })
      })
    },
    name: 'settings-api-plugin',
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), settingsApiPlugin()],
})
