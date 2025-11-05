import express from 'express';
import path from 'path';
import { createServer as createHttpServer } from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
  const app = express();
  app.use(express.json());

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createVite } = await import('vite');
    const vite = await createVite({ root: path.resolve(__dirname, '../client'), server: { middlewareMode: true } });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const fs = await import('fs/promises');
        const index = await fs.readFile(path.resolve(__dirname, '../client/index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, index);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, '../dist/public')));
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist/public/index.html'));
    });
  }

  app.get('/api/hello', (req, res) => res.json({ message: 'hello from server' }));

  const server = createHttpServer(app);
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen(port, '0.0.0.0', () => console.log(`Server listening on http://localhost:${port}`));
}

start();
